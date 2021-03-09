import React, {useRef, useMemo, forwardRef} from "react";

import { allOptionsWithData } from "../../config/viewOptions";
import {
	dataTable_pk,
	numberOfColumnsInExpandBlock
} from "../../config/globalvariables";
import { useToolkit } from "../../lib/custom-hooks";
import Cell from "./cell";
import CustomerDeals from "./customerdeals";
import EditableCell from "./editablecell";
import ExpandBlock from "./expandblock";
import Risk4SalesCell from "./risk4salescell";














const Expand = ({groupedAdditionalColKeys, rowData, meta, user, active, mergedFrom, keysForMergedRows, updateEntry, operationsInputRights, triggerUpdate, salesInputRights, theme, conversionRate, conversionMode, salesMode, setUntouched}, ref) => {
	const expandCell = useRef(null);
	const {mergeRefs} = useToolkit();
	const {gray_light, gray_lighter, gray, tertiary} = theme;



	const height = useMemo(() => (rowData && groupedAdditionalColKeys && expandCell.current?.scrollHeight) ? expandCell.current.scrollHeight : "auto", [rowData, groupedAdditionalColKeys, expandCell.current]);


	return (
		<div ref={mergeRefs(expandCell, ref)} className={`td expandCell ${active && "active"}`}>
			{mergedFrom && (
				<div className={"sub-table"}>
					<div>
						{mergedFrom.map((row, idx) =>
							<div className="tr gridded-row" key={row[dataTable_pk]}>
								{keysForMergedRows.map((key, i) => {
									if (key === "risk4sales") {
										return (
											<Risk4SalesCell
												cellData={rowData === false ? false : row[key]}
												rowData={row}
												active={active}
												colName={key}
												key={key}
												theme={theme}
												primaryKey={rowData && row[dataTable_pk]}
												updateEntry={updateEntry}
											/>
										);
									}
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
												inRangeOf={meta[key].inrangeof}
												noExpand
												colName={key}
												updateable={meta[key].updateable}
												dropdownUpdateOptions={meta[key].dropdownupdateoptions}
												valueType={meta[key].valuetype || allOptionsWithData.valuetype.default}
												merge={meta[key].merge}
												key={key}
												theme={theme}
												isRound={meta[key].specialnumberformat === "money-round" ? 0 : 2}
												inEuro={meta[key].specialnumberformat === "money" || meta[key].specialnumberformat === "money-round"}
												isPercentage={meta[key].specialnumberformat === "percentage"}
												active={active}
												primaryKey={row[dataTable_pk]}
												convertable={meta[key].convertable}
												conversionRate={conversionRate}
												updateEntry={updateEntry}
												triggerUpdate={triggerUpdate}
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
										rowData={rowData}
										inRangeOf={meta[key].inrangeof}
										dateErrorOn={meta[key].dateerroronweeks}
										dateWarnOn={meta[key].datewarnonweeks}
										noExpand
										compare={rowData[key]}
										theme={theme}
										convertable={meta[key].convertable}
										conversionRate={conversionRate}
										valueType={meta[key].valuetype || allOptionsWithData.valuetype.default}
										key={key}
										isRound={meta[key].specialnumberformat === "money-round" ? 0 : 2}
										inEuro={meta[key].specialnumberformat === "money" || meta[key].specialnumberformat === "money-round"}
										isPercentage={meta[key].specialnumberformat === "percentage"}
										active={active}
										count={meta[key].merge === "count" && idx+1}
										omit={
											(rowData
												&& rowData.addedProps
												&& !rowData.addedProps.merged
												&& meta[key].merge === "count")
										}
									/>;
								}

								)}
							</div>
						)}
					</div>
				</div>
			)}
			<div className={"container"}>
				{groupedAdditionalColKeys &&
					groupedAdditionalColKeys.map((group, i) =>{
						return <ExpandBlock
							key={i}
							additionalColKeys={group}
							rowData={rowData}
							meta={meta}
							conversionRate={conversionRate}
							setUntouched={setUntouched}
							active={active}/>;
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
				{salesMode &&
					<CustomerDeals
						theme={theme}
						active={active}
						conversionRate={conversionRate}
						conversionMode={conversionMode}
						mergedFrom={mergedFrom}
						rowData={rowData}
						user={user}
					/>}
			</div>

			<style jsx>{`
        .td {
          transition: height 100ms linear;
          height: 0;
					padding: 0;
          grid-column: 1/-1;
          background-color: white;
					overflow: hidden;
					display: grid;
        }
        .td.active{
          height: ${height === "auto" ? "auto" : height + "px"};
        }
				.tr {
					border
				}
				.container {
					background-color: ${gray_light.color};
					padding: 8px;
					color: black;
					border: 1px solid ${gray_light.color};
					border-width: 0 0 1px 0;
					font-weight: normal;
					display: grid;
					grid-template-columns: repeat(${salesMode ? numberOfColumnsInExpandBlock - 2 : numberOfColumnsInExpandBlock}, auto) ${salesMode ? "minmax(710px, auto)" : ""};
					grid-template-rows: repeat(1, fit-content);
					gap: 8px;
				}
				.sub-table {
					width: 100%;
					color: ${gray_lighter.text};
					background-color: white;
					border-collapse: collapse;
					font-weight: bold;
					/* border-bottom: 1px solid ${tertiary.color}; */
				}
				/* .sub-table::before {
				  content: "";
				  position: absolute;
				  top: 0;
				  left: 0;
				  width: 100%;
				  height: 100%;
				  opacity: .05;
				  z-index: 0;
				  background-color: ${tertiary.color};
				} */
				.expandCell:not(.active) {
					font-size: 0.97em;
				}



      `}</style>
		</div>
	);
};

export default forwardRef(Expand);
