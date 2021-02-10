import Head from "next/head";
import React from "react";

import { isNumeric } from "../lib/custom-hooks";
import { query } from "../lib/db";
import { useDataForView } from "../lib/enhanced-swr-hooks";
import Header from "../components/header";
import MenuButton from "../components/header/menubutton";
import OptionDrawer from "../components/header/optiondrawer";
import Options from "../components/options";
import Shadow from "../components/shadow";
import Table from "../components/table";
import UserMenu from "../components/header/usermenu";
import UserOptions from "../components/useroptions";
import useGlobal from "../components/store";




export default function Home({user, view, initialViewMeta, extendedView, initialExtendedView}) {
	const {
		filteredData,
		meta,
		keys,
		hasLoaded,
		filterParameters,
		sortedKeys,
		requestSort,
		sortConfig,
		updateEntry,
	} = useDataForView(view, initialViewMeta, extendedView, initialExtendedView);
	const [secondary] = useGlobal(
		state => state.secondary,
		() => null
	);
	const [options] = useGlobal(
		state => state.options,
		() => null
	);
	const [userMenu] = useGlobal(
		state => state.userMenu,
		() => null
	);
	const [filterModal] = useGlobal(
		state => state.filterModal,
		() => null
	);

	console.log({user});
	return (
		<>
			<Head>
				<title>POM</title>
				<link rel="icon" href="/unilever.ico" />
			</Head>
			<Header fName={user.firstName} lName={user.lastName}>
				<MenuButton/>
				{user?.roll ? `${user.roll.hasCategory ? user.category.categoryName : ""} ${user.roll.rollName} ${user.roll.hasChain ? user.chain.chainName : ""}` : "POM"}
			</Header>
			<Shadow
				zIndex={8}
				trigger={options || userMenu || filterModal}
				softTrigger={userMenu && !options && !filterModal}
				clickthrough={false}/>
			<OptionDrawer>
				<Options user={user} meta={meta}/>
			</OptionDrawer>
			<UserMenu>
				<UserOptions loggedIn={!!user.userId}/>
			</UserMenu>
			<Table
				// initialData={initialData}
				data={
					{
						filteredData,
						meta,
						keys,
						hasLoaded,
						filterParameters,
						sortedKeys,
						requestSort,
						sortConfig,
						updateEntry
					}
				}
			/>
			<style jsx global>{`
				body, html{
					background-color: ${secondary.color};
					background: linear-gradient(80deg, ${secondary.color}, white);
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
				if (!getUser[0]) {return {redirect: {
					destination: "/",
					permanent: false,
				},};}
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

	let getExtendedView = [null];
	let extendedView = null;
	if (getView[0]?.config) {
		const config = JSON.parse(getView[0].config);
		if (config?.extendable) {
			extendedView = config.extend;
			getExtendedView = await query(/* sql */`
				SELECT *
				FROM view_metadata_table_v3test
				WHERE view_name = ?
				`,
			extendedView
			);
		}
	}

	const initialViewMeta = JSON.parse(JSON.stringify(getView[0]));
	const initialExtendedView = JSON.parse(JSON.stringify(getExtendedView[0]));

	return {
		props: {
			user,
			view,
			initialViewMeta,
			extendedView,
			initialExtendedView,
		},
		// revalidate: 1,
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
