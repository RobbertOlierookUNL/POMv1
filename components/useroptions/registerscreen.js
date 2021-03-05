import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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

const RegisterScreen = ({active, initialData, transportData, admin, loggedIn, user}) => {
	const { register, handleSubmit, watch, errors, control, getValues } = useForm();
	const [updateThis, forceUpdate] = useState(0);
	const [submitting, setSubmitting] = useState(false);
	const [duplicateError, setDuplicateError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [rollObj, setRollObj] = useState({});
	const [data, setData] = useState(false);
	const classes = useStyles();
	const Router = useRouter();
	const watchRoll = watch("roll");
	const {rolls, isLoading: rollsAreLoading, isError: rollsGiveError} = useRolls();
	// const {chains, isLoading: chainsAreLoading, isError: chainsGiveError} = useChains();
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

	useEffect(() => {
		if (!rollsAreLoading) {
			setRollObj(rolls.find(e => e.rollName === watchRoll) || {});
			setLoading(false);
		} else {
			forceUpdate(updateThis+1);
			setLoading(true);
		}
	}, [watchRoll, updateThis, rollsAreLoading]);

	useEffect(() => {(async () => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		if (submitting && data) {
			let firstName, lastName;
			if (!loggedIn) {
				data.email = data.email.toLowerCase();
				const [fName, lName] = data.email.replace("@unilever.com", "").replace("-", " ").split(".");
				firstName = titleCase(fName);
				lastName = titleCase(lName);
			}

			const sf = {};
			if (data.category !== "all" ) {
				sf.category = data.category;
			}
			if (data.mrp) {
				sf.mrpc = data.mrp.split(" ");
			}
			const thisRoll = rolls.find(r => r.rollName === data.roll);
			if (thisRoll?.isSales) {
				sf.n_step = "Offer2Sales";
			}

			try {
				if (loggedIn) {
					const res = await fetch("/api/user/update-user", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							...data,
							 sf: JSON.stringify(sf),
							 userId: user.userId
						 }),
					}, {signal});
					const json = await res.json();
					if (!res.ok) throw Error(json.message);
					expandUserMenu(false);
					Router.reload();
				} else {
					const res = await fetch("/api/user/create-user", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({...data, firstName, lastName, sf: JSON.stringify(sf)}),
					}, {signal});
					const json = await res.json();
					if (!res.ok) throw Error(json.message);
					expandUserMenu(false);
					Router.push(`${admin ? "/admin" : ""}/${json.insertId}${Router.query.slug ? `/${Router.query.slug[0]}` : ""}`);

				}
			} catch (e) {
				setSubmitting(false);
				if (e.message && e.message.includes("ER_DUP_ENTRY")) {
					setDuplicateError("Deze gebruiker bestaat al, log in of probeer een ander emailadres");
				} else {throw Error(e);}
			}
		}
		return function cleanup() {
			abortController.abort();
		};})();
	}, [submitting, data]);

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3>{loggedIn ? "Profiel" : "Registreren"}</h3>
				{!loggedIn &&
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
						defaultValue={ initialData.email || ""}
						error={!!errors.email}
						margin="dense"
					/>
				</div>
				}
				{(errors.email || duplicateError) &&
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
							{!rollsAreLoading && !rollsGiveError && rolls.map((roll, i) => (roll.rollName !== "Admin" &&
								<MenuItem key={i} value={roll.rollName}>{roll.rollName}</MenuItem>
							))}
						</Select>
					)
					}
					name="roll"
					control={control}
					defaultValue={loggedIn ? user.roll.rollName : (initialData.roll || "")}
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
							{(!categoriesAreLoading && !categoriesGiveError) &&
								rollObj.hasCategory ? categories.map((category, i) => (
									<MenuItem key={i} value={category?.categoryName}>{category?.categoryName}</MenuItem>
								)) :
								<MenuItem value="all">Alle</MenuItem>
							}
						</Select>
					}
					name="category"
					control={control}
					defaultValue={loggedIn ? user?.category?.categoryName : (initialData.category || "")}
					rules={{ required: true }}
					/>
					{errors.category && <div className="error-message">Kies een categorie</div>}
				</FormControl>
				{/* {watchRoll && rollObj.hasChain === 1 &&
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
								{!chainsAreLoading && !chainsGiveError && chains.map((chain, i) => (
									<MenuItem key={i} value={chain.chainName}>{chain.chainName}</MenuItem>
								))}
							</Select>
						}
						name="chain"
						control={control}
						defaultValue={loggedIn ? user.chain.chainName : (initialData.chain || "")}
						rules={{ required: true }}
						/>
						{errors.chain && <div className="error-message">Kies een chain</div>}
					</FormControl>
				} */}
				{watchRoll && rollObj.hasMrp === 1 &&
					<>
						<div className={classes.root}>
							<TextField
								id="mrp"
								name="mrp"
								label="MRP's"
								type="text"
								inputRef={
									register()
								}
								className="disable-on-inactive"
								tabIndex={active ? 0 : -1}
								defaultValue={(loggedIn && user.silentFilters) ? JSON.parse(user.silentFilters)?.mrpc?.join(" ") : (initialData.mrp || "")}
								error={!!errors.mrp}
								margin="dense"
							/>
						</div>
						<p><small>Scheid verschillende MRPs met een spatie</small></p>
					</>
				}

				{loading && <FontAwesomeIcon icon={faSpinner}/>}
				<Button
					className="disable-on-inactive"
					width={"100%"}
					style={{marginTop: "15px"}}
					type={"submit"}
					tabIndex={active ? 0 : -1}
					disabled={submitting || loading}
				>
					{submitting ? "Verwerken..." : loggedIn ? "Profiel Updaten" : "Registreren"}
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
