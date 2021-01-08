import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import Head from "next/head";
import Link from "next/link";
import useRouter from "next/router";
import React, {useContext} from "react";

import useGlobal from "../../../../components/store";
import { useViews } from "../../../../lib/swr-hooks";
import Button from "../../../../components/button";
import GetViews from "../../../../components/views/getviews";
import Header from "../../../../components/header";

const Admin = () => {

	return (
		<>
			<Head>
				<title>Admin</title>
				<link rel="icon" href="/unilever.ico" />
			</Head>
			<Header>
				<Link href="/view-manager/new">
					<div>
						<Button style={{fontSize: "1.1em"}}>
							<div>
								<FontAwesomeIcon icon={faPlusSquare} />
							</div>
						</Button>
					</div>
				</Link>
        View Manager
			</Header>
			{isLoading ?
				<div className="circle-container">
					<CircularProgress/>
				</div>
				:
				<GetViews views={views}/>}
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



export default Views;
