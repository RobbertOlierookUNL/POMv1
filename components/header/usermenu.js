import React from "react";

import { useHandleClickOutstide } from "../../lib/custom-hooks";
import useGlobal from "../store";






const UserMenu = ({children}) => {
	const [userMenu, expandUserMenu] = useGlobal(
		state => state.userMenu,
		actions => actions.expandUserMenu
	);
	useHandleClickOutstide(userMenu, () => expandUserMenu(false));

	return (
		<>
			<div className="usermenu_container">
				{children}
			</div>
			<style jsx>{`
        .usermenu_container {
          z-index: 10;
          position: absolute;
					/* top: 0; */
          right: 0;
          width: 300px;
          transform: translateX(${userMenu ? "0" : "320px"});
					user-select: ${userMenu ? "auto" : "none"};
          transition: transform 0.2s ease-in-out;
          background: white;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
          padding: 0px 15px 15px 15px;

        }
        `}
			</style>
		</>
	);
};

export default UserMenu;
