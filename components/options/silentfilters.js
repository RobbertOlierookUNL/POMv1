import { TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import React from "react";

import Button from "../button";



const SilentFilters = ({user, meta}) => {
	const { register, handleSubmit, watch, errors, control, getValues } = useForm();
	const silentfilters = JSON.parse(user?.roll?.silentFilters || []);
	const filterWithDefaults = [];
	for (var sf of silentfilters) {
		if (typeof sf === "object" && sf !== null) {
			filterWithDefaults.push(sf);
		} else {
			filterWithDefaults.push({filter: sf, default: ""});
		}
	}
	const onSubmit = data => {
		console.log(data);
	};
	console.log({filterWithDefaults, meta});
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{filterWithDefaults.map((fwd, i) => {
				const filtername = meta[fwd.filter].hovername || meta[fwd.filter].title || fwd.filter;
				return (
					<>
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
					</>
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
