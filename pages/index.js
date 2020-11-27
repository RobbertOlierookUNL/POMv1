import React from "react";
import Head from "next/head";

import Header from "../components/header";
import OptionDrawer from"../components/OptionDrawer";
import UserMenu from"../components/UserMenu";

import Store from "../components/globalstate/store";


export default function Home() {
	return (
		<Store>
			<Head>
				<title>POM</title>
				<link rel="icon" href="/unilever.ico" />
			</Head>
			<Header/>
			<OptionDrawer/>
			<UserMenu/>
		</Store>
	);
}
