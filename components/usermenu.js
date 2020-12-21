import React, {useContext, useRef, useEffect} from "react";

import { Context } from "./globalstate/store";



const UserMenu = ({children}) => {
	const [{userbutton, usermenu}, dispatch] = useContext(Context);
	const ref = useRef(null);
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target) &&
       userbutton.current && !userbutton.current.contains(event.target)) {
				dispatch({type: "EXPAND_USERMENU", payload: false});
			}
		}
		if (usermenu) {
			document.addEventListener("mouseup", handleClickOutside);
		} else {
			document.removeEventListener("mouseup", handleClickOutside);
		}
	}, [ref, usermenu]);

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
          transform: translateX(${usermenu ? "0" : "320px"});
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
