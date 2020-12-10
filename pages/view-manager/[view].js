import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import { c } from "../../config/colors";
import { useView } from "../../lib/swr-hooks";
import Button from "../../components/button";
import Header from "../../components/header";
import Store from "../../components/globalstate/store";
import ViewTable from "../../components/views/viewtable";








const View = () => {
	const router = useRouter();
	const {view, v } = router.query;
	const { data } = useView(view);
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
				<title>{view}</title>
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
				{view}
			</Header>
			<ViewTable data={data} mode={v}/>
			<style jsx global>{`
        body, html{
          background-color: ${c.secondary.color};
        }
      `}</style>
		</Store>
	);
};

export default View;
