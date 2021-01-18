import React from "react";

import { useTheme } from "../../../lib/custom-hooks";
import FilterDisplay from "./filterdisplay";
import useGlobal from "../../store";


const FilterBar = () => {
	const {primary_very_light} = useTheme();
	const [arrayOfFilters] = useGlobal(state => state.arrayOfFilters, () => null);

	return (
		<div className="filterbar">
			<div className="display-container">
				<div className="centered-container">
					{arrayOfFilters.map((filter, i) => (
						<FilterDisplay key={i} filterObject={filter}/>
					))}
				</div>
			</div>
			<style jsx>{`
        .filterbar {
          font-size: 0.8em;
          width:100%;
          height: ${arrayOfFilters.length ? "27px" : 0};
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
          padding: 0 1.5px;
        }
      `}</style>
		</div>
	);
};

export default FilterBar;
