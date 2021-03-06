import {useRouter} from "next/router";
import React, {useState} from "react";

import { useCategories, useChains, useRolls } from "../../lib/swr-hooks";
import LoginScreen from "./loginscreen";
import RegisterScreen from "./registerscreen";
import UserScreen from "./userscreen";
import useGlobal from "../store";



const UserOptions = ({loggedIn, admin, user}) => {
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


	const logout = async () => {
		await Router.push(`${admin ? "/admin" : ""}${Router.query.slug && Router.query.slug[1] ? `/${Router.query.slug[1]}` : "/"}`);
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
			{
				// loggedIn ?
				// <UserScreen user={user}/>
				// :
				registerMode || loggedIn ?
					userMenu && <RegisterScreen
						active={userMenu}
						initialData={transportedData}
						transportData={setTransportedData}
						admin={admin}
						loggedIn={loggedIn}
						user={user}
					/>
					:
					<LoginScreen
						active={userMenu}
						initialData={transportedData}
						transportData={setTransportedData}
						admin={admin}
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
