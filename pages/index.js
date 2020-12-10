import Head from "next/head";
import React from "react";

import { c } from "../config/colors";
import Header from "../components/header";
import MenuButton from "../components/header/menubutton";
import OptionDrawer from "../components/header/optiondrawer";
import Store from "../components/globalstate/store";
import Table from "../components/table";
import UserMenu from "../components/usermenu";

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
