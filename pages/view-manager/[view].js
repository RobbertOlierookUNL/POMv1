import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import React, {useState, useEffect} from "react";

import { useView } from "../../lib/swr-hooks";
import Button from "../../components/button";
import Header from "../../components/header";
import Store from "../../components/globalstate/store";
import ViewTable from "../../components/views/viewtable/index.js";
import c from "../../components/colors";



const View = () => {
	const router = useRouter();
	const { view, v } = router.query;
	const { data } = useView(view);
	console.log(data);


	return (
		<Store>
			<Head>
				<title>{view}</title>
				<link rel="icon" href="/unilever.ico" />
			</Head>
			<Header>
				<Link href="/view-manager">
					<Button style={{fontSize: "1.1em"}}>
						<FontAwesomeIcon icon={faArrowLeft} />
					</Button>
				</Link>
				{view}
			</Header>
			{data && <ViewTable data={data} mode={v}/>}
			<style jsx global>{`
        body, html{
          background-color: ${c.secondary.color};
        }
      `}</style>
		</Store>
	);
};

export default View;
