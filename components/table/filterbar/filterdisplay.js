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
			<b>{`${shorthand.filterName}:${shorthand.value}`}</b>
			<div className="remove-button" onClick={() => removeFromFilters(filterObject)}
			>
				<FontAwesomeIcon icon={faTimes}/>
			</div>
			<style jsx>{`
        .filter-display {
          border-radius: 0.75em;
          border: 1.5px solid ${tertiary.color};
          line-height: 1;
          background-color: ${tertiary.color};
          color: ${tertiary.text};
          display: inline-block;
          margin: 0 1.5px;
          padding: 2.5px 2.5px;
          box-shadow: -1px 2px 10px rgba(0, 0, 0, 0.4);
        }
        .remove-button {
          margin-left: 2.5px;
          display: inline-block;
          cursor: pointer;
          color: ${gray_light.color};
          transition: color 100ms linear, transform 100ms linear;
        }
        .remove-button:hover {
          color: ${tertiary.text};
          transform: scale(1.1);
          filter: drop-shadow(0px 0px 5px ${gray_light.color});
        }
      `}
			</style>
		</div>
	);
};


export default FilterDisplay;
