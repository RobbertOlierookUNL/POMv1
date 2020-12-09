import Head from "next/head";
import React from "react";

import Header from "../components/header";
import MenuButton from "../components/menubutton";
import OptionDrawer from "../components/optiondrawer";
import Store from "../components/globalstate/store";
import Table from "../components/table";
import UserMenu from "../components/usermenu";
import c from "../components/colors";



export default function Home() {

	return (
		<Store>
			<Head>
				<title>POM</title>
				<link rel="icon" href="/unilever.ico" />
			</Head>
			<Header>
				<MenuButton/>
				POM
			</Header>
			<OptionDrawer/>
			<UserMenu/>
			<Table/>
			<style jsx global>{`
				body, html{
					background-color: ${c.secondary.color};
				}
			`}</style>
		</Store>
	);
}
