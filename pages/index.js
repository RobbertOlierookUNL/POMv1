import Head from "next/head";
import React, {useContext} from "react";

import { SchemaContext } from "./_app";
import { colorschematic } from "../config/colors";
import Header from "../components/header";
import MenuButton from "../components/header/menubutton";
import OptionDrawer from "../components/header/optiondrawer";
import Table from "../components/table";
import UserMenu from "../components/usermenu";


export default function Home() {
	const schema = useContext(SchemaContext);


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
			</OptionDrawer>


			<UserMenu>

			</UserMenu>
			<Table/>
			<style jsx global>{`
				body, html{
					background-color: ${colorschematic(schema).secondary.color};
				}
			`}</style>
		</>
	);
}
