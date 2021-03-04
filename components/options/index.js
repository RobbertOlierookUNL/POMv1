import React from "react";

import { useTheme } from "../../lib/custom-hooks";
import ModeSelector from "./modeselector";





const Options = ({user, meta, ...modeProps}) => {
	const {primary_light} = useTheme();
	return (
		<div>
			<h2>View bijstellen</h2>
			<ModeSelector {...modeProps}/>
			<style jsx>{`
				h2{
					margin: 0;
					padding: 7px 15px;
					color: ${primary_light.text};
					background-color: ${primary_light.color};
				}
			`}</style>
		</div>
	);
};

export default Options;
