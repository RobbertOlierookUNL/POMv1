import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faSpinner, faFilter, faDownload } from "@fortawesome/free-solid-svg-icons";
import React, {useState, useEffect} from "react";

import { useTheme } from "../../../../lib/custom-hooks";



const ToolbarIcon = ({type, iconClick, button}) => {
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
		case "export":
			setIcon(faDownload);
			break;
		default:
			setIcon(faSpinner);
		}
	}, [type]);

	return (
		<div className={`icon-button ${button ? "button" : ""}`} onClick={iconClick}>
			{typeof button === "string" && <span className="text">{button}</span>}
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
				.button {
					background-color: ${primary_light.color};
					padding: 0px 7px;
					border-radius: 7px;
				}
				.text {
					margin-right: 6px;
				}
      `}</style>
		</div>
	);
};



export default ToolbarIcon;
