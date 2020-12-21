import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useEffect, useRef} from "react";

import { Context } from "../globalstate/store";
import { SchemaContext } from "../../pages/_app";
import { colorschematic } from "../../config/colors";







const MenuButton = () => {
	const [{options}, dispatch] = useContext(Context);
	const schema = useContext(SchemaContext);
	const ref = useRef(null);
	const handleClick = () => {
		dispatch({type: "EXPAND_OPTIONS", payload: !options
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
      /* filter: drop-shadow(0px 0px 5px ${colorschematic(schema).secondary.color}); */
      cursor: pointer;
      transform: scale(1.2, 1.2);

    }
    `}
			</style>
		</>
	);};

export default MenuButton;
