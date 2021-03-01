import React from "react";

import { useTheme } from "../../lib/custom-hooks";
import ModeSelector from "./modeselector";





const Options = ({user, meta, ...modeProps}) => {
	const {secondary} = useTheme();
	return (
		<div>
			<h2>View bijstellen</h2>
			<ModeSelector {...modeProps}/>
			<style jsx>{`
				h2{
					margin: 0;
					padding: 7px 15px;
					color: ${secondary.text};
					background-color: ${secondary.color};
				}
			`}</style>
		</div>
	);
};

export default Options;
