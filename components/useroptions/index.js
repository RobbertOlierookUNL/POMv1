import React, {useState} from "react";

import LoginScreen from "./loginscreen";
import RegisterScreen from "./registerscreen";
import UserScreen from "./userscreen";
import useGlobal from "../store";
import {useRouter} from "next/router";


const UserOptions = ({loggedIn}) => {
	const [registerMode, setRegisterMode] = useState(false);
	const [primary] = useGlobal(
		state => state.primary,
		() => null
	);
	const [userMenu, expandUserMenu] = useGlobal(
		state => state.userMenu,
		actions => actions.expandUserMenu
	);
	const [transportedData, setTransportedData] = useState({});
	const Router = useRouter();


	const logout = () => {
		Router.push("/");
		expandUserMenu(false);

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
					<RegisterScreen
						active={userMenu}
						initialData={transportedData}
						transportData={setTransportedData}/>
					:
					<LoginScreen
						active={userMenu}
						initialData={transportedData}
						transportData={setTransportedData}
					/>
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
