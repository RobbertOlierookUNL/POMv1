import React from "react";
import c from "./colors";
import Gravatar from "./Gravatar";
import MenuButton from "./MenuButton";



const fName="John";
const lName="Doe";

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
					<div className="welcome_container">Hi {fName + " " + lName}</div>
					<div className={"gravatar_container"}>
						<Gravatar first_name={fName} last_name={lName} width={"38px"}/>
					</div>
				</div>
			</header>
			<style jsx>
				{`
        header {
					position: relative;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
          background: ${c.primary.color};
          color: ${c.primary.text};
					padding: 0 12px 0 20px;
        }
				.mid {
					font-size: 2em;
					left: 50%;
					position: absolute;
					top: 50%;
					transform: translate(-50%, -50%);
				}
				.welcome_container {
					display: inline-block;
					margin-right: 10px;
				}
				.gravatar_container {
					display: inline-block;
					padding: 8px;
				}
           `}
			</style>
		</>
	);
};

export default Header;
