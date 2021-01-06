import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

import Button from "../button";
import { useForm, Controller } from "react-hook-form";
import {useRouter} from "next/router";
import useGlobal from "../store";






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

const RegisterScreen = ({active, initialData, transportData}) => {
	const { register, handleSubmit, watch, errors, control, getValues } = useForm();
	const [submitting, setSubmitting] = useState(false);
	const [duplicateError, setDuplicateError] = useState(false);
	const [data, setData] = useState(false);
	const classes = useStyles();
	const Router = useRouter();
	const watchRoll = watch("roll");
	const [, expandUserMenu] = useGlobal(
		() => null,
		actions => actions.expandUserMenu
	);

	// useEffect(() => () => {transportData({...initialData, ...getValues()});}, []);
	useEffect(() => () => {transportData(getValues());}, []);


	const onSubmit = async (data) => {
		setSubmitting(true);
		setData(data);
	};
	useEffect(async () => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		if (submitting && data) {
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
				await Router.push(`/${json.insertId}`);
				expandUserMenu(false);

			// const res2 = await fetch(`/api/user/get-user-id?email=${data.email}`, {
			// 	method: "GET",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// });
			// console.log(2);
			// const json2 = await res2.json();
			// if (!res2.ok) throw Error(json2.message);
			// console.log(json2);
			// Router.push("/user/");
			} catch (e) {
				setSubmitting(false);
				if (e.message && e.message.includes("ER_DUP_ENTRY")) {
					setDuplicateError("Deze gebruiker bestaat al, log in of probeer een ander emailadres");
				} else {throw Error(e);}
			}
		}
		return function cleanup() {
			abortController.abort();
		};
	}, [submitting, data]);

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
						defaultValue={initialData.email || ""}
						error={!!errors.email}
						margin="dense"
					/>
				</div>
				{errors.email || duplicateError &&
					<div className="error-message">
						{duplicateError || "Voer een geldig Unilever emailadres in"}
					</div>
				}

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
					defaultValue={initialData.roll || ""}
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
					defaultValue={initialData.category || ""}
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
						defaultValue={initialData.chain || ""}
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
