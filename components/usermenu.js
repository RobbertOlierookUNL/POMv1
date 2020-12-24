import React, {useRef, useEffect} from "react";

import useGlobal from "./store";



const UserMenu = ({children}) => {
	const [userMenu, expandUserMenu] = useGlobal(
		state => state.userMenu,
		actions => actions.expandUserMenu
	);
	const [userButton] = useGlobal(
		state => state.userButton,
		() => null
	);
	const ref = useRef(null);
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target) &&
       userButton.current && !userButton.current.contains(event.target)) {
				expandUserMenu(false);
			}
		}
		if (userMenu) {
			document.addEventListener("mouseup", handleClickOutside);
		} else {
			document.removeEventListener("mouseup", handleClickOutside);
		}
	}, [ref, userMenu]);

	return (
		<>
			<div className="usermenu_container" ref={ref}>
				{children}
			</div>
			<style jsx>{`
        .usermenu_container {
          z-index: 10;
          position: absolute;
          right: 0;
          width: 300px;
          transform: translateX(${userMenu ? "0" : "320px"});
          transition: transform 0.2s ease-in-out;
          background: white;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
          padding: 20px;

        }
        `}
			</style>
		</>
	);
};

export default UserMenu;
