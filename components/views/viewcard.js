import {mutate} from "swr";
import Link from "next/link";
import React, {useState, useEffect, useContext} from "react";
import moment from "moment";
import { useRouter } from "next/router";

import useGlobal from "../store";
import Button from "../button";
import Modal from "../modal";







const ViewCard = ({view}) => {
	const {view_name, created_at, updated_at, config, ...viewdata} = view;
	// belangrijk om alle niet-JSON hierboven weg te filteren
	const [compact, setCompact] = useState(0);
	const [hidden, setHidden] = useState(0);
	const [expanded, setExpanded] = useState(0);
	const [undef, setUndef] = useState(0);
	const [deleting, setDeleting] = useState(false);
	const [verify, setVerify] = useState(false);
	const Router = useRouter();
	const [primary] = useGlobal(
		state => state.primary,
		() => null
	);


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

	async function deleteEntry() {
		setDeleting(true);
		let res = await fetch(`/api/view/delete-view?view_name=${view_name}`, { method: "DELETE" });
		let json = await res.json();
		if (!res.ok) throw Error(json.message);
		mutate("/api/view/get-views");
		setDeleting(false);
	}

	return (
		<div className="card">
			<div className="shadow">
				<div className="head">
					<h4>{view_name}</h4>
				</div>
				<div className="body">
					<p><b>Initiële kolommen: </b>{compact}</p>
					<p><b>Uitklapbare kolommen: </b>{expanded}</p>
					<p><b>Verborgen kolommen: </b>{hidden}</p>
					<p><b>Ongedefinieerde kolommen: </b>{undef}</p>
					<br/>
					<div className="as-p"><i>View aangemaakt: </i><div className="date">{moment(created_at).locale("nl").format("LLL")}</div></div>
					<div className="as-p"><i>View laatst aangepast: </i><div className="date">{moment(updated_at).locale("nl").format("LLL")}</div></div>
					<br/>
					<br/>
					<div className="button-container">
						<Link href={`/admin/${Router.query.userId}/view-manager/${view_name}`}>
							<div>
								<Button width="109px">Bekijken</Button>
							</div>
						</Link>
						<Link href={`/admin/${Router.query.userId}/view-manager/${view_name}?v=edit`}>
							<div>
								<Button width="109px">Aanpassen</Button>
							</div>
						</Link>
						<Link href={`/admin/${Router.query.userId}/view-manager/new?duplicate=${view_name}`}>
							<div>
								<Button width="109px">Dupliceren</Button>
							</div>
						</Link>
						<Button onClick={() => setVerify(true)} disabled={deleting} width="109px">Verwijderen</Button>


					</div>
				</div>
				{verify &&
				<Modal header={"Weet je het zeker?"}>
					Weet je zeker dat je {view_name} wilt verwijderen?
					<br/>
					<div className={"modal-button-container"}>
						<Button onClick={() => setVerify(false)} style={{fontSize: "0.9em", marginRight: "7px"}}>Annuleren</Button>
						<Button onClick={deleteEntry} style={{fontSize: "0.9em"}}>Verwijderen</Button>
					</div>
				</Modal>}
			</div>
			<style jsx>{`
        .card{
          width: 300px;
          padding: 20px;
        }
				.shadow{
					width: 100%;
					box-shadow: -1px 2px 10px rgba(0, 0, 0, 0.2);
				}
        .head{
          background-color: ${primary.color};
          color: ${primary.text};
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
				.as-p{
					display: block;
				}
				.date {
					max-width: 105px;
					display: inline-block;
				}
        .button-container{
					height: 80.67px;
          display: flex;
          justify-content: space-between;
					align-content: space-between;
					flex-wrap: wrap;
        }
				.modal-button-container{
					margin-top: 14px;
					text-align: right;
				}

      `}</style>
		</div>
	);
};


export default ViewCard;
