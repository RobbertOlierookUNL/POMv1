import Head from "next/head";
import React from "react";

import Header from "../components/header";
import MenuButton from "../components/header/menubutton";
import OptionDrawer from "../components/header/optiondrawer";
import SchemaDropdown from "../components/schemadropdown";
import Table from "../components/table";
import UserMenu from "../components/usermenu";
import useGlobal from "../components/store";



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
			<Header>
				<MenuButton/>
				POM
			</Header>
			<OptionDrawer>
				<SchemaDropdown/>
			</OptionDrawer>


			<UserMenu>

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
