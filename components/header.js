import React, {useContext, useEffect, useRef} from "react";

import c from "./colors";
import Gravatar from "./Gravatar";

import {Context} from "./globalstate/store";

// const fName="Rohn";
// const lName="Doe";

const fName=null;
const lName=null;

const Header = ({children}) => {
	const [state, dispatch] = useContext(Context);
	const ref = useRef(null);
	useEffect(() => {dispatch({type: "SET_USERBUTTON", payload: ref});},[]);

	const handleClick = () => {
		dispatch({type: "EXPAND_USERMENU", payload: !state.usermenu});
	};

	return (
		<>
			<header>
				<div className={"left_side"}>
					{children[0]}
				</div>
				<div className={"mid"}>
					{children[1]}
				</div>
				<div className={"right_side"} onClick={handleClick} ref={ref}>
					<div className="welcome_container">{fName && lName ? fName + " " + lName : "Inloggen" }</div>
					<div className={"gravatar_container"}>
						<Gravatar first_name={fName} last_name={lName} width={"25px"}/>
					</div>
				</div>
			</header>
			<style jsx>{`
        header {
					z-index: 9;
					position: relative;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
          background: ${c.primary.color};
          color: ${c.primary.text};
					padding: 0 10px 0 15px;
					box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
        }
				.mid {
					font-size: 1.6em;
					font-weight: bolder;
					/* text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2); */
					left: 50%;
					position: absolute;
					top: 50%;
					transform: translate(-50%, -50%);
					cursor: default;
					pointer-events: none;
					user-select: none;


				}
				.right_side{
					display: flex;
					align-items: center;
					cursor: pointer;
					user-select: none;
				}
				.welcome_container {
					position: relative;
					top: 50%;
					display: inline-block;
					margin-right: 10px;
				}
				.gravatar_container {
					display: inline-block;
					padding: 6px;
				}
           `}
			</style>
		</>
	);
};

export default Header;
