import React from "react";

import { allOptionsWithData } from "../../config/viewOptions";
import { useTheme } from "../../lib/custom-hooks";
import FilterAndUnitCell from "./filterbar/filterandunitcell";
import TableHeadCell from "./tableheadcell";
import useGlobal from "../store";






const TableHeaders = ({meta, keysForTableCols, requestSort, sortConfig, filterParameters}) => {
	const [selectMode] = useGlobal(
		state => state.selectMode,
		() => null
	);
	const [arrayOfFilters] = useGlobal(state => state.arrayOfFilters, () => null);

	const {primary, gray_lighter} = useTheme();

	let colString = selectMode ? "[selectboxes] 20px " : "";
	keysForTableCols.map(col => {
		if (meta[col].widthkind === "[px]min,[fr]max") {
			const widthWeight = meta[col].widthweight && meta[col].widthweight.includes(".") ?
				meta[col].widthweight :
				`${allOptionsWithData.widthweight.default}.${allOptionsWithData.widthweight.default}`;
			const [min, max] = widthWeight.split(".");
			colString += `[${col}] minmax(${min}px, ${max}fr) `;
		} else {
			let value;
			let unit;
			const widthWeight = meta[col].widthweight || allOptionsWithData.widthweight.default;
			switch (meta[col].widthkind) {
			case "absolute":
				value = widthWeight;
				unit = "px";
				break;
			case "characters":
				value = widthWeight * 6.3 + 5;
				unit = "px";
				break;
			default: //relative
				value = widthWeight;
				unit = "fr";

			}
			colString += `[${col}] ${value}${unit} `;
		}
	});
	colString += "[end]";
	return (
		<thead>
			<tr className="headers gridded-row">
				{
					keysForTableCols.map((col, i) => (
						<TableHeadCell
							requestSort={requestSort}
							sortConfig={sortConfig}
							colMetaData={meta[col]}
							colName={col}
							first={i===0}
							key={i}
						/>
					))
				}
			</tr>
			<tr className="filters gridded-row">
				{
					keysForTableCols.map((col, i) => (
						<FilterAndUnitCell
							unit={meta[col].unit || allOptionsWithData.unit.default}
							filtertype={meta[col].filtertype === "false" ? false : meta[col].filtertype || allOptionsWithData.filtertype.default}
							valuetype={meta[col].valuetype || allOptionsWithData.valuetype.default}
							boxTitle={meta[col].hovername || meta[col].title || col}
							filterName={meta[col].title || col}
							parameters={filterParameters[col] || false}
							reference={col}
							key={i}
						/>
					))
				}
			</tr>
			<style jsx>{`
        .headers {
			    position: sticky;
					top: ${arrayOfFilters.length ? "45px" : "18px"};
					transition: top 100ms ease-in;
					background-color: ${primary.color};
        }
				.filters {
					position: sticky;
					top: ${arrayOfFilters.length ? "63.67px" : "36.57px"};
					transition: top 100ms ease-in;
					background-color: ${gray_lighter.color};
					color: ${gray_lighter.text};
					box-shadow: 0px 3px 5px rgba(0, 31, 130, 0.25);
				}

      `}</style>
			<style jsx global>{`
				.gridded-row {
					display: grid;
		    	grid-template-columns: ${colString};
				}
			`}</style>
		</thead>
	);
};

export default TableHeaders;
