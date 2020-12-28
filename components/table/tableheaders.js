import React from "react";

import { allOptionsWithData } from "../../config/viewOptions";
import TableHeadCell from "./tableheadcell";
import useGlobal from "../store";




const TableHeaders = ({meta, keysForTableCols, requestSort, sortConfig}) => {
	const [selectMode] = useGlobal(
		state => state.selectMode,
		() => null
	);
	const [primary] = useGlobal(
		state => state.primary,
		() => null
	);

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
			<tr>
				{
					keysForTableCols.map((col, i) => (
						<TableHeadCell requestSort={requestSort} sortConfig={sortConfig} colMetaData={meta[col]} colName={col} first={i===0} key={i}/>
					))
				}
			</tr>
			<style jsx>{`
        tr {
			    position: sticky;
					top: 25px;
					background-color: ${primary.color};
        }

      `}</style>
			<style jsx global>{`
				tr {
					display: grid;
		    	grid-template-columns: ${colString};
				}
			`}</style>
		</thead>
	);
};

export default TableHeaders;
