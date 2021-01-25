import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import { horPadding } from "../../../config/globalvariables";
import { useTheme } from "../../../lib/custom-hooks";
import useGlobal from "../../store";




const FilterDisplay = ({filterObject, omitRemoveTransform=false}) => {
	const {shorthand} = filterObject;
	const {tertiary, gray_light} = useTheme();
	const [, removeFromFilters] = useGlobal(() => null, actions => actions.removeFromFilters);

	return (
		<div className="filter-display">
			<div className="filter-text">
				{`${shorthand.filterName}: `}
				<b>
					{`${shorthand.value}`}
				</b>
			</div>
			<div className="separator"/>
			<div className="remove-button" onClick={() => removeFromFilters(filterObject)}
			>
				<FontAwesomeIcon icon={faTimes}/>
			</div>
			<style jsx>{`
        .filter-display {
          border-radius: 0.75em;
          border: 1.5px solid ${tertiary.color};
          line-height: 1;
					height: 20px;
          background-color: ${tertiary.color};
          color: ${tertiary.text};
          display: inline-flex;
          margin: 0 ${horPadding - 3 - 1.5}px;
          padding: 2.5px 3px;
          box-shadow: -1px 2px 10px rgba(0, 0, 0, 0.4);
					position: relative;
        }
				.filter-text {
					display: inline-block;
					font-size: smaller;
					align-self: center;
				}
				.separator {
					height: 20px;
					position: relative;
					top: -4px;
					border-left: 1px solid ${gray_light.color};
					margin: 0 3px;
				}
        .remove-button {
          display: inline-block;
          cursor: pointer;
          color: ${tertiary.text};
          transform: translateY(${omitRemoveTransform ? "-1.5px" : "0.5px"});
					/* filter: drop-shadow(0px 0px 5px ${tertiary.text}); */
          transition: color 100ms linear, transform 100ms linear;
        }
        .remove-button:hover {
          color: ${tertiary.text};
          transform: translateY(${omitRemoveTransform ? "-1.5px" : "0.5px"}) scale(1.1);
          filter: drop-shadow(0px 0px 5px ${gray_light.color});
        }
      `}
			</style>
		</div>
	);
};


export default FilterDisplay;
