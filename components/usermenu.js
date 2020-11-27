import React, {useContext, useRef, useEffect} from "react";
import {Context} from "./globalstate/store";


const UserMenu = () => {
	const [state, dispatch] = useContext(Context);
	const ref = useRef(null);
	useEffect(() => {

		function handleClickOutsideUserMenu(event) {
			console.log("hi");
			if (ref.current && !ref.current.contains(event.target) &&
       state.userbutton.current && !state.userbutton.current.contains(event.target)) {
				dispatch({type: "EXPAND_USERMENU", payload: false});
			}
		}

		document.addEventListener("mouseup", handleClickOutsideUserMenu);
		return () => {
			document.removeEventListener("mouseup", handleClickOutsideUserMenu);
		};
	}, [ref, state.options]);

	return (
		<>
			<div className="usermenu_container" ref={ref}>
      yolo
			</div>
			<style jsx>{`
        .usermenu_container {
          z-index: 10;
          position: absolute;
          right: 0;
          width: 300px;
          transform: translateX(${state.usermenu ? "0" : "320px"});
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