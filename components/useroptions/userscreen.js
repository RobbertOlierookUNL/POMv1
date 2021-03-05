import React from "react";
import useGlobal from "../store";

const UserScreen = ({user}) => {
	const [userMenu, expandUserMenu] = useGlobal(
		state => state.userMenu,
		actions => actions.expandUserMenu
	);
	return (
		<div>
			{user?.roll ?
				 `${user.roll.hasCategory ? user.category.categoryName : ""} ${user.roll.rollName} ${user.roll.hasChain ? user.chain.chainName : ""}` : ""}
		</div>
	);
};


export default UserScreen;
