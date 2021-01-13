import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import { useUser, useViews } from "../../../../lib/swr-hooks";
import Button from "../../../../components/button";
import GetViews from "../../../../components/views/getviews";
import Header from "../../../../components/header";
import UserMenu from "../../../../components/usermenu";
import UserOptions from "../../../../components/useroptions";
import useGlobal from "../../../../components/store";




const Views = () => {
	const {views, isLoading, isError} = useViews();
	const Router = useRouter();
	const {userId} = Router.query;
	const {data: user} = useUser(userId || 0);

	const [secondary] = useGlobal(
		state => state.secondary,
		() => null
	);

	if (isError) {
		return <p>error</p>;
	}
	else if (!isLoading && views.message) {
		return <p>not connected</p>;
	}  else {
		return (
			<>
				<Head>
					<title>View Manager</title>
					<link rel="icon" href="/unilever.ico" />
				</Head>
				<Header admin fName={user && user.firstName} lName={user && user.lastName}>
					<div className="header-button-container">
						<Link href={`/admin/${Router.query.userId}`}>
							<div>
								<Button style={{fontSize: "1.1em"}}>
									<FontAwesomeIcon icon={faArrowLeft} />
								</Button>
							</div>
						</Link>
						<Link href={`/admin/${Router.query.userId}/view-manager/new`}>
							<div>
								<Button style={{fontSize: "1.1em"}}>
									<div>
										<FontAwesomeIcon icon={faPlusSquare} />
									</div>
								</Button>
							</div>
						</Link>

					</div>
        View Manager
				</Header>
				<UserMenu>
					<UserOptions loggedIn={user && !!user.userId} admin/>
				</UserMenu>
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
				<style jsx>{`
				.header-button-container {
					display: flex;
				}
			`}</style>
			</>
		);
	}
};



export default Views;
