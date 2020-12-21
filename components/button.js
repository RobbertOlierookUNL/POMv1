import React from "react";

import { c } from "../config/colors";


const Button = ({appearance, width = "auto", children, ...transport}) => {
	return (
		<button {...transport}>{children}
			<style jsx>{`
        button {
          padding: 9px;
          border: none;
          background-color: ${c.primary.color};
          color: ${c.primary.text};
          transition: background-color 200ms ease-in;
          cursor: pointer;
					text-align: center;
					width: ${width};
        }
        button:hover {
          background-color: ${c.primary_dark.color};
        }
    `}</style></button>
	);
};



export default Button;
