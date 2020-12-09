import React, {useState, useEffect} from "react";
import Link from "next/link";
import moment from "moment";

import Button from "../button";
import c from "../colors";


const ViewCard = ({view}) => {
	const {view_name, created_at, updated_at, ...viewdata} = view;
	// belangrijk om alle niet-JSON hierboven weg te filteren
	const [compact, setCompact] = useState(0);
	const [hidden, setHidden] = useState(0);
	const [expanded, setExpanded] = useState(0);
	const [undef, setUndef] = useState(0);


	useEffect(() => {
		let compact_counter = 0;
		let hidden_counter = 0;
		let expanded_counter = 0;
		let undef_counter = 0;

		Object.values(viewdata).forEach(val => {
			const json = JSON.parse(val);
			if (json !== null && json.display) {
				switch (json.display) {
				case "hidden":
					hidden_counter++;
					break;
				case "compact":
					compact_counter++;
					break;
				case "expanded":
					expanded_counter++;
					break;
				default:
					undef_counter++;
					break;
				}
			} else {
				undef_counter++;
			}
		}, []);
		setHidden(hidden_counter);
		setCompact(compact_counter);
		setExpanded(expanded_counter);
		setUndef(undef_counter);
	});

	console.log(moment.locale("nl"));

	return (
		<div className="card">
			<div className="head">
				<h4>{view_name}</h4>
			</div>
			<div className="body">
				<p><b>Initiële kolommen: </b>{compact}</p>
				<p><b>Uitklapbare kolommen: </b>{expanded}</p>
				<p><b>Verborgen kolommen: </b>{hidden}</p>
				<p><b>Ongedefinieerde kolommen: </b>{undef}</p>
				<br/>
				<p><i>View aangemaakt: </i>{moment(created_at).locale("nl").format("LLL")}</p>
				<p><i>View laatst aangepast: </i>{moment(updated_at).locale("nl").format("LLL")}</p>
				<br/>
				<br/>
				<div className="button-container">
					<Link href={`/view-manager/${view_name}`}>
						<Button style={{fontSize: "0.9em"}}>Bekijken</Button>
					</Link>
					<Link href={`/view-manager/${view_name}?v=edit`}>
						<Button style={{fontSize: "0.9em"}}>Aanpassen</Button>
					</Link>
					<Link href={`/view-manager/${view_name}?v=delete`}>
						<Button style={{fontSize: "0.9em"}}>Verwijderen</Button>
					</Link>

				</div>

			</div>
			<style jsx>{`
        .card{
          width: 300px;
          padding: 20px;
        }
        .head{
          background-color: ${c.primary.color};
          color: ${c.primary.text};
          text-align: left;
        }
        .head>h4{
          margin: 0;
          padding: 7px 0 7px 14px;
        }
        .body{
          background-color: white;
          color: black;
          padding: 14px;
          font-size: 0.8em;
          text-align: right;
        }
        .body>p{
          margin: 0
        }
        b, i{
          float: left;
        }
        .button-container{
          display: flex;
          justify-content: space-between;
        }

      `}</style>
		</div>
	);
};


export default ViewCard;
