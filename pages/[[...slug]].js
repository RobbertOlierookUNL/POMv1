import Head from "next/head";
import React, {useEffect, useState, useMemo} from "react";
import dynamic from "next/dynamic";

import {
	background,
	categories,
	categoryTable,
	rollTable,
	userTable,
	viewTable
} from "../config/globalvariables";
import { isNumeric } from "../lib/custom-hooks";
import { query } from "../lib/db";
import { useDataForView } from "../lib/enhanced-swr-hooks";
import { useGlobalUser } from "../lib/store-hooks";
import AdminButton from "../components/header/adminbutton";
import CategoryDropdown from "../components/header/categorydropdown";
import Header from "../components/header";
import MenuButton from "../components/header/menubutton";
import OptionDrawer from "../components/header/optiondrawer";
import Options from "../components/options";
import Shadow from "../components/shadow";
import UserMenu from "../components/header/usermenu";
import UserOptions from "../components/useroptions";
import useGlobal from "../components/store";




const Table = dynamic(() => import("../components/table"));









export default function Home({user, view, initialViewMeta, extendedView, initialExtendedView}) {
	const silentFilters = useMemo(() => user?.silentFilters ? JSON.parse(user.silentFilters) : {}, [user]);

	const [category, setCategory] = useState(silentFilters.category || categories[0]);
	useEffect(() => {setCategory(silentFilters.category || category);}, [silentFilters]);

	const [salesMode, setSalesMode] = useState(!!user?.roll?.isSales);
	useEffect(() => {setSalesMode(!!user?.roll?.isSales);}, [!!user?.roll?.isSales]);

	const hasMrp = useMemo(() => user.roll?.hasMrp, [user]);
	const [mrpcMode, setMrpcMode] = useState(!!silentFilters.mrpc && !!hasMrp);

	const [conversionMode, setConversionMode] = useState("HE");


	const updatedFilters = useMemo(() => {
		const obj = {...silentFilters, category};
		if (salesMode) {
			obj.n_step = "Offer2Sales";
		} else {
			if (obj.n_step) {
				delete obj.n_step;
			}
		}
		if (mrpcMode) {
			obj.mrpc = silentFilters.mrpc;
		} else {
			delete obj.mrpc;
		}
		return obj;
	}, [silentFilters, category, salesMode, mrpcMode, hasMrp]);

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
	} = useDataForView(view, initialViewMeta, extendedView, initialExtendedView, updatedFilters, user, conversionMode);
	const [secondary] = useGlobal(
		state => state.secondary,
		() => null
	);
	const [gray_dark] = useGlobal(
		state => state.gray_dark,
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

	useGlobalUser(user);



	// console.log({user});
	return (
		<>
			<Head>
				<title>POM</title>
				<link rel="icon" href="/unilever.ico" />
			</Head>
			<Header fName={user.firstName} lName={user.lastName}>
				<>
					<MenuButton/>
					{(user.roll?.adminRights === "read" || user.roll?.adminRights === "write") && <AdminButton/>}
				</>
			 <>POM<img style={{height: "120%"}} src="/Logo_voor_kleur_vierkant.png"/><CategoryDropdown getter={category} setter={setCategory}/></>
			</Header>
			<Shadow
				zIndex={8}
				softTrigger={userMenu && !options && !filterModal}
				trigger={options || userMenu || filterModal}
				clickthrough={false}/>
			<OptionDrawer>
				<Options
					user={user}
					meta={meta}
					hasMrp={hasMrp}
					mrpcMode={mrpcMode}
					setMrpcMode={setMrpcMode}
					salesMode={salesMode}
					setSalesMode={setSalesMode}
				/>
			</OptionDrawer>
			<UserMenu>
				<UserOptions loggedIn={!!user.userId} user={user}/>
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
						updateEntry,
						salesMode,
						user,
						conversionMode,
						setConversionMode
					}
				}
			/>
			<style jsx global>{`
				body, html{
					/* background-color: ${secondary.color};
					background: linear-gradient(80deg, ${gray_dark.color}, ${secondary.color}); */
					background-color: ${background};
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
						SELECT * FROM ${userTable}
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
						 SELECT * FROM ${rollTable}
						 WHERE rollName = ?
						 `,
					user.roll
					);
					user.roll = getRoll[0];
					view = getRoll[0].defaultView;
				}
				// if (user.chain) {
				// 	const getChain = await query(/* sql */`
				// 		 SELECT * FROM ${chainTable}
				// 		 WHERE chainName = ?
				// 		 `,
				// 	user.chain
				// 	);
				// 	user.chain = getChain[0];
				// }
				if (user.category) {
					const getCategory = await query(/* sql */`
						 SELECT * FROM ${categoryTable}
						 WHERE categoryName = ?
						 `,
					user.category
					);
					if (user?.roll?.viewOverride && JSON.parse(user.roll.viewOverride)?.[user.category]) {
						view = JSON.parse(user.roll.viewOverride)[user.category];
					}
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
		FROM ${viewTable}
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
				FROM ${viewTable}
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
		revalidate: 1,
	};
}

export async function getStaticPaths() {
	const userIds = await query(/* sql */`
	      SELECT userId FROM ${userTable}
	  `);
	const viewNames = await query(/* sql */`
				SELECT view_name FROM ${viewTable}
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
