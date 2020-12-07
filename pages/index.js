import React from "react";
import Head from "next/head";

import Header from "../components/header";
import OptionDrawer from "../components/optiondrawer";
import UserMenu from "../components/usermenu";
import Table from "../components/table";
import c from "../components/colors";

import Store from "../components/globalstate/store";


export default function Home() {
	if(process.env.MYSQL_USERNAME) {
		console.log("It is set!");
	}
	else {
		console.log("No set!");
	}
	return (
		<Store>
			<Head>
				<title>POM</title>
				<link rel="icon" href="/unilever.ico" />
			</Head>
			<Header/>
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
