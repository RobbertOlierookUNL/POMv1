import React, {useState} from "react";

import LoginScreen from "./loginscreen";
import RegisterScreen from "./registerscreen";
import UserScreen from "./userscreen";
import useGlobal from "../store";


const UserOptions = ({loggedIn}) => {
	const [registerMode, setRegisterMode] = useState(false);
	const [primary] = useGlobal(
		state => state.primary,
		() => null
	);
	const [userMenu] = useGlobal(
		state => state.userMenu,
		() => null
	);
	const logout = () => {
		console.log(0);
	};
	const login = () => {
		setRegisterMode(false);
	};
	const register = () => {
		setRegisterMode(true);
	};
	return (
		<div className={"user-container"}>
			<div className={"top-right-button"}>
				{loggedIn ?
					<div onClick={logout}>Uitloggen</div>
					: registerMode ?
						<div onClick={login}>Inloggen</div>
						:
						<div onClick={register}>Registreren</div>
				}
			</div>
			{loggedIn ?
				<UserScreen active={userMenu}/>
				: registerMode ?
					<RegisterScreen active={userMenu}/>
					:
					<LoginScreen active={userMenu}/>
			}
			<style jsx>{`
				.top-right-button {
					color: ${primary.color};
					font-size: 0.8em;
					float: right;
					user-select: none;
					cursor: pointer;

				}
			`}</style>
		</div>
	);};


export default UserOptions;
