import React from "react";
import c from "./colors";
import Gravatar from "./Gravatar";
import MenuButton from "./MenuButton";



// const fName="John";
// const lName="Doe";

const fName=null;
const lName=null;

const Header = () => {
	return (
		<>
			<header>
				<div className={"left_side"}>
					<MenuButton/>
				</div>
				<div className={"mid"}>
				POM
				</div>
				<div className={"right_side"}>
					<div className="welcome_container">{fName && lName && "Hi " + fName + " " + lName }</div>
					<div className={"gravatar_container"}>
						<Gravatar first_name={fName} last_name={lName} width={"25px"}/>
					</div>
				</div>
			</header>
			<style jsx>
				{`
        header {
					z-index: 9;
					position: relative;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
          background: ${c.primary.color};
          color: ${c.primary.text};
					padding: 0 12px 0 20px;
					box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
        }
				.mid {
					font-size: 1.6em;
					left: 50%;
					position: absolute;
					top: 50%;
					transform: translate(-50%, -50%);
					cursor: default;
					pointer-events: none;
				}
				.right_side{
					display: flex;
					align-items: center;
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
