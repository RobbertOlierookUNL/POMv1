import React from "react";
import c from "../components/colors";

const Header = () => {
	return (
		<>
			<header>hello</header>
			<style jsx>
				{`
        header {
          background: ${c.primary_dark.color};
          color: ${c.primary_dark.text};
          width: 100vw;
          padding: 10px;
        }
           `}
			</style>
		</>
	);
};

export default Header;
