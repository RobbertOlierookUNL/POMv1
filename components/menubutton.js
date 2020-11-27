import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const MenuButton = () => (
	<>
		<div className="container">
			<FontAwesomeIcon icon={faBars} />
		</div>
		<style jsx>
			{`
    .container {
      position: relative;
      display: inline-block;
      height: 100%;
      vertical-align: center;
      font-size: 1.2em;
    }
    `}
		</style>
	</>
);

export default MenuButton;
