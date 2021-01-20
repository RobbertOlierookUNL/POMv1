import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { useTheme } from "../../../lib/custom-hooks";
import useGlobal from "../../store";



const FilterDisplay = ({filterObject}) => {
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
          margin: 0 1.5px;
          padding: 2.5px 2.5px;
          box-shadow: -1px 2px 10px rgba(0, 0, 0, 0.4);
        }
				.filter-text {
					display: inline-block;
					font-size: smaller;
					align-self: center;
				}
        .remove-button {
          margin-left: 4px;
          display: inline-block;
          cursor: pointer;
          color: ${tertiary.text};
          transform: translateY(0.5px);
					/* filter: drop-shadow(0px 0px 5px ${tertiary.text}); */
          transition: color 100ms linear, transform 100ms linear;
        }
        .remove-button:hover {
          color: ${tertiary.text};
          transform: translateY(0.5px) scale(1.1);
          filter: drop-shadow(0px 0px 5px ${gray_light.color});
        }
      `}
			</style>
		</div>
	);
};


export default FilterDisplay;
