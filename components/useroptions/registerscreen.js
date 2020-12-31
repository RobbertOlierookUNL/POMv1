import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import FloatingLabelInput from "react-floating-label-input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import React, {useState, useRef, useEffect} from "react";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

import { useToolkit } from "../../lib/custom-hooks";
import Button from "../button";
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
			marginTop: theme.spacing(0),
			width: "100%",
		},
	},
}));




const RegisterScreen = ({active}) => {
	const { register, handleSubmit, watch, errors, control } = useForm();
	const [, setFormRefs] = useGlobal(
		() => null,
		actions => actions.setFormRefs
	);
	const {mergeRefs} = useToolkit();
	// const [email, setEmail] = useState("");
	// const [roll, setRoll] = useState("");
	const rollRef = useRef(null);
	const categoryRef = useRef(null);
	const chainRef = useRef(null);
	useEffect(() => {setFormRefs({rollRef, categoryRef, chainRef});},[]);
	const classes = useStyles();
	const onSubmit = (data) => console.log(data);
	const watchRoll = watch("roll");
	// const	onSubmit = () => console.log(rollRef);

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3>Registreren</h3>
				{/* <FloatingLabelInput
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
				{errors.email && <span className="error-message">Vul je emailadres in</span>} */}
				<div className={classes.root}>
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
						// onChange={e => setEmail(e.target.value)}
					/>
				</div>
				{errors.email && <div className="error-message">Vul je emailadres in</div>}

				<FormControl className={classes.formControl}>

					<InputLabel id="rollLabel">Rol</InputLabel>
					<Controller as={
						<Select
							labelId="rollLabel"
							id="roll"
							ref={rollRef}
							className="disable-on-inactive"
							tabIndex={active ? 0 : -1}
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					}
					name="roll"
					control={control}
					defaultValue=""
					rules={{ required: true }}
					/>
					{errors.roll && <div className="error-message">Kies een rol</div>}

				</FormControl>

				<FormControl className={classes.formControl +" "+ classes.formControlRight}>
					<InputLabel id="categoryLabel">Categorie</InputLabel>
					<Controller as={
						<Select
							labelId="categoryLabel"
							id="category"
							ref={categoryRef}
							className="disable-on-inactive"
							tabIndex={active ? 0 : -1}
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
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
					<FormControl className={classes.formControl}>
						<InputLabel id="chainLabel">Chain</InputLabel>
						<Controller as={
							<Select
								labelId="chainLabel"
								id="chain"
								ref={chainRef}
								className="disable-on-inactive"
								tabIndex={active ? 0 : -1}
							>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
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
				>
						Registreren
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


export default RegisterScreen;
