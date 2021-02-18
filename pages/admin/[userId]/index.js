import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import { isNumeric } from "../../../lib/custom-hooks";
import { useUser } from "../../../lib/swr-hooks";
import Button from "../../../components/button";
import Header from "../../../components/header";
import OptionDrawer from "../../../components/header/optiondrawer";
import SchemaDropdown from "../../../components/options/schemadropdown";
import UserMenu from "../../../components/header/usermenu";
import UserOptions from "../../../components/useroptions";
import ViewButtons from "../../../components/options/viewbuttons";
import useGlobal from "../../../components/store";
import AdminRedirectGrid from "../../../components/admin/redirectgrid";





const Admin = () => {
	const Router = useRouter();
	const {userId} = Router.query;
	console.log(userId);
	// const user = useUser(isNumeric(userId) ? parseInt(userId) : userId);
	const {data: user} = useUser(userId || 0);
	console.log(user);
	const [secondary] = useGlobal(
		state => state.secondary,
		() => null
	);

	return (
		<>
			<Head>
				<title>Admin</title>
				<link rel="icon" href="/unilever.ico" />
			</Head>
			<Header admin fName={user && user.firstName} lName={user && user.lastName}>
				<Link href="/view-manager/new">
					<div>
						<Button style={{fontSize: "1.1em"}}>
							<div>
								<FontAwesomeIcon icon={faPlusSquare} />
							</div>
						</Button>
					</div>
				</Link>
        Admin
			</Header>
			<OptionDrawer>
				<SchemaDropdown/>
				<ViewButtons/>
			</OptionDrawer>
			<UserMenu>
				<UserOptions loggedIn={user && !!user.userId} admin/>
			</UserMenu>
			<AdminRedirectGrid
				hasRead={true}
				hasWrite={true}
				loggedIn
			/>
			<style jsx global>{`
				body, html{
					background-color: ${secondary.color};
				}
				.circle-container {
					width: 100%;
					height: 100vh;
					position: absolute;
					top: 0;
					left: 0;
					justify-content: center;
					align-items: center;
					display: flex;
				}
			`}</style>
		</>
	);
};



export default Admin;
