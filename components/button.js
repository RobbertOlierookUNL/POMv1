import React, {useContext} from "react";

import useGlobal from "./store";



const Button = ({appearance, width = "auto", children, ...transport}) => {
	const [primary] = useGlobal(
		state => state.primary,
		() => null
	);
	const [primary_dark] = useGlobal(
		state => state.primary_dark,
		() => null
	);
	return (
		<button {...transport}>{children}
			<style jsx>{`
        button {
          padding: 9px;
          border: none;
          background-color: ${primary.color};
          color: ${primary.text};
          transition: background-color 200ms ease-in;
          cursor: pointer;
					text-align: center;
					width: ${width};
        }
        button:hover {
          background-color: ${primary_dark.color};
        }
    `}</style></button>
	);
};



export default Button;
