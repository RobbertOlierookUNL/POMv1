import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import {useRouter} from "next/router";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useState, useEffect } from "react";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

import { useCategories, useChains, useRolls } from "../../lib/swr-hooks";
import Button from "../button";
import useGlobal from "../store";







const useStyles = makeStyles((theme) => ({
	formControl: {
		marginTop: theme.spacing(1),
		width: 120,
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
	const {rolls, isLoading: rollsAreLoading, isError: rollsGiveError} = useRolls();
	const {chains, isLoading: chainsAreLoading, isError: chainsGiveError} = useChains();
	const {categories, isLoading: categoriesAreLoading, isError: categoriesGiveError} = useCategories();
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
			const roll = data.roll.rollName;

			try {
				const res = await fetch("/api/user/create-user", {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({...data, roll, firstName, lastName}),
				}, {signal});
				console.log(2);
				const json = await res.json();
				if (!res.ok) throw Error(json.message);
				await Router.push(`/${json.insertId}${Router.query.slug ? `/${Router.query.slug[0]}` : ""}`);
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

				{rolls && <FormControl
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
							{rolls.map((roll, i) => (roll.rollName !== "Admin" &&
								<MenuItem key={i} value={roll}>{roll.rollName}</MenuItem>
							))}
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
				}

				{categories && <FormControl
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
							{categories.map((category, i) => (
								<MenuItem key={i} value={category.categoryName}>{category.categoryName}</MenuItem>
							))}
						</Select>
					}
					name="category"
					control={control}
					defaultValue={initialData.category || ""}
					rules={{ required: true }}
					/>
					{errors.category && <div className="error-message">Kies een categorie</div>}
				</FormControl>
				}
				{console.log({chains, watchRoll})}
				{chains && watchRoll && watchRoll.hasChain === 1 &&
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
								{chains.map((chain, i) => (
									<MenuItem key={i} value={chain.chainName}>{chain.chainName}</MenuItem>
								))}
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
