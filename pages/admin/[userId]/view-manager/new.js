import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { useUser } from "../../../../lib/swr-hooks";
import Button from "../../../../components/button";
import Header from "../../../../components/header/index";
import NewViewName from "../../../../components/views/newviewname";
import useGlobal from "../../../../components/store";












const View = () => {
	const Router = useRouter();
	const {duplicate, userId} = Router.query;
	const [title, setTitle] = useState("Nieuwe view");
	const {data: user} = useUser(userId || 0);

	const [secondary] = useGlobal(
		state => state.secondary,
		() => null
	);

	useEffect(() => {
		if (duplicate) {
			setTitle(`${duplicate} dupliceren`);
		}
	}, []);


	// const [mounted, setMounted] = useState(false);
	// const { data } = useView(mounted ? view : null);
	// useEffect(() => {
	// 	if (view) {
	// 		setMounted(true);
	// 	}
	// }, [view]);

	return (
		<>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/unilever.ico" />
			</Head>
			<Header admin fName={user && user.firstName} lName={user && user.lastName}>
				<Link href={`/admin/${Router.query.userId}/view-manager`}>
					<div>
						<Button style={{fontSize: "1.1em"}}>
							<FontAwesomeIcon icon={faArrowLeft} />
						</Button>
					</div>
				</Link>
				{title}
			</Header>
			<div className="viewname-container">
				<NewViewName duplicate={duplicate}/>
			</div>
			<style jsx>{`
				.viewname-container {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					justify-content: center;
					align-items: center;
					display: flex;
					transform: translateY(-50px);
				}
			`}</style>
			<style jsx global>{`
        body, html{
          background-color: ${secondary.color};
        }
      `}</style>
		</>
	);
};

export default View;
