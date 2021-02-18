import React from "react";

const UserScreen = ({user}) => {
	return (
		<div>
			{user?.roll ?
				 `${user.roll.hasCategory ? user.category.categoryName : ""} ${user.roll.rollName} ${user.roll.hasChain ? user.chain.chainName : ""}` : ""}
		</div>
	);
};


export default UserScreen;
