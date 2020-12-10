import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import Head from "next/head";
import React from "react";

import { c } from "../../config/colors";
import { useViews } from "../../lib/swr-hooks";
import Button from "../../components/button";
import GetViews from "../../components/views/getviews";
import Header from "../../components/header";
import Store from "../../components/globalstate/store";




const Views = () => {
	const {views, isLoading, isError} = useViews();
	if (isError) {
		return <p>error</p>;
	}
	else if (!isLoading && views.message) {
		return <p>not connected</p>;
	}  else {
		return (
			<Store>
				<Head>
					<title>View Manager</title>
					<link rel="icon" href="/unilever.ico" />
				</Head>
				<Header>
					<Button style={{fontSize: "1.1em"}}>
						<div>
							<FontAwesomeIcon icon={faPlusSquare} />
						</div>
					</Button>
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
					background-color: ${c.secondary.color};
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
			</Store>
		);
	}
};



export default Views;
