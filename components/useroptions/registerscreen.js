import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

import Button from "../button";
import { useForm, Controller } from "react-hook-form";
import {useRouter} from "next/router";






const useStyles = makeStyles((theme) => ({
	formControl: {
		marginTop: theme.spacing(1),
		minWidth: 120,
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


function titleCase(str) {
	var splitStr = str.toLowerCase().split(" ");
	for (var i = 0; i < splitStr.length; i++) {
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	return splitStr.join(" ");
}

const RegisterScreen = ({active}) => {
	const { register, handleSubmit, watch, errors, control } = useForm();
	const [submitting, setSubmitting] = useState(false);

	const classes = useStyles();
	const Router = useRouter();


	const onSubmit = async (data) => {
		setSubmitting(true);
		data.email = data.email.toLowerCase();
		const [fName, lName] = data.email.replace("@unilever.com", "").replace("-", " ").split(".");
		const firstName = titleCase(fName);
		const lastName = titleCase(lName);
		try {
			const res = await fetch("/api/user/create-user", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({...data, firstName, lastName}),
			});
			console.log(2);
			const json = await res.json();
			if (!res.ok) throw Error(json.message);
			Router.push("/user/");
		} catch (e) {
			throw Error(e.message);
		}
	};
	const watchRoll = watch("roll");

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3>Registreren</h3>
				<div className={classes.root}>
					<TextField
						id="email"
						name="email"
						label="E-mail"
						type="email"
						inputRef={
							register({
								required: true,
								validate: value => {
									const lowercasedVal = value.toLowerCase();
									if (!lowercasedVal.endsWith("@unilever.com")) {
										return false;
									}
									const strippedVal = lowercasedVal.replace("@unilever.com", "");
									if (!strippedVal.includes(".")){
										return false;
									}
									return true;
								}
							})
						}
						className="disable-on-inactive"
						tabIndex={active ? 0 : -1}
						defaultValue=""
						error={!!errors.email}
						margin="dense"
					/>
				</div>
				{errors.email && <div className="error-message">Voer een geldig Unilever emailadres in</div>}

				<FormControl
					className={classes.formControl}
					error={!!errors.roll}
					margin="dense"
				>

					<InputLabel id="rollLabel">Rol</InputLabel>
					<Controller render={(props) => (
						<Select
							labelId="rollLabel"
							id="roll"
							className="disable-on-inactive"
							tabIndex={active ? 0 : -1}
							{...props}
						>
							<MenuItem value={"test"}>Ten</MenuItem>
							<MenuItem value={"test2"}>Twenty</MenuItem>
							<MenuItem value={"test3"}>Thirty</MenuItem>
						</Select>
					)
					}
					name="roll"
					control={control}
					defaultValue=""
					rules={{ required: true }}
					/>
					{errors.roll && <div className="error-message">Kies een rol</div>}

				</FormControl>

				<FormControl
					className={classes.formControl +" "+ classes.formControlRight}
					error={!!errors.category}
					margin="dense"
				>
					<InputLabel id="categoryLabel">Categorie</InputLabel>
					<Controller as={
						<Select
							labelId="categoryLabel"
							id="category"
							className="disable-on-inactive"
							tabIndex={active ? 0 : -1}
						>
							<MenuItem value={"test"}>Ten</MenuItem>
							<MenuItem value={"test2"}>Twenty</MenuItem>
							<MenuItem value={"test3"}>Thirty</MenuItem>
						</Select>
					}
					name="category"
					control={control}
					defaultValue=""
					rules={{ required: true }}
					/>
					{errors.category && <div className="error-message">Kies een categorie</div>}
				</FormControl>

				{watchRoll === 20 &&
					<FormControl
						className={classes.formControl}
						error={!!errors.chain}
						margin="dense"
					>
						<InputLabel id="chainLabel">Chain</InputLabel>
						<Controller as={
							<Select
								labelId="chainLabel"
								id="chain"
								className="disable-on-inactive"
								tabIndex={active ? 0 : -1}
							>
								<MenuItem value={"test"}>Ten</MenuItem>
								<MenuItem value={"test2"}>Twenty</MenuItem>
								<MenuItem value={"test3"}>Thirty</MenuItem>
							</Select>
						}
						name="chain"
						control={control}
						defaultValue=""
						rules={{ required: true }}
						/>
						{errors.chain && <div className="error-message">Kies een chain</div>}
					</FormControl>
				}

				<Button
					className="disable-on-inactive"
					width={"100%"}
					style={{marginTop: "15px"}}
					type={"submit"}
					tabIndex={active ? 0 : -1}
					disabled={submitting}
				>
					{submitting ? "Verwerken..." : "Registreren"}
				</Button>
			</form>
			<style jsx>{`
				h3 {
					margin: 13px 0 5px 0;
				}
				.error-message{
					color: red;
					font-size: 0.7em;
				}
			`}</style>
			<style jsx global>{`
				.disable-on-inactive {
					pointer-events: ${active ? "auto" : "none"};
				}
			`}</style>
		</div>
	);
};


export default RegisterScreen;
