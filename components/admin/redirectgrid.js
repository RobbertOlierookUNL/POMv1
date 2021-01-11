import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";


import { useColors } from "../../lib/custom-hooks";
import { useUsers, useViews } from "../../lib/swr-hooks";
import Card from "../card";
import ShowEntries from "./showentries";






const AdminRedirectGrid = ({loggedIn, hasRead, hasWrite}) => {
	const [gray_very_light] = useColors("gray_lighter");
	const Router = useRouter();
	const {users, isLoading: usersAreLoading, isError: usersGiveError} = useUsers();
	const {views, isLoading: viewsAreLoading, isError: viewsGiveError} = useViews();

	return (
		<div className="grid-container">
			<div className="grid-item users">
				<Card
					title="Gebruikersaccounts"
					bodyPadding
					titlefloater={hasWrite &&
          <Link href={{}}><div className={"act-as-button"}><FontAwesomeIcon icon={faEdit}/></div>
          </Link>
					}>
					<ShowEntries
						data={users}
						loading={usersAreLoading}
						error={usersGiveError}
						hasRead={hasRead}
						hasWrite={hasWrite}
						loggedIn={loggedIn}
						columns="firstName lastName roll category chain lastLogin"
						height="30px"
						width="3fr 3fr 2fr 2fr 2fr 3fr"
					/>
				</Card>
			</div>
			<div className="grid-item rolls">
				<Card
					title="Rollen"
					titlefloater={hasWrite &&
          <Link href={{}}><div className={"act-as-button"}><FontAwesomeIcon icon={faEdit}/></div>
          </Link>}
					bodyPadding>
					<ShowEntries
						data={users}
						loading={usersAreLoading}
						error={usersGiveError}
						hasRead={hasRead}
						hasWrite={hasWrite}
						loggedIn={loggedIn}
						columns="firstName lastName roll category chain lastLogin"
						height="30px"
						width="3fr 3fr 2fr 2fr 2fr 3fr"
					/>
				</Card>
			</div>
			<div className="grid-item categories">
				<Card
					title="Categorieën"
					titlefloater={hasWrite &&
          <Link href={{}}><div className={"act-as-button"}><FontAwesomeIcon icon={faEdit}/></div>
          </Link>}
					bodyPadding>
					<ShowEntries
						data={users}
						loading={usersAreLoading}
						error={usersGiveError}
						hasRead={hasRead}
						hasWrite={hasWrite}
						loggedIn={loggedIn}
						columns="firstName lastName roll category chain lastLogin"
						height="30px"
						width="3fr 3fr 2fr 2fr 2fr 3fr"
					/>
				</Card>
			</div>
			<div className="grid-item chains">
				<Card
					title="Chains"
					titlefloater={hasWrite &&
          <Link href={{}}><div className={"act-as-button"}><FontAwesomeIcon icon={faEdit}/></div>
          </Link>}
					bodyPadding>
					<ShowEntries
						data={users}
						loading={usersAreLoading}
						error={usersGiveError}
						hasRead={hasRead}
						hasWrite={hasWrite}
						loggedIn={loggedIn}
						columns="firstName lastName roll category chain lastLogin"
						height="30px"
						width="3fr 3fr 2fr 2fr 2fr 3fr"
					/>
				</Card>
			</div>
			<div className="grid-item views">
				<Card
					title="Views"
					titlefloater={hasWrite &&
          <Link href={`/admin/${Router.query.userId}/view-manager`}><div className={"act-as-button"}><FontAwesomeIcon icon={faEdit}/></div>
          </Link>}
					bodyPadding>
					<ShowEntries
						data={views}
						loading={viewsAreLoading}
						error={viewsGiveError}
						hasRead={hasRead}
						hasWrite={hasWrite}
						loggedIn={loggedIn}
						columns="view_name"
						height="30px"
						width="auto"
					/>
				</Card>
			</div>
			<div className="grid-item to-stat-button">

			</div>
			<style jsx>{`
        .grid-container{
          width: 100%;
          height: 100%;
          padding: 48.67px 10px 10px 10px;
          top: 0;
          position: fixed;
          display: grid;
          grid-gap: 10px 10px;
          grid-template:
              "users rolls chains"      4fr
              "users rolls views"       4fr
              "users categories views"  3fr
              "users categories button" 1fr
              / 5fr 4fr 3fr
        }
        .grid-item {
          box-shadow: -1px 2px 10px rgba(0, 0, 0, 0.2);
          background-color: ${gray_very_light.color};
          overflow-y: auto;
        }
        .act-as-button{
          cursor: pointer;
          transform: scale(0.8);
          transition: transform 100ms linear;
        }
        .act-as-button:hover{
          transform: scale(1);
        }
        .users{
          grid-area: users;
        }
        .categories{
          grid-area: categories;
        }
        .rolls{
          grid-area: rolls;
        }
        .chains{
          grid-area: chains;
        }
        .views{
          grid-area: views;
        }
        .to-stat-button {
          grid-area: button;
        }

      `}</style>
		</div>
	);
};

export default AdminRedirectGrid;
