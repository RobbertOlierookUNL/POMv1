import React, {useRef, useEffect, useState, forwardRef} from "react";
import moment from "moment";

import { allOptionsWithData } from "../../config/viewOptions";
import { dataTable_pk } from "../../config/globalvariables";
import { useColors, useToolkit } from "../../lib/custom-hooks";
import Cell from "./cell";
import useGlobal from "../store";







const Expand = ({additionalColKeys, rowData, meta, active, mergedFrom, keysForMergedRows, updateEntry}, ref) => {
	const expandCell = useRef(null);
	const [height, setHeight] = useState("auto");
	const {mergeRefs} = useToolkit();
	const [gray_light, gray_lighter] = useColors("gray_light", "gray_lighter");

	useEffect(() => {
		rowData && setHeight(expandCell.current.scrollHeight + 1.33 + "px");
	}, [rowData]);

	return (
		<td ref={mergeRefs(expandCell, ref)} className={`expandCell ${active && "active"}`}>
			{mergedFrom && (
				<table className={"sub-table"}>
					<tbody>
						{mergedFrom.map((row, idx) =>
							<tr className="gridded-row" key={idx}>
								{keysForMergedRows.map((key, i) =>
									<Cell
										cellData={rowData === false ? false : row[key]}
										colName={key}
										width={meta[key].widthweight || allOptionsWithData.widthweight.default}
										key={i}
										noExpand
										updateable={meta[key].updateable}
										dropdownUpdateOptions={meta[key].dropdownupdateoptions}
										allowInputFrom={meta[key].allowinputfrom || allOptionsWithData.allowinputfrom.default}
										valueType={meta[key].valuetype || allOptionsWithData.valuetype.default}
										primaryKey={row[dataTable_pk]}
										updateEntry={updateEntry}
									/>
								)}
							</tr>
						)}
					</tbody>
				</table>
			)}
			{active && console.log(rowData)}
			<div className={"container"}>
				{additionalColKeys &&
					<div>
						<dl className={"expandList"}>
							{additionalColKeys.map((key, i) => {
								const cellData = rowData[key];
								const omit = (rowData
									&& rowData.addedProps
									&& !rowData.addedProps.merged
									&& meta[key].merge === "count");
								return (
									<div key={i}>
										<dt key={"dt" + i}>{meta[key].hovername || meta[key].title || key}</dt>
										<dd key={"dd" + i}>{(moment.isMoment(cellData)) ? cellData.format("YYYY-MM-DD") :
											(!cellData || cellData === "0" || omit) ? "" : cellData}</dd>
									</div>
								);})
							}

						</dl></div>}
			</div>

			<style jsx>{`
        td {
          transition: height 100ms linear;
          height: 0;
					padding: 0;
          grid-column: 1/-1;
          background-color: white;
					overflow: hidden;
					display: grid;
        }
        td.active{
          height: ${height};
        }
				.container {
					background-color: white;
					padding: 8px;
					color: black;
					border: 1px solid ${gray_light.color};
					border-width: 0 0 1px 0;
					font-weight: normal;
				}
				.sub-table {
					width: 100%;
					background-color: ${gray_lighter.color};
					color: ${gray_lighter.text};
					border-collapse: collapse;
					font-weight: bold;
				}
				.expandCell:not(.active) {
					font-size: 0.97em;
				}



      `}</style>
		</td>
	);
};

export default forwardRef(Expand);
