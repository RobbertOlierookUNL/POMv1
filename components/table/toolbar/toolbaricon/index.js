import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faSpinner, faFilter } from "@fortawesome/free-solid-svg-icons";
import React, {useState, useEffect} from "react";

import { useTheme } from "../../../../lib/custom-hooks";



const ToolbarIcon = ({type, iconClick}) => {
	const [icon, setIcon] = useState(faSpinner);
	const {primary_light, primary_dark} = useTheme();
	useEffect(() => {
		switch (type) {
		case "multi-select":
			setIcon(faCheckSquare);
			break;
		case "filter":
			setIcon(faFilter);
			break;
		default:

		}
	}, []);

	return (
		<div className="icon-button" onClick={iconClick}>
			<FontAwesomeIcon icon={icon} />
			<style jsx>{`
				.icon-button {
	        cursor: pointer;
					font-size: 0.8em;
					transition: transform 100ms, filter 100ms, color 100ms;
					filter: drop-shadow(0 0 ${primary_light.color});
				}
				.icon-button:hover {
					color: ${primary_dark.text};
					transform: scale(1.1);
					filter: drop-shadow(1px 1px 5px ${primary_light.color});

				}
      `}</style>
		</div>
	);
};



export default ToolbarIcon;
