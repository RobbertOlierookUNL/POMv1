import Head from "next/head";
import React, {useState} from "react";

import { c } from "../config/colors";
import Header from "../components/header";
import MenuButton from "../components/header/menubutton";
import OptionDrawer from "../components/header/optiondrawer";
import Store from "../components/globalstate/store";
import Table from "../components/table";
import UserMenu from "../components/usermenu";

export default function Home() {
	const [view_name, setView_name] = useState("test");
	const testfuction = async () => {
		try {
			const res = await fetch("/api/duplicate-view", {
				method: "PATCH",
				body: JSON.stringify({
					view_name
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			});
			const json = await res.json();
			if (!res.ok) throw Error(json.message);
		} catch (e) {
			throw Error(e.message);
		}

	};

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
			<OptionDrawer>
				<button onClick={testfuction}>test</button>
			</OptionDrawer>


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
