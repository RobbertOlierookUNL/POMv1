import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import {
	filterDisplayBarHeight,
	horPadding
} from "../../../config/globalvariables";
import { useTheme } from "../../../lib/custom-hooks";
import FilterDisplay from "./filterdisplay";
import useGlobal from "../../store";





const FilterBar = () => {
	const {primary_very_light, gray_dark, primary} = useTheme();
	const [arrayOfFilters, clearFilters] = useGlobal(state => state.arrayOfFilters, actions => actions.clearFilters);

	return (
		<div className="filterbar">
			<div className="display-container">
				<div className="centered-container">
					{arrayOfFilters.map((filter, i) => (
						<FilterDisplay key={i} filterObject={filter}/>
					))}
				</div>
				{arrayOfFilters.length &&
					<div className="centered-container remove-all" onClick={clearFilters}>
						<FontAwesomeIcon icon={faTimes}/>
					</div>}
			</div>
			<style jsx>{`
        .filterbar {
          font-size: 0.8em;
          width:100%;
          height: ${arrayOfFilters.length ? filterDisplayBarHeight : 0};
          transition: height 100ms ease-in;
          position: sticky;
          top:0;
          background-color: ${primary_very_light.color};
          color: ${primary_very_light.text};
        }
        .display-container {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .centered-container {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          /* padding: 0 px; */
        }
				.remove-all {
					right: ${horPadding}px;
					color: ${gray_dark.color};
					cursor: pointer;
					transition: transform 100ms, color 100ms;
				}
				.remove-all:hover {
					transform: translateY(-50%) scale(1.1);
					color: ${primary.color};
				}
      `}</style>
		</div>
	);
};

export default FilterBar;
