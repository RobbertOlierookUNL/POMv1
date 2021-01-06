import Head from "next/head";
import React from "react";

import { query } from "../lib/db";
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


export default function Home({user, initialData, view, initialViewMeta}) {
	const [secondary] = useGlobal(
		state => state.secondary,
		() => null
	);
	console.log({user, initialData, view, initialViewMeta});
	return (
		<>
			<Head>
				<title>POM</title>
				<link rel="icon" href="/unilever.ico" />
			</Head>
			<Header fName={user.firstName} lName={user.lastName}>
				<MenuButton/>
				POM
			</Header>
			<OptionDrawer>
				<SchemaDropdown/>
			</OptionDrawer>


			<UserMenu>
				<UserOptions loggedIn={!!user.userId}/>
			</UserMenu>
			<Table
				initialData={initialData}
				view={view}
				initialViewMeta={initialViewMeta} />
			<style jsx global>{`
				body, html{
					background-color: ${secondary.color};
				}
			`}</style>
		</>
	);
}

export async function getStaticProps(context) {
	let user = {};
	if (context.params && context.params.slug && context.params.slug[0]) {
		const getUser = await query(/* sql */`
	        SELECT * FROM user_table_v3test
					WHERE userId = ?
		      `,
		context.params.slug[0]
		);
		user = JSON.parse(JSON.stringify(getUser[0]));
	}
	const getData = await query(/* sql */`
		SELECT * FROM website_output_table_v3test
		ORDER BY tkey DESC
		`);
	const initialData = JSON.parse(JSON.stringify(getData));

	const view = "salesview";
	const getView = await query(/* sql */`
		SELECT *
		FROM view_metadata_table_v3test
		WHERE view_name = ?
		`,
	view
	);
	const initialViewMeta = JSON.parse(JSON.stringify(getView[0]));



	return {
		props: {
			user,
			initialData,
			view,
			initialViewMeta
		},
	};
}

export async function getStaticPaths() {
	const userIds = await query(/* sql */`
	      SELECT userId FROM user_table_v3test
	  `);
	const mappedIds = JSON.parse(JSON.stringify(userIds.map(id => ({ params: { slug: [`${id.userId}`]}}))));

	return {
		paths: [
			{ params: { slug: [] } },
			...mappedIds
		],
		fallback: false
	};
}
