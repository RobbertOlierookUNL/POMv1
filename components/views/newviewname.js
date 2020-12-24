import Link from "next/link";
import React, {useState, useContext} from "react";
import {useRouter} from "next/router";

import useGlobal from "../store";
import Button from "../button";





const NewViewName = ({duplicate}) => {
	const [viewName, setViewName] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [primary] = useGlobal(
		state => state.primary,
		() => null
	);
	const Router = useRouter();
	console.log(duplicate);

	const save = async () => {
		setSubmitting(true);
		try {
			const res = await fetch("/api/create-view", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					viewName
				}),
			});
			console.log(2);
			const json = await res.json();
			if (!res.ok) throw Error(json.message);
			Router.push(`/view-manager/${viewName}?v=${duplicate ? `duplicated&from=${duplicate}` : "edit"}`);
		} catch (e) {
			throw Error(e.message);
		}
	};
	return (
		<div className="card">
			<div className="head">Naam voor de nieuwe view</div>
			<div className="body">
				<input className="inputField" value={viewName} onChange={(e) => setViewName(e.target.value)}/>
				<div className="button-container">
					<Link href="/view-manager"><div><Button style={{visibility: submitting ? "hidden" : "visible", marginRight: "7px"}}>Annuleren</Button></div></Link>
					<Button onClick={save}>{submitting ? "Verwerken.." : "Opslaan"}</Button>
				</div>

			</div>
			<style jsx>{`
        .card {
          width: 300px;
        }
        .head {
          background-color: ${primary.color};
          color: ${primary.text};
          padding: 7px;
        }
        .body {
          background-color: white;
          padding: 15px;
        }
        .inputField {
          border: 2px solid ${primary.color};
          border-radius: 2px;
          padding: 2px;
          width: 270px;
          margin-bottom: 15px;
        }
        .button-container{
					display: flex;
					justify-content: flex-end;
        }
      `}</style>
		</div>
	);
};

export default NewViewName;
