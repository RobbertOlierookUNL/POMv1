import React, {useRef, useMemo, forwardRef} from "react";

import { allOptionsWithData } from "../../config/viewOptions";
import {
	dataTable_pk,
	numberOfColumnsInExpandBlock
} from "../../config/globalvariables";
import { useToolkit } from "../../lib/custom-hooks";
import Cell from "./cell";
import CustomerDeals from "./customerdeals";
import DynamicCell from "./dynamiccell";
import EditableCell from "./editablecell";
import ExpandBlock from "./expandblock";
import Risk4SalesCell from "./risk4salescell";















const Expand = ({groupedAdditionalColKeys, rowData, meta, user, active, mergedFrom, keysForMergedRows, updateEntry, operationsInputRights, triggerUpdate, salesInputRights, theme, conversionRate, conversionMode, salesMode, setUntouched, country}, ref) => {
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

									const updateable = meta[key].updateable;
									const allowInputFrom = meta[key].allowinputfrom || allOptionsWithData.allowinputfrom.default;
									const [elemOpLevel, elemSaLevel] = allowInputFrom.split(", ").map(el => parseInt(el[2]));
									const isEditable = (updateable === "withDropdown" || updateable === "withFreeInput")
											&& (
												(elemOpLevel && (operationsInputRights >= elemOpLevel))
												|| (elemSaLevel && (salesInputRights >= elemSaLevel))
											);
									const genericProps = {
										cellData: rowData === false ? false : row[key],
										colName: key,
										valueType: meta[key].valuetype || allOptionsWithData.valuetype.default,
										isRound: meta[key].specialnumberformat === "money-round" ? 0 : 2,
										inRangeOf: meta[key].inrangeof,
										inEuro: meta[key].specialnumberformat === "money" || meta[key].specialnumberformat === "money-round",
										isPercentage: meta[key].specialnumberformat === "percentage",
										convertable: meta[key].convertable,
										omit: rowData
														&& rowData.addedProps
														&& !rowData.addedProps.merged
														&& meta[key].merge === "count",
										active,
										rowData,
										theme,
										conversionRate,
										noExpand: true,
									};
									const dynamicProps = {
										triggers: meta[key].triggers,
										cellData: rowData === false ? false : row[key],
										colName: key,
										active,
										primaryKey: row && row[dataTable_pk],
										updateEntry,
										triggerUpdate,
										rowData
									};

									const InputCell = (props) => (
										<EditableCell {...genericProps} {...props}
											updateable={meta[key].updateable}
											dropdownUpdateOptions={meta[key].dropdownupdateoptions}
											merge={meta[key].merge}
											primaryKey={row && row[dataTable_pk]}
											updateEntry={updateEntry}
										/>
									);

									const StaticCell = (props) => (
										<Cell {...genericProps} {...props}
											dateErrorOn={meta[key].dateerroronweeks}
											dateWarnOn={meta[key].datewarnonweeks}
										/>
									);

									let ThisCell = StaticCell;
									if (isEditable) {
										ThisCell = InputCell;
									}
									if (meta[key].triggers) {
										return (
											<DynamicCell key={key} ChildCell={ThisCell} {...dynamicProps}/>
										);
									}
									return (
										<ThisCell key={key}	/>
									);
								})}
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
					// 					<dd key={"dd" + i}>{(moment.isMoment(cellData)) ? cellData.format("DD-MM-YYYY") :
					// 						(!cellData || cellData === "0" || omit) ? "" : cellData}</dd>
					// 				</div>
					// 			);})
					// 		}
					//
					// 	</dl></div>
				}
				{salesMode === "Sales" &&
					<CustomerDeals
						theme={theme}
						active={active}
						conversionRate={conversionRate}
						conversionMode={conversionMode}
						mergedFrom={mergedFrom}
						rowData={rowData}
						user={user}
						country={country}
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
					grid-template-columns: repeat(${(salesMode === "Sales") ? (numberOfColumnsInExpandBlock - 2) : numberOfColumnsInExpandBlock}, auto) ${salesMode === "Sales" ? "minmax(710px, auto)" : ""};
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
