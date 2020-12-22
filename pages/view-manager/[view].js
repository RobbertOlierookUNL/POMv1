import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import React, {useContext} from "react";

import { SchemaContext } from "../_app";
import { colorschematic } from "../../config/colors";
import { useView } from "../../lib/swr-hooks";
import Button from "../../components/button";
import Header from "../../components/header/index";
import ViewTable from "../../components/views/viewtable";










const View = () => {
	const router = useRouter();
	const schema = useContext(SchemaContext);
	const {view, v, from } = router.query;

	console.log(v === "duplicated" ? from : view);
	const { data } = useView(v === "duplicated" ? from : view);
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
			<ViewTable data={data}/>
			<style jsx global>{`
        body, html{
          background-color: ${colorschematic(schema).secondary.color};
        }
      `}</style>
		</>
	);
};

export default View;
