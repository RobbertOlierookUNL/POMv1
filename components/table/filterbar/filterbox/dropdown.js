// import { useForm } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, {useState, useEffect} from "react";

import Button from "../../../button";
import useGlobal from "../../../store";

const useStyles = makeStyles((theme) => ({
	formControl: {
		marginTop: theme.spacing(1),
		width: "100%",
	},
	formControlRight: {
		float: "right",
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	root: {
		"& > *": {
			width: "100%",
		},
	},
}));


const DropDown = ({reference, filterName, close, parameters, level}) => {
	const [, addToFilters] = useGlobal(() => null, actions => actions.addToFilters);
	const classes = useStyles();
	const {options} = parameters;
	const sortedOptions = options.sort();
	const [value, setValue] = useState("");
	const [error, setError] = useState(false);

	const add = (event) => {
		event.preventDefault();
		if (value === "") {
			setError(true);
			return;
		}
		addToFilters({
			shorthand: {
				filterName,
				value,
			},
			value,
			reference,
			level,
			filter: "dropdown"
		});
		close();
	};

	// useEffect(() => {
	//
	// }, [parameters]);

	const handleChange = (event) => {
		setError(false);
		setValue(event.target.value);
	};
	return (
		<form onSubmit={add} className="dropdown">
			<h2>Kies een <i>{filterName}</i></h2>
			<FormControl
				className={classes.formControl}
				error={error}
				margin="dense"
			>
				<InputLabel id="label">{filterName}</InputLabel>
				<Select
					labelId={"label"}
					id="options"
					value={value}
					onChange={handleChange}
				>
					{sortedOptions.map((option, i) => (
						<MenuItem key={i} value={option}>{option}</MenuItem>
					))}
				</Select>
				{error && <div className="error-message">Kies een <i>{filterName}</i></div>}

			</FormControl>

			<Button
				width={"100%"}
				style={{marginTop: "15px"}}
				type={"submit"}
			>
				Filter toevoegen
			</Button>
			<style jsx>{`
        h2 {
          text-align: left;
          margin: 0 0 12px;
        }
        .dropdown {
          margin: 7px;
        }
      `}
			</style>
		</form>
	);
};

export default DropDown;
