import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEdit, faSave, faCog } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import React, {useState, useEffect} from "react";

import { useUser, useView } from "../../../../lib/swr-hooks";
import Button from "../../../../components/button";
import Header from "../../../../components/header/index";
import Modal from "../../../../components/modal";
import UserMenu from "../../../../components/header/usermenu";
import UserOptions from "../../../../components/useroptions";
import ViewConfig from "../../../../components/views/viewconfig";
import ViewTable from "../../../../components/views/viewtable";
import useGlobal from "../../../../components/store";















const View = () => {
	const Router = useRouter();
	const [configOpen, setConfigOpen] = useState(false);
	const openConfig = () => setConfigOpen(true);
	const closeConfig = () => setConfigOpen(false);
	const [secondary] = useGlobal(
		state => state.secondary,
		() => null
	);
	const [, setSchema] = useGlobal(
		() => null,
		actions => actions.setSchema
	);
	const [config, setConfig] = useState();
	const {view, v, from, userId } = Router.query;
	const {data: user} = useUser(userId || 0);
	const { data } = useView(v === "duplicated" ? from : view);
	useEffect(() => {
		setConfig(data?.config && JSON.parse(data.config));
	}, [data]);
	useEffect(() => {
		setSchema(config?.theme || 10);
	}, [config]);



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
				<div className="button-container">
					<Link href={`/admin/${Router.query.userId}/view-manager/`}>
						<div>
							<Button style={{fontSize: "1.1em"}}>
								<FontAwesomeIcon icon={faArrowLeft} />
							</Button>
						</div>
					</Link>
					{!v &&
						<Link href={`/admin/${Router.query.userId}/view-manager/${view}?v=edit`}>
							<div>
								<Button style={{fontSize: "1.1em"}}>
									<FontAwesomeIcon icon={faEdit} />
								</Button>
							</div>
						</Link>
					}
					{
						v === "edit" &&
						<Link href={`/admin/${Router.query.userId}/view-manager/${view}`}>
							<div>
								<Button style={{fontSize: "1.1em"}}>
									<FontAwesomeIcon icon={faSave} />
								</Button>
							</div>
						</Link>
					}
					<Button style={{fontSize: "1.1em"}}>
						<FontAwesomeIcon icon={faCog} onClick={openConfig}/>
					</Button>

				</div>
				{view}
			</Header>
			<UserMenu>
				<UserOptions loggedIn={user && !!user.userId} admin/>
			</UserMenu>
			<ViewTable data={data}/>
			{configOpen &&
				<Modal header="Instellingen" close={closeConfig} width="500px" center>
					<ViewConfig data={data} close={closeConfig}/>
				</Modal>
			}
			<style jsx>{`
				.button-container {
					display: inline-flex;
					max-height: 37px;
					overflow: hidden;
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
