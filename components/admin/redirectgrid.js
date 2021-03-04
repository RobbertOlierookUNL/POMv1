import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Link from "next/link";
import React, {useState} from "react";

import {
	useCategories,
	useChains,
	useRolls,
	useUsers,
	useViews
} from "../../lib/swr-hooks";
import { useColors } from "../../lib/custom-hooks";
import Card from "../card";
import ShowEntries from "./showentries";









const AdminRedirectGrid = ({loggedIn, hasRead, hasWrite}) => {
	const [gray_very_light] = useColors("gray_lighter");
	const Router = useRouter();
	const {userId} = Router.query;
	const {users, isLoading: usersAreLoading, isError: usersGiveError} = useUsers();
	const {views, isLoading: viewsAreLoading, isError: viewsGiveError} = useViews();
	const {rolls, isLoading: rollsAreLoading, isError: rollsGiveError} = useRolls();
	const {chains, isLoading: chainsAreLoading, isError: chainsGiveError} = useChains();
	const {categories, isLoading: categoriesAreLoading, isError: categoriesGiveError} = useCategories();


	const [colWidths, setColWidths] = useState([5, 5, 2]);

	const expandFirstCol = () => {
		// setColWidths([7.5, 4, 3]);
		setColWidths([5, 5, 2]);

	};

	const expandSecondCol = () => {
		// setColWidths([5, 7, 3]);
		setColWidths([5, 5, 2]);

	};

	const expandThirdCol = () => {
		setColWidths([5, 5, 2]);
	};

	const resetCols = () => {
		setColWidths([5, 5, 2]);
	};

	return (
		<div className="grid-container">
			<div className="grid-item users" onMouseEnter={expandFirstCol} onMouseLeave={resetCols}>
				<Card
					title="Gebruikersaccounts"
					bodyPadding
					// titlefloater={hasWrite &&
					// <Link href={`/admin/${userId}/edit/users`}><div className={"act-as-button"}><FontAwesomeIcon icon={faEdit}/></div>
					// </Link>
					// }
				>
					<ShowEntries
						data={users}
						loading={usersAreLoading}
						error={usersGiveError}
						hasRead={hasRead}
						hasWrite={hasWrite}
						loggedIn={loggedIn}
						columns="firstName lastName roll category totalLogins lastLogin"
						height="30px"
						width="4fr 4fr 4fr 2fr 3fr 3fr"
					/>
				</Card>
			</div>
			<div className="grid-item rolls" onMouseOver={expandSecondCol} onMouseLeave={resetCols}>
				<Card
					title="Rollen"
					// titlefloater={hasWrite &&
					// <Link href={`/admin/${userId}/edit/rolls`}><div className={"act-as-button"}><FontAwesomeIcon icon={faEdit}/></div>
					// </Link>}
					bodyPadding>
					<ShowEntries
						data={rolls}
						loading={rollsAreLoading}
						error={rollsGiveError}
						hasRead={hasRead}
						hasWrite={hasWrite}
						loggedIn={loggedIn}
						columns="rollName defaultView hasChain adminRights"
						height="30px"
						width="3fr 3fr 2fr 2fr"
					/>
				</Card>
			</div>
			<div className="grid-item categories" onMouseOver={expandSecondCol} onMouseLeave={resetCols}>
				<Card
					title="Categorieën"
					// titlefloater={hasWrite &&
					// <Link href={`/admin/${userId}/edit/categories`}><div className={"act-as-button"}><FontAwesomeIcon icon={faEdit}/></div>
					// </Link>}
					bodyPadding>
					<ShowEntries
						data={categories}
						loading={categoriesAreLoading}
						error={categoriesGiveError}
						hasRead={hasRead}
						hasWrite={hasWrite}
						loggedIn={loggedIn}
						columns="categoryName"
						height="30px"
						width="auto"
					/>
				</Card>
			</div>
			<div className="grid-item chains" onMouseOver={expandThirdCol} onMouseLeave={resetCols}>
				<Card
					title="Chains"
					// titlefloater={hasWrite &&
					// <Link href={`/admin/${userId}/edit/chains`}><div className={"act-as-button"}><FontAwesomeIcon icon={faEdit}/></div>
					// </Link>}
					bodyPadding>
					<ShowEntries
						data={chains}
						loading={chainsAreLoading}
						error={chainsGiveError}
						hasRead={hasRead}
						hasWrite={hasWrite}
						loggedIn={loggedIn}
						columns="chainName stores"
						height="30px"
						width="1fr 3fr"
					/>
				</Card>
			</div>
			<div className="grid-item views" onMouseOver={expandThirdCol} onMouseLeave={resetCols}>
				<Card
					title="Views"
					titlefloater={hasWrite &&
          <Link href={`/admin/${userId}/view-manager`}><div className={"act-as-button"}><FontAwesomeIcon icon={faEdit}/></div>
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
          padding: 53.67px 15px 15px;
          top: 0;
          position: fixed;
          display: grid;
          grid-gap: 15px 15px;
          grid-template:
              "users rolls categories"  2fr
              "users rolls categories"  2fr
              "users rolls views"       4fr
              "users chains views"      2.5fr
              "users chains button"     50px
              / ${colWidths[0]}fr ${colWidths[1]}fr ${colWidths[2]}fr
        }
        .grid-item {
          box-shadow: -1px 2px 10px rgba(0, 0, 0, 0.2);
          background-color: ${gray_very_light.color};
          overflow-y: auto;
          transition: all 100ms linear;
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
