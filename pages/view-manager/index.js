import Head from "next/head";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useViews } from "../../lib/swr-hooks";
import AddViewForm from "../../components/views/addviewform";
import AddViewHeader from "../../components/views/addviewheader";
import Button from "../../components/button";
import GetViews from "../../components/views/getviews";
import Header from "../../components/header";
import Store from "../../components/globalstate/store";
import c from "../../components/colors";







const Views = () => {
	const {views, isLoading} = useViews();
	console.log(views);
	if (isLoading) {
		return <p>loading</p>;
	}
	return (
		<Store>
			<Head>
				<title>POM</title>
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
};



export default Views;
