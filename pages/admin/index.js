import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import Button from "../../components/button";
import Header from "../../components/header";
import OptionDrawer from "../../components/header/optiondrawer";
import SchemaDropdown from "../../components/options/schemadropdown";
import UserMenu from "../../components/header/usermenu";
import UserOptions from "../../components/useroptions";
import ViewButtons from "../../components/options/viewbuttons";
import useGlobal from "../../components/store";



const Admin = () => {
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
			<Header admin>
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
				<UserOptions loggedIn={false} admin/>
			</UserMenu>

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
