import React, {useRef, useEffect, useState} from "react";

import Shadow from "./shadow";
import useGlobal from "./store";




const UserMenu = ({children}) => {
	const [userMenu, expandUserMenu] = useGlobal(
		state => state.userMenu,
		actions => actions.expandUserMenu
	);
	const [options] = useGlobal(
		state => state.options,
		() => null
	);
	const [shadowRef] = useGlobal(
		state => state.shadowRef,
		() => null
	);
	const ref = useRef(null);
	const [handleClickOutside, setHandleClickOutside] = useState(false);
	useEffect(() => {
		if (handleClickOutside) {
			document.removeEventListener("click", handleClickOutside, true);
			setHandleClickOutside(false);
		}

		if(userMenu) {
			// const checkExceptionRefs = (refObjs, target) => {
			// 	for (var myRef in refObjs) {
			// 		if(refObjs[myRef].current){
			// 			if (refObjs[myRef].current.contains(target) || target.contains(refObjs[myRef].current)) {
			// 				return false;
			// 			}
			// 		}
			// 	}
			// 	return true;
			// };
			setHandleClickOutside(() => function (event) {
				if (event.target === shadowRef.current
				// checkExceptionRefs({ref, userButton, ...formRefs}, event.target)
				){
					expandUserMenu(false);
				}
			});
		}

		return () => {
			if(handleClickOutside) {
				document.removeEventListener("click", handleClickOutside, true);
			}
		};
	}, [shadowRef, userMenu]);

	useEffect(() => {
		if (handleClickOutside) {
			document.addEventListener("click", handleClickOutside, true);
		}
	}, [handleClickOutside]);
	return (
		<>
			<div className="usermenu_container" ref={ref}>
				{children}
			</div>
			<Shadow zIndex={8} trigger={options || userMenu} softTrigger={userMenu && !options} clickthrough={false}/>
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
