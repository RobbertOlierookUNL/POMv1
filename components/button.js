import React, {useContext} from "react";

import { SchemaContext } from "../pages/_app";
import { colorschematic } from "../config/colors";



const Button = ({appearance, width = "auto", children, ...transport}) => {
	const schema = useContext(SchemaContext);

	return (
		<button {...transport}>{children}
			<style jsx>{`
        button {
          padding: 9px;
          border: none;
          background-color: ${colorschematic(schema).primary.color};
          color: ${colorschematic(schema).primary.text};
          transition: background-color 200ms ease-in;
          cursor: pointer;
					text-align: center;
					width: ${width};
        }
        button:hover {
          background-color: ${colorschematic(schema).primary_dark.color};
        }
    `}</style></button>
	);
};



export default Button;
