import React from "react";

import { allOptionsWithData } from "../../config/viewOptions";
import {
	filterAndUnitBarHeight,
	filterDisplayBarHeight,
	tableHeadersBarHeight,
	toolBarHeight
} from "../../config/globalvariables";
import { useTheme } from "../../lib/custom-hooks";
import CheckAllBox from "../checkallbox";
import FilterAndUnitCell from "./filterbar/filterandunitcell";
import TableHeadCell from "./tableheadcell";
import useGlobal from "../store";











const TableHeaders = ({meta, keysForTableCols, requestSort, sortConfig, filterParameters, numberOfEntries}) => {
	const [selectMode] = useGlobal(
		state => state.selectMode,
		() => null
	);
	const [arrayOfFilters] = useGlobal(state => state.arrayOfFilters, () => null);

	const {primary, gray_light, gray_lighter} = useTheme();

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
				value = `minmax(${widthWeight*8}px, ${widthWeight}`;
				unit = "fr)";

			}
			colString += `[${col}] ${value}${unit} `;
		}
	});
	colString += "[end]";
	return (
		<div>
			<div className="headers gridded-row">
				{selectMode && <th/>}
				{
					keysForTableCols.map((col, i) => (
						<TableHeadCell
							requestSort={requestSort}
							sortConfig={sortConfig}
							colMetaData={meta[col]}
							colName={col}
							key={i}
						/>
					))
				}
			</div>
			<div className="filters gridded-row">
				{selectMode &&
				<div className="select-all th">
					<CheckAllBox/>
				</div>}
				{
					keysForTableCols.map((col, i) => (
						<FilterAndUnitCell
							unit={meta[col].unit || allOptionsWithData.unit.default}
							filtertype={meta[col].filtertype === "false" ? false : meta[col].filtertype || allOptionsWithData.filtertype.default}
							valuetype={meta[col].valuetype || allOptionsWithData.valuetype.default}
							boxTitle={meta[col].hovername || meta[col].title || col}
							filterName={meta[col].title || col}
							seperation={meta[col].filterseperation || allOptionsWithData.filterseperation.default}
							parameters={filterParameters?.[col] || false}
							reference={col}
							key={i}
						/>
					))
				}
			</div>
			<style jsx>{`
        .headers {
			    position: sticky;
					top: calc(${toolBarHeight} + ${arrayOfFilters.length ? filterDisplayBarHeight : "0px"});
					transition: top 100ms ease-in;
					height: ${tableHeadersBarHeight};
					background-color: ${primary.color};
        }
				.filters {
					position: sticky;
					height: ${filterAndUnitBarHeight};
					top: calc(${toolBarHeight} + ${tableHeadersBarHeight} + ${arrayOfFilters.length ? filterDisplayBarHeight : "0px"});
					transition: top 100ms ease-in;
					background-color: ${gray_lighter.color};
					color: ${gray_lighter.text};
					box-shadow: 0px 3px 5px rgba(0, 31, 130, 0.25);
				}
				.th {
					border: 1px solid ${gray_light.color};
					border-width: 0 1px 0 0;
				}
				.select-all {
					padding: 0px 0px 2px;
				}

      `}</style>
			<style jsx global>{`
				.gridded-row {
					display: grid;
		    	grid-template-columns: ${colString};
					grid-template-rows: min-content;
				}
				.blas {
					width: 11.2px;
				}

			`}</style>
		</div>
	);
};

export default TableHeaders;
