import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import React, {useState, useEffect} from "react";

import { c } from "../../config/colors";
import Button from "../../components/button";
import Header from "../../components/header/index";
import NewViewName from "../../components/views/newviewname";
import Store from "../../components/globalstate/store";










const View = () => {
	const router = useRouter();
	const {duplicate} = router.query;
	const [title, setTitle] = useState("Nieuwe view");
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
		<Store>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/unilever.ico" />
			</Head>
			<Header>
				<Link href="/view-manager">
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
          background-color: ${c.secondary.color};
        }
      `}</style>
		</Store>
	);
};

export default View;
