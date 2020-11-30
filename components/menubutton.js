import React, {useContext, useEffect, useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import c from "./colors";
import {Context} from "./globalstate/store";

const MenuButton = () => {
	const [state, dispatch] = useContext(Context);
	const ref = useRef(null);
	const handleClick = () => {
		dispatch({type: "EXPAND_OPTIONS", payload: !state.options
		});
	};
	useEffect(() => {
		dispatch({type: "SET_MENUBUTTON", payload: ref});
	}, []);
	return(
		<>
			<div className="container" onClick={handleClick} ref={ref}>
				<FontAwesomeIcon icon={faBars} />
			</div>
			<style jsx>{`
    .container {
      position: relative;
      display: inline-block;
      height: 100%;
      font-size: 1.2em;
      transition: all 0.2s ease-in-out;
    }

    .container:hover {
      filter: drop-shadow(0px 0px 5px ${c.secondary.color});
      cursor: pointer;
      transform: scale(1.2, 1.2);

    }
    `}
			</style>
		</>
	);};

export default MenuButton;
