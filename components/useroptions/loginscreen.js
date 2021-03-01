import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import FloatingLabelInput from "react-floating-label-input";
import Button from "../button";
import TextField from "@material-ui/core/TextField";
// import { makeStyles } from "@material-ui/core/styles";
import {useRouter} from "next/router";
import useGlobal from "../store";



// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		"& > *": {
// 			width: "100%",
// 		},
// 	},
// }));

const LoginScreen = ({active, initialData, transportData, admin}) => {
	const { register, handleSubmit, getValues, errors } = useForm();
	// const classes = useStyles();
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(false);
	const [data, setData] = useState(false);
	const Router = useRouter();
	const [, expandUserMenu] = useGlobal(
		() => null,
		actions => actions.expandUserMenu
	);

	const onSubmit = data => {
		setData(data);
		setSubmitting(true);

	};

	useEffect(() => {(async () => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		if (submitting && data) {
			try {
				const res = await fetch(`/api/user/get-user-id?email=${data.email.toLowerCase()}`, {signal});
				const json = await res.json();
				if (!res.ok) throw Error(json.message);
				Router.push(`${admin ? "/admin" : ""}/${json.userId}${Router.query.slug ? `/${Router.query.slug[0]}` : ""}`);
				// Router.reload();
				expandUserMenu(false);
			} catch (e) {
				setSubmitting(false);
				if (e.message && e.message.includes("argument entity is required")) {
					setError("Emailadres niet bekend, registreer eerst");
				} else {
					throw Error(e);
				}
			}
		}
		return function cleanup() {
			abortController.abort();
		};
	})();
	}, [submitting, data]);

	useEffect(() => () => {transportData({...initialData, email: getValues("email")});}, []);

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3>Inloggen</h3>
				<div
					className={"full-width"}
					// className={typeof window !== "undefined" && classes.root}
				>
					<TextField
						id="email"
						name="email"
						label="E-mail"
						type="email"
						inputRef={register({required: true})}
						// value={email}
						className="disable-on-inactive full-width"
						tabIndex={active ? 0 : -1}
						defaultValue={initialData.email || ""}
						error={!!errors.email || error}
						margin="dense"
						// onChange={e => setEmail(e.target.value)}
					/>
				</div>
				{errors.email || error && <div className="error-message">{error ? error : "Vul je emailadres in"}</div>}
				<Button
					className="disable-on-inactive"
					width={"100%"}
					style={{marginTop: "15px"}}
					type={"submit"}
					tabIndex={active ? 0 : -1}
				>
					{submitting ? "Verwerken.." : "Inloggen"}
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
				.full-width {
					width: 100%;
				}
			`}</style>
		</div>
	);
};


export default LoginScreen;
