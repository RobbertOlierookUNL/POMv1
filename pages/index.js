import Head from "next/head";
// import styles from "../styles/Home.module.css";
import React from "react";
import Header from "../components/header";
import OptionDrawer from"../components/OptionDrawer";
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



		</Store>
	);
}
