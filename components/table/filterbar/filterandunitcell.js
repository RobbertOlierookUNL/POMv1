import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import React, { useState} from "react";

import { useTheme } from "../../../lib/custom-hooks";
import FilterBox from "./filterbox";



const FilterAndUnitCell = ({filtertype, valuetype, unit, boxTitle, filterName, reference}) => {
	const {primary, tertiary, gray, gray_dark, gray_lighter} = useTheme();
	const [boxActive, setBoxActive] = useState(false);
	return (
		<th>
			{unit && <div className="unit">{unit}</div>}
			{filtertype &&
        <>
        	<div className="filter" onClick={() => setBoxActive(!boxActive)}>
    		    <FontAwesomeIcon className="blas" icon={faFilter}/>
        	</div>
        	<FilterBox
        		active={boxActive}
        		filtertype={filtertype}
        		valuetype={valuetype}
        		title={boxTitle}
        		filterName={filterName}
        		reference={reference}
        		close={() => setBoxActive(false)}
        	/>
        </>
			}
			<style jsx>{`
        th {
          border: 1px solid ${gray.color};
          border-width: 0 1px 0px 0;
          border-bottom-color: ${primary.color};
          display: flex;
          position: relative;
          padding: 1px 1px 2px;
        }
        th:last-child{
          border-width: 0 0 0px 0;
        }
        .unit {
          ${filtertype && `border-right: 1px solid ${gray.color}`};
          flex: 0 1 14.67px;
          display: inline-block;
          text-align: center;
          padding: 0 2px 0 1px;
          cursor: default;
        }
        .filter {
          display: inline-block;
          flex: 1 1 auto;
          text-align: center;
          cursor: pointer;
          color: ${gray_dark.color};
          transform: scaleY(1);

          /* background-color: ${gray_lighter.color};
          box-shadow: 0px 0px 0px ${gray_lighter.color}; */
          transition: color 200ms ease-in, transform 100ms ease-in;
        }

        .filter:hover {
          transform: scaleY(1.1);
          /* box-shadow: 0px 0px 5px ${tertiary.color};
          background-color: ${tertiary.color}; */
          color: ${primary.color};
        }
      `}</style>
		</th>
	);
};

export default FilterAndUnitCell;
