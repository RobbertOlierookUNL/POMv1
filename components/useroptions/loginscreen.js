import React, {useState} from "react";
import { useForm } from "react-hook-form";
import FloatingLabelInput from "react-floating-label-input";
import Button from "../button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			width: "100%",
		},
	},
}));

const LoginScreen = ({active}) => {
	const { register, handleSubmit, watch, errors } = useForm();
	const classes = useStyles();
	const onSubmit = data => console.log(data);
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3>Inloggen</h3>
				<div className={typeof window !== "undefined" && classes.root}>
					<TextField
						id="email"
						name="email"
						label="E-mail"
						type="email"
						inputRef={register({required: true})}
						// value={email}
						className="disable-on-inactive"
						tabIndex={active ? 0 : -1}
						defaultValue=""
						error={!!errors.email}
						margin="dense"
						// onChange={e => setEmail(e.target.value)}
					/>
				</div>
				{errors.email && <div className="error-message">Vul je emailadres in</div>}
				<Button
					className="disable-on-inactive"
					width={"100%"}
					style={{marginTop: "15px"}}
					type={"submit"}
					tabIndex={active ? 0 : -1}
				>
						Inloggen
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


export default LoginScreen;
