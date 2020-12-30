import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


const ToolbarIcon = ({type, iconClick}) => {
	const [icon, setIcon] = useState(faSpinner);
	useEffect(() => {
		switch (type) {
		case "multi-select":
			setIcon(faCheckSquare);
			break;
		default:

		}
	}, []);

	return (
		<div onClick={iconClick}>
			<FontAwesomeIcon icon={icon} />
			<style jsx>{`
        cursor: pointer;
      `}</style>
		</div>
	);
};



export default ToolbarIcon;
