import React, {useRef, useEffect, useState, forwardRef} from "react";

import { allOptionsWithData } from "../../config/viewOptions";
import {
	dataTable_pk,
	numberOfColumnsInExpandBlock
} from "../../config/globalvariables";
import { useColors, useToolkit } from "../../lib/custom-hooks";
import Cell from "./cell";
import EditableCell from "./editablecell";
import ExpandBlock from "./expandblock";












const Expand = ({additionalColKeys, rowData, meta, active, mergedFrom, keysForMergedRows, updateEntry, operationsInputRights, salesInputRights}, ref) => {
	const expandCell = useRef(null);
	const [height, setHeight] = useState("auto");
	const [groupedAKs, setGroupedAKs] = useState(null);
	const {mergeRefs} = useToolkit();
	const [gray_light, gray_lighter, gray_very_light, tertiary] = useColors("gray_light", "gray_lighter", "gray_very_light", "tertiary");

	useEffect(() => {
		rowData && groupedAKs && setHeight(expandCell.current.scrollHeight + 1.33 + "px");
	}, [rowData, groupedAKs]);

	useEffect(() => {
		const grouped = [];
		const perGroup = Math.ceil(additionalColKeys.length / numberOfColumnsInExpandBlock);
		for (let i = 0; i < additionalColKeys.length; i += perGroup) {
			grouped.push(additionalColKeys.slice(i, i+perGroup));
		}
	  setGroupedAKs(grouped);
	}, [additionalColKeys]);

	return (
		<td ref={mergeRefs(expandCell, ref)} className={`expandCell ${active && "active"}`}>
			{mergedFrom && (
				<table className={"sub-table"}>
					<tbody>
						{mergedFrom.map((row, idx) =>
							<tr className="gridded-row" key={idx}>
								{keysForMergedRows.map((key, i) => {
									const updateable = meta[key].updateable;
									const allowInputFrom = meta[key].allowinputfrom || allOptionsWithData.allowinputfrom.default;
									const [elemOpLevel, elemSaLevel] = allowInputFrom.split(", ").map(el => parseInt(el[2]));
									const isEditable = (updateable === "withDropdown" || updateable === "withFreeInput")
											&& (
												(elemOpLevel && (operationsInputRights >= elemOpLevel))
												|| (elemSaLevel && (salesInputRights >= elemSaLevel))
											);
									if (isEditable) {
										return (
											<EditableCell
												cellData={rowData === false ? false : row[key]}
												rowData={row}
												triggers={meta[key].triggers}
												colName={key}
												updateable={meta[key].updateable}
												dropdownUpdateOptions={meta[key].dropdownupdateoptions}
												valueType={meta[key].valuetype || allOptionsWithData.valuetype.default}
												key={i}
												active={active}
												primaryKey={row[dataTable_pk]}
												updateEntry={updateEntry}
												omit={
													(rowData
														&& rowData.addedProps
														&& !rowData.addedProps.merged
														&& meta[key].merge === "count")
												}
											/>
										);
									}
									return <Cell
										cellData={rowData === false ? false : row[key]}
										colName={key}
										noExpand
										key={i}
										active={active}
										omit={
											(rowData
												&& rowData.addedProps
												&& !rowData.addedProps.merged
												&& meta[key].merge === "count")
										}
									/>;
								}

								)}
							</tr>
						)}
					</tbody>
				</table>
			)}
			<div className={"container"}>
				{groupedAKs &&
					groupedAKs.map((group, i) =>{
						return <ExpandBlock key={i} additionalColKeys={group} rowData={rowData} meta={meta} active={active}/>;
					}
					)
					// <div>
					// 	<dl className={"expandList"}>
					// 		{additionalColKeys.map((key, i) => {
					// 			const cellData = rowData[key];
					// 			const omit = (rowData
					// 				&& rowData.addedProps
					// 				&& !rowData.addedProps.merged
					// 				&& meta[key].merge === "count");
					// 			return (
					// 				<div key={i}>
					// 					<dt key={"dt" + i}>{meta[key].hovername || meta[key].title || key}</dt>
					// 					<dd key={"dd" + i}>{(moment.isMoment(cellData)) ? cellData.format("YYYY-MM-DD") :
					// 						(!cellData || cellData === "0" || omit) ? "" : cellData}</dd>
					// 				</div>
					// 			);})
					// 		}
					//
					// 	</dl></div>
				}
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
					background-color: ${tertiary.color};
					padding: 8px;
					color: black;
					border: 1px solid ${gray_light.color};
					border-width: 0 0 1px 0;
					font-weight: normal;
					display: grid;
					grid-template-columns: repeat(${numberOfColumnsInExpandBlock}, 1fr);
					grid-template-rows: repeat(auto-fit, min-content);
					gap: 8px;
				}
				.sub-table {
					width: 100%;
					color: ${gray_lighter.text};
					border-collapse: collapse;
					font-weight: bold;
					position: relative;
					border-bottom: 1px solid ${tertiary.color};
					z-index: 3;
				}
				.sub-table::before {
				  content: "";
				  position: absolute;
				  top: 0;
				  left: 0;
				  width: 100%;
				  height: 100%;
				  opacity: .05;
				  z-index: 2;
				  background-color: ${tertiary.color};
				}
				.expandCell:not(.active) {
					font-size: 0.97em;
				}



      `}</style>
		</td>
	);
};

export default forwardRef(Expand);
