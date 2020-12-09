import Head from "next/head";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useViews } from "../../lib/swr-hooks";
import AddViewForm from "../../components/views/addviewform";
import Button from "../../components/button";
import GetViews from "../../components/views/getviews";
import Header from "../../components/header";
import Store from "../../components/globalstate/store";
import c from "../../components/colors";

const Views = () => {
	const {views, isLoading, isError} = useViews();
	if (isLoading) {
		return <p>loading</p>;
	}
	else if (isError) {
		return <p>error</p>;
	}
	else if (views.message) {
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
						<FontAwesomeIcon icon={faPlusSquare} />
					</Button>
        View Manager
				</Header>
				<GetViews views={views}/>
				<style jsx global>{`
				body, html{
					background-color: ${c.secondary.color};
				}
			`}</style>
			</Store>
		);
	}
};



export default Views;
