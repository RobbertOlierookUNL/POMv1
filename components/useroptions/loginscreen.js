import React, {useState} from "react";
import { useForm } from "react-hook-form";
import FloatingLabelInput from "react-floating-label-input";
import Button from "../button";
import useGlobal from "../store";


const LoginScreen = ({active}) => {
	const { register, handleSubmit, watch, errors } = useForm();
	const [email, setEmail] = useState("");
	const onSubmit = data => console.log(data);
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3>Inloggen</h3>
				<FloatingLabelInput
					id="email"
					name="email"
					label="E-mail"
					refs={register({required: true})}
					value={email}
					type="email"
					onChange={e => setEmail(e.target.value)}
					className="disable-on-inactive"
					tabIndex={active ? 0 : -1}
				/>
				{errors.email && <span className="error-message">Vul je emailadres in</span>}
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
					margin: 13px 0 15px 0;
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
