import { Grid, Switch, Typography } from "@material-ui/core";
import React from "react";

import { useTheme } from "../../../lib/custom-hooks";






const ConversionSwitch = ({setter, getter}) => {
	const {primary_light, primary_very_light, primary_dark} = useTheme();

	const handleChange = e => {
		if (e.target.checked) {
			setter("CE");
		} else {
			setter("HE");

		}
	};
	return (
		<Typography component="div">
			<Grid component="label" container alignItems="flex-end" spacing={0}>
				<Grid item>HE</Grid>
				<Grid item>
					<Switch checked={getter === "CE"} size="small" color="default" onChange={handleChange} name="conversion" />
				</Grid>
				<Grid item>CE</Grid>
			</Grid>
		</Typography>

	);
};

export default ConversionSwitch;
