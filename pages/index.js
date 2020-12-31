import Head from "next/head";
import React from "react";

import Header from "../components/header";
import MenuButton from "../components/header/menubutton";
import OptionDrawer from "../components/header/optiondrawer";
import SchemaDropdown from "../components/schemadropdown";
import Table from "../components/table";
import UserMenu from "../components/usermenu";
import UserOptions from "../components/useroptions";
import useGlobal from "../components/store";




// const firstName="John";
// const lastName="Doe";
// const userId=true;


const firstName=null;
const lastName=null;
const userId=false;

export default function Home() {
	const [secondary] = useGlobal(
		state => state.secondary,
		() => null
	);
	return (
		<>
			<Head>
				<title>POM</title>
				<link rel="icon" href="/unilever.ico" />
			</Head>
			<Header fName={firstName} lName={lastName}>
				<MenuButton/>
				POM
			</Header>
			<OptionDrawer>
				<SchemaDropdown/>
			</OptionDrawer>


			<UserMenu>
				<UserOptions loggedIn={!!userId}/>
			</UserMenu>
			<Table/>
			<style jsx global>{`
				body, html{
					background-color: ${secondary.color};
				}
			`}</style>
		</>
	);
}
