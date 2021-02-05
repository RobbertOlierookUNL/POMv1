import { TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import React, {useState, useEffect, useRef} from "react";
import useGlobal from "../store";

import Button from "../button";



const SilentFilters = ({user, meta}) => {
	const { register, handleSubmit, watch, errors, control, getValues } = useForm();
	const [,setSilentFilters] = useGlobal(() => null, actions => actions.setSilentFilters);
	const [silentfilters, setSilentfilterstemplates] = useState([]);
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
			filterWithDefaults.push(sf);
		} else {
			filterWithDefaults.push({filter: sf, default: ""});
		}
	}
	const onSubmit = data => {
		const formatted = [];
		for (const reference of Object.keys(data)) {
			formatted.push({filter: "searchField", level: "toplevel", value: data[reference], reference});
		}
		setSilentFilters(formatted);
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
							register({
								required: true
							})
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
