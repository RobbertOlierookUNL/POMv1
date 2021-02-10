import React, {useState, useEffect} from "react";

import { useViews } from "../../lib/swr-hooks";
import Button from "../button";
import SchemaDropdown from "../options/schemadropdown";




const ViewConfig = ({data: {view_name, config}, close}) => {
	const [configData, setConfigData] = useState({});
	const {views} = useViews();
	const [options, setOptions] = useState([]);
	useEffect(() => {
		setOptions(views?.filter(view =>( !view.config || !JSON.parse(view.config).extendable) && view.view_name !== view_name) || []);
	}, [views]);
	useEffect(() => {
		setConfigData(JSON.parse(config) || {});
	}, [config]);

	const handleChange = (state, checkbox=false) => e => {setConfigData({...configData, [state]: checkbox ? e.target.checked : e.target.value});};
	const handleSubmit = async () =>
	  {
	    try {
			console.log("trying..");
			const res = await fetch("/api/view/edit-view", {
				method: "PATCH",
				body: JSON.stringify({
					attr: "config",
					view_name,
					value: JSON.stringify(configData)
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			});
			const json = await res.json();
			if (!res.ok) throw Error(json.message);
		} catch (e) {
			throw Error(e.message);
		}
		close();
	};

	return (
		<>
			<h3 style={{marginTop: "5px"}}>Extend</h3>
			<label htmlFor={"extendable"}>
        De view baseren op een andere view
			</label>
			<input type="checkbox"
				id="extendable"
				name="extendable"
				checked={configData.extendable || false}
				onChange={handleChange("extendable", true)}
			/>
			<br/>
			<small style={{color:"red"}}>Dit verwijdert alle huidige kolomdata van deze view</small>
			<br/>
			<label htmlFor={"extend"}>Baseren op: </label>
			<select
				disabled={!configData.extendable}
				id="extend"
				name="extend"
				value={configData.extend || options[0] || ""}
				onChange={handleChange("extend")}
			>
				{options.map((o, i) =>
					<option key={i} value={o.view_name}>{o.view_name}</option>
				)}
			</select>
			<hr style={{margin:"19px 0 0 0"}}/>
			<h3>Theme</h3>
			<label htmlFor={"theme"}>Kies een thema: </label>
			<SchemaDropdown name="theme" value={configData.theme || 10} handleChange={handleChange("theme")}/>
			<hr style={{marginTop:"19px"}}/>
			<Button onClick={handleSubmit}>Updaten</Button>

		</>
	);
};


export default ViewConfig;
