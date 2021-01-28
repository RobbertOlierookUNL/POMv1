import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import { useUser, useView } from "../../../../lib/swr-hooks";
import Button from "../../../../components/button";
import Header from "../../../../components/header/index";
import UserMenu from "../../../../components/header/usermenu";
import UserOptions from "../../../../components/useroptions";
import ViewTable from "../../../../components/views/viewtable";
import useGlobal from "../../../../components/store";













const View = () => {
	const Router = useRouter();
	const [secondary] = useGlobal(
		state => state.secondary,
		() => null
	);
	const {view, v, from, userId } = Router.query;
	const {data: user} = useUser(userId || 0);
	console.log({user, userId});
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
			<Header admin fName={user && user.firstName} lName={user && user.lastName}>
				<Link href={`/admin/${Router.query.userId}/view-manager/`}>
					<div>
						<Button style={{fontSize: "1.1em"}}>
							<FontAwesomeIcon icon={faArrowLeft} />
						</Button>
					</div>
				</Link>
				{view}
			</Header>
			<UserMenu>
				<UserOptions loggedIn={user && !!user.userId} admin/>
			</UserMenu>
			<ViewTable data={data}/>
			<style jsx global>{`
        body, html{
          background-color: ${secondary.color};
        }
      `}</style>
		</>
	);
};

export default View;
