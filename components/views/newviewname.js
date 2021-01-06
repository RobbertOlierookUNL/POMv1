import Link from "next/link";
import React, {useState, useContext} from "react";
import {useRouter} from "next/router";

import useGlobal from "../store";
import Button from "../button";





const NewViewName = ({duplicate}) => {
	const [viewName, setViewName] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(false);
	const [primary] = useGlobal(
		state => state.primary,
		() => null
	);
	const Router = useRouter();

	const save = async () => {
		setSubmitting(true);
		try {
			if(viewName === "new") throw Error("ER_NO_NEW");
			const res = await fetch("/api/view/create-view", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					viewName
				}),
			});
			const json = await res.json();
			if (!res.ok) throw Error(json.message);
			Router.push(`/view-manager/${viewName}?v=${duplicate ? `duplicated&from=${duplicate}` : "edit"}`);
		} catch (e) {
			if (e.message && e.message.includes("ER_DUP_ENTRY")) {
				setError(`${viewName} bestaat al; geen dubbele entries`);
			} else if (e.message && e.message.includes("ER_NO_NEW")) {
				setError("\"new\" is niet toegestaan als view-naam");
			} else {
				setError("Er is iets fout gegaan, probeer het opnieuw");
			}
			setSubmitting(false);
		}
	};
	return (
		<div className="card">
			<div className="head">Naam voor de nieuwe view</div>
			<div className="body">
				<input className="inputField" value={viewName} onChange={(e) => {
					setViewName(e.target.value);
					setError(false);
				}}/>
				{error && <span className="error-message">{error}</span>}
				<div className="button-container">
					<Link href="/view-manager"><div><Button style={{visibility: submitting ? "hidden" : "visible", marginRight: "7px"}}>Annuleren</Button></div></Link>
					<Button disabled={submitting} onClick={save}>{submitting ? "Verwerken.." : "Opslaan"}</Button>
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
          border: 2px solid ${error ? "red" : primary.color};
          border-radius: 2px;
          padding: 2px;
          width: 270px;
        }
        .button-container{
					display: flex;
					justify-content: flex-end;
					margin-top: 15px;

        }
				.error-message{
					color: red;
					font-size: 0.7em;
				}
      `}</style>
		</div>
	);
};

export default NewViewName;
