import React from "react";

import { useTheme } from "../../../lib/custom-hooks";




const ConversionDropDown = ({setter, getter}) => {
	const {primary_light, primary_very_light, primary_dark} = useTheme();

	const handleChange = e => {
		setter(e.target.value);
	};
	return (
		<select value={getter} onChange={handleChange}>
			<option value={"HE"}>HE</option>
			<option value={"CE"}>CE</option>

			<style jsx>{`
        select {
          pointer-events: auto;
          cursor: pointer;
          background: transparent;
          border: none !important;
          /* border: 1px solid ${primary_very_light.color} !important;
          border-radius: 7px; */
          outline: none !important;
          color: ${primary_very_light.color};
          padding: 0;
          margin: 0;
          font: inherit;
          /* font-size: 0.8em; */
          /* -webkit-appearance: none;
          -moz-appearance: none; */
          text-indent: 0px;
          text-overflow: '';
          transition: transform 100ms, filter 100ms, color 100ms;
          filter: drop-shadow(0 0 ${primary_light.color});
        }
        select:hover {
					color: ${primary_dark.text};
					transform: scale(1.1);
					filter: drop-shadow(1px 1px 5px ${primary_light.color});

				}
        option {
          color: black;
        }
      `}</style>
		</select>
	);
};

export default ConversionDropDown;
