import { TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import React, {useState, useEffect, useRef} from "react";
import useGlobal from "../store";

import Button from "../button";



const SilentFilters = ({user, meta}) => {
	const { register, handleSubmit, watch, errors, control, getValues } = useForm();
	const [,setSilentFilters] = useGlobal(() => null, actions => actions.setSilentFilters);
	const [silentfilters, setSilentfilterstemplates] = useState([]);
	const userSilentFilters = JSON.parse(user?.silentFilters || "[]");
	console.log({userSilentFilters});
	useEffect(() => {
		const rollSilentFilters = JSON.parse(user?.roll?.silentFilters || "[]");
		const categorySilentFilters = JSON.parse(user?.category?.silentFilters || "[]");
		setSilentfilterstemplates(rollSilentFilters.concat(categorySilentFilters));
	}, [user]);

	useEffect(() => {
	  handleSubmit(onSubmit)();
	}, [silentfilters]);



	const filterWithDefaults = [];
	for (var sf of silentfilters) {
		if (typeof sf === "object" && sf !== null) {
			let sfDefault = sf.default;
			for (const usf of userSilentFilters) {
				if (usf.filter === sf.filter) {
					sfDefault = usf.default;
					break;
				}
			}
			filterWithDefaults.push({filter: sf.filter, default: sfDefault});
		} else {
			let sfDefault = "";
			for (const usf of userSilentFilters) {
				if (usf.filter === sf) {
					sfDefault = usf.default;
					break;
				}
			}
			filterWithDefaults.push({filter: sf, default: sfDefault});
		}
	}

	const saveFilters = async data => {
		if (user?.userId) {
			try {
				const res = await fetch("/api/user/edit-user", {
					method: "PATCH",
					body: JSON.stringify({
						id: user.userId,
						col: "silentFilters",
						val: JSON.stringify(Object.keys(data).map(key => (
							{filter: key, default: data[key]}
						))),
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8"
					}
				});
				console.log("trying..");
				const json = await res.json();
				if (!res.ok) throw Error(json.message);
				console.log({res});
			} catch (e) {
				throw Error(e.message);
			}
		}
	};

	const onSubmit = data => {
		const formatted = [];
		for (const reference of Object.keys(data)) {
			formatted.push({filter: "searchField", level: "toplevel", value: data[reference], reference});
		}
		setSilentFilters(formatted);
		saveFilters(data);
	};
	return (
		<form onSubmit={(e) => {e.preventDefault(); handleSubmit(onSubmit)(e);}}>
			{filterWithDefaults.map((fwd, i) => {
				const filtername = meta[fwd.filter].hovername || meta[fwd.filter].title || fwd.filter;
				return (
					<TextField
						key={i}
						id={fwd.filter}
						name={fwd.filter}
						label={filtername}
						type="text"
						inputRef={
							register()
						}
						className="disable-on-inactive"
						// tabIndex={active ? 0 : -1}
						defaultValue={fwd.default}
						error={!!errors.email}
						margin="dense"
					/>

				);
			})}
			<Button
				className="disable-on-inactive"
				width={"100%"}
				style={{marginTop: "15px"}}
				type={"submit"}
			>
        Updaten
			</Button>
		</form>
	);
};

export default SilentFilters;
