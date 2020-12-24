import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useEffect, useRef} from "react";

import useGlobal from "../store";


const MenuButton = () => {
	// const [{options}, dispatch] = useContext(Context);
	const [options, expandOptions] = useGlobal(
		state => state.options,
		actions => actions.expandOptions
	);
	const [, setMenuButton] = useGlobal(
		() => null,
		actions => actions.setMenuButton
	);
	const ref = useRef(null);
	const handleClick = () => {
		expandOptions(!options);
	};
	useEffect(() => {
		setMenuButton(ref);
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
      cursor: pointer;
      transform: scale(1.2, 1.2);

    }
    `}
			</style>
		</>
	);};

export default MenuButton;
