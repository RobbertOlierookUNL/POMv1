import Head from "next/head";
import React from "react";

import { isNumeric } from "../lib/custom-hooks";
import { query } from "../lib/db";
import Header from "../components/header";
import MenuButton from "../components/header/menubutton";
import OptionDrawer from "../components/header/optiondrawer";
import SchemaDropdown from "../components/schemadropdown";
import Table from "../components/table";
import UserMenu from "../components/usermenu";
import UserOptions from "../components/useroptions";
import ViewButtons from "../components/viewbuttons";
import useGlobal from "../components/store";







// const firstName="John";
// const lastName="Doe";
// const userId=true;


export default function Home({user, myContext, view, initialViewMeta}) {
	const [secondary] = useGlobal(
		state => state.secondary,
		() => null
	);
	console.log({myContext, user, view});
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
				<ViewButtons/>
			</OptionDrawer>
			<UserMenu>
				<UserOptions loggedIn={!!user.userId}/>
			</UserMenu>
			<Table
				// initialData={initialData}
				view={view}
				initialViewMeta={initialViewMeta}
				user={user}
			/>
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
	let view = "defaultview";
	if (context.params && context.params.slug){
		if (context.params.slug[0]) {
			if (isNumeric(context.params.slug[0])) {
				const getUser = await query(/* sql */`
						SELECT * FROM user_table_v3test
						WHERE userId = ?
						`,
				context.params.slug[0]
				);
				if (!getUser[0]) {return {notFound: true};}
				user = getUser[0];
				if (user.roll) {
					const getRoll = await query(/* sql */`
						 SELECT * FROM roll_metadata_table_v3test
						 WHERE rollName = ?
						 `,
					user.roll
					);
					user.roll = getRoll[0];
					view = getRoll[0].defaultView;
				}
				if (user.chain) {
					const getChain = await query(/* sql */`
						 SELECT * FROM chain_metadata_table_v3test
						 WHERE chainName = ?
						 `,
					user.chain
					);
					user.chain = getChain[0];
				}
				if (user.category) {
					const getCategory = await query(/* sql */`
						 SELECT * FROM category_metadata_table_v3test
						 WHERE categoryName = ?
						 `,
					user.category
					);
					user.category = getCategory[0];
				}

				user = JSON.parse(JSON.stringify(user));

				if (context.params.slug[1]) {
					view = context.params.slug[1];
				}
			} else {
				view = context.params.slug[0];
			}
		}
	}

	const getView = await query(/* sql */`
		SELECT *
		FROM view_metadata_table_v3test
		WHERE view_name = ?
		`,
	view
	);
	if (!getView[0]) {return {notFound: true};}
	const initialViewMeta = JSON.parse(JSON.stringify(getView[0]));

	const myContext = JSON.parse(JSON.stringify(context));


	return {
		props: {
			user,
			view,
			initialViewMeta,
			myContext
		},
	};
}

export async function getStaticPaths() {
	const userIds = await query(/* sql */`
	      SELECT userId FROM user_table_v3test
	  `);
	const viewNames = await query(/* sql */`
				SELECT view_name FROM view_metadata_table_v3test
		`);

	// const mappedIds = [];
	// userIds.forEach(id => {
	// 	mappedIds.push({ params: { slug: [`${id.userId}`]}});
	// 	viewNames.forEach(view => {
	// 		mappedIds.push({ params: { slug: [`${id.userId}`, view.view_name]}});
	// 	});
	// });
	// viewNames.forEach(view => {
	// 	mappedIds.push({ params: { slug:[view.view_name]}});
	// });

	const mappedIds = userIds.map(id => ({ params: { slug: [`${id.userId}`]}}));
	viewNames.forEach(view => {
		mappedIds.push({ params: { slug:[view.view_name]}});
	});
	const parsedIds = JSON.parse(JSON.stringify(mappedIds));

	return {
		paths: [
			{ params: { slug: [] } },
			...parsedIds
		],
		fallback: "blocking"
	};
}
