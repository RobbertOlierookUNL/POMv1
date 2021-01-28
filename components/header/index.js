import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef } from "react";

import { headerHeight } from "../../config/globalvariables";
import { useTheme } from "../../lib/custom-hooks";
import Gravatar from "./gravatar";
import useGlobal from "../store";





const Header = ({children, fName, lName, admin=false}) => {
	// const [{usermenu}, dispatch] = useContext(Context);
	const [userMenu, expandUserMenu] = useGlobal(
		state => state.userMenu,
		actions => actions.expandUserMenu
	);
	const [, setUserButton] = useGlobal(
		() => null,
		actions => actions.setUserButton
	);
	const [, setHeaderRef] = useGlobal(
		() => null,
		actions => actions.setHeaderRef
	);
	const {primary, secondary, primary_dark, tertiary} = useTheme();

	const userButtonRef = useRef(null);
	const headerRef = useRef(null);
	useEffect(() => {setUserButton(userButtonRef);},[]);
	useEffect(() => {setHeaderRef(headerRef);},[]);


	const handleClick = () => {
		expandUserMenu(!userMenu);
	};

	return (
		<>
			<header ref={headerRef}>
				<div className={"left_side"}>
					{children[0]}
				</div>
				<div className={"mid header-title"}>
					{children[1]}
				</div>
				<div className={"right_side"} onClick={handleClick} ref={userButtonRef}>
					<div className="welcome_container">{fName && lName ? fName + " " + lName : userMenu ? <FontAwesomeIcon icon={faTimes}/> : "Inloggen" }</div>
					<div className={"gravatar_container"}>
						<Gravatar first_name={fName} last_name={lName} width={"25px"}/>
					</div>
				</div>
			</header>
			<style jsx>{`
        header {
					font-family: 'Montserrat', sans-serif;
					font-weight: 200;
					z-index: 9;
					position: relative;
					width: 100%;
					top: 0;
					height: ${headerHeight};
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
          background: ${primary.color};
          color: ${primary.text};
					padding: 0 10px 0 15px;
					box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
        }
				.mid {
					font-size: 1.3em;
					font-weight: 400;
					left: 50%;
					position: absolute;
					top: 50%;
					transform: translate(calc(-50% - 1.5px), calc(-50% - 1.5px));
					cursor: default;
					pointer-events: none;
					user-select: none;
					color: ${tertiary.color === "#005eef" ? tertiary.text : tertiary.color};
					text-shadow: 3px 3px 5px rgba(0, 0, 0, 1);


				}
				/* .mid {
					font-size: 1.6em;
					font-weight: 400;
					font-family: 'Potta One', cursive;
					left: 50%;
					position: absolute;
					top: 50%;
					transform: translate(calc(-50% - 1.5px), calc(-50% - 1.5px));
					cursor: default;
					pointer-events: none;
					user-select: none;
					letter-spacing:4px;
					-webkit-text-fill-color: transparent;
					-webkit-text-stroke-width: 1px;
					-webkit-text-stroke-color: ${tertiary.color === "#005eef" ? tertiary.text : tertiary.color};

					animation: shift 10s infinite linear;

				}

				@keyframes shift {
					0% {
						text-shadow:
					            1.5px 1.5px ${primary.color},
					            5px 5px ${primary.color},
											1.5px 1.5px 0px ${secondary.color};
					}

					50% {
						text-shadow:
					            1.5px 1.5px ${primary.color},
					             1.5px 1.5px ${primary_dark.color},
											5px 5px ${primary_dark.color},
											1.5px 1.5px 15px ${secondary.color},
											0.5px -0.5px 10px ${tertiary.color};

					}
					100% {
						text-shadow:
											1.5px 1.5px ${primary.color},
											5px 5px ${primary.color},
											1.5px 1.5px 0px ${secondary.color};
					}
				} */
				/* .mid {
					font-size: 1.6em;
					font-weight: 400;
					font-family: "Archivo Black", "Archivo", sans-serif;
					left: 50%;
					position: absolute;
					top: 50%;
					transform: translate(calc(-50%), calc(-50%));
					cursor: default;
					pointer-events: none;
					user-select: none;
					color: ${tertiary.text};
  				animation: neon 3s infinite;
					--shadow-color: ${tertiary.color};
					--shadow-color-light: ${tertiary.text};
				}

				@keyframes neon {
				  0% {
				    text-shadow: -1px -1px 1px var(--shadow-color-light), -1px 1px 1px var(--shadow-color-light), 1px -1px 1px var(--shadow-color-light), 1px 1px 1px var(--shadow-color-light),
				    0 0 3px var(--shadow-color-light), 0 0 10px var(--shadow-color-light), 0 0 20px var(--shadow-color-light),
				    0 0 30px var(--shadow-color), 0 0 40px var(--shadow-color), 0 0 50px var(--shadow-color), 0 0 70px var(--shadow-color), 0 0 100px var(--shadow-color), 0 0 200px var(--shadow-color);
				  }
				  50% {
				    text-shadow: -1px -1px 1px var(--shadow-color-light), -1px 1px 1px var(--shadow-color-light), 1px -1px 1px var(--shadow-color-light), 1px 1px 1px var(--shadow-color-light),
				    0 0 5px var(--shadow-color-light), 0 0 15px var(--shadow-color-light), 0 0 25px var(--shadow-color-light),
				    0 0 40px var(--shadow-color), 0 0 50px var(--shadow-color), 0 0 60px var(--shadow-color), 0 0 80px var(--shadow-color), 0 0 110px var(--shadow-color), 0 0 210px var(--shadow-color);
				  }
				  100% {
				    text-shadow: -1px -1px 1px var(--shadow-color-light), -1px 1px 1px var(--shadow-color-light), 1px -1px 1px var(--shadow-color-light), 1px 1px 1px var(--shadow-color-light),
				    0 0 3px var(--shadow-color-light), 0 0 10px var(--shadow-color-light), 0 0 20px var(--shadow-color-light),
				    0 0 30px var(--shadow-color), 0 0 40px var(--shadow-color), 0 0 50px var(--shadow-color), 0 0 70px var(--shadow-color), 0 0 100px var(--shadow-color), 0 0 200px var(--shadow-color);
				  }
				} */
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
					margin-right: ${fName && lName ? "10px" : "2px"};
					/* opacity: ${!fName && !lName && userMenu ? 0 : 1}; */
					transition: opacity 100ms ease-in;
				}
				.gravatar_container {
					display: inline-block;
					padding: ${fName && lName ? "6px" : "6px 0px"};
				}
           `}
			</style>
		</>
	);
};

export default Header;
