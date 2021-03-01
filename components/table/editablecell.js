import React, {useState, useEffect, useMemo} from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment-timezone";
import NumberFormat from "react-number-format";

import { dataTable_pk, errorRGB } from "../../config/globalvariables";
import { useError, useTheme } from "../../lib/custom-hooks";
import DropDown from "./dropdown";
import Input from "./input";









const EditableCell = ({cellData, rowData, omit, active, colName, triggers, noExpand, valueType, inRangeOf, updateable, dropdownUpdateOptions, primaryKey, updateEntry, triggerUpdate, inEuro, hasBatches = false, theme}) => {
	const [editMode, setEditMode] = useState(false);
	const [temporaryState, setTemporaryState] = useState(false);
	const {gray_light, primary_light, primary_overlay, secondary} = theme;
	const error = useMemo(() => cellData > rowData[inRangeOf], [inRangeOf, cellData, rowData]);

	useEffect(() => {
		if (temporaryState !== false) {
			setTemporaryState(false);
		}
	}, [cellData]);


	useEffect(() => {
		if (temporaryState !== false) {
			if (hasBatches) {
				for (const pk of primaryKey) {
					updateEntry(pk, colName, temporaryState);
					triggerUpdate(pk,temporaryState, hasBatches, colName, triggers, rowData);
				}
			} else {
				updateEntry(primaryKey, colName, temporaryState);
				triggerUpdate(primaryKey,temporaryState, hasBatches, colName, triggers, rowData);
			}
		}
	}, [temporaryState, hasBatches]);

	const edit = () => {
		setEditMode(true);
	};

	const save = (e) => {
		setEditMode(false);
		if (e.target.value != cellData) {
			setTemporaryState(e.target.value);
		}
	};

	const formatDisplay = useMemo(() => {
		if (cellData === false || cellData == "undefined") {
			return "loading";
		} else if (temporaryState !== false) {
			return "temp";
		} else if (!(!editMode || (updateable === "withDropdown") || ((valueType === "number") && (hasBatches)))) {
			return "freeInput";
		} else if (!cellData || cellData === "0" || omit) {
			return "empty";
		} else if (valueType === "date") {
			return "date";
		} else if (Array.isArray(cellData) && updateable === "withDropdown") {
			return "multiWithDropDown";
		} else if (Array.isArray(cellData)) {
			return "multi";
		} else if (updateable === "withDropdown") {
			return "dropdown";
		} else if (updateable === "withFreeInput" && valueType ==="number" && hasBatches) {
			return "allOrNothing";
		} else if (valueType === "number") {
			return "number";
		} else {
			return false;
		}
	}, [cellData, temporaryState, editMode, omit, valueType, hasBatches, updateable]);


	return (
		<div
			className={
				colName +
				" editable td" +
				(hasBatches ? " topLevel" : "") +
				(temporaryState !== false ? " still-saving" : "") +
				(error ? " error" : "")
			}
			onClick={edit}
		>
			{
				(formatDisplay === "loading" && <Skeleton />)
				||
				(formatDisplay === "empty" &&  "")
				||
				(formatDisplay === "date" && moment(cellData).format("YYYY-MM-DD"))
				||
				(formatDisplay === "number" && <NumberFormat
					value={cellData}
					decimalScale={2}
					thousandSeparator={"."}
					decimalSeparator={","}
					fixedDecimalScale={inEuro}
					prefix={inEuro ? "€" : ""}
					displayType={"text"}
				/>)
				||
				(formatDisplay === "multi" && <i>..</i>)
				||
				(formatDisplay === "multiWithDropDown" && <DropDown
					defaultValue={".."}
					save={save}
					options={`.., ${dropdownUpdateOptions}`}
				/>)
				||
				(formatDisplay === "dropdown" && <DropDown
					defaultValue={cellData}
					save={save}
					options={dropdownUpdateOptions}
				/>)
				||
				(formatDisplay === "allOrNothing" && <DropDown
					defaultValue={cellData}
					formattedFirstOption={
						<NumberFormat
							value={cellData}
							decimalScale={2}
							thousandSeparator={"."}
							decimalSeparator={","}
							fixedDecimalScale={inEuro}
							prefix={inEuro ? "€" : ""}
							displayType={"text"}
							renderText={value => <option value={cellData}>{value}</option>}
						/>
					}
					save={save}
					options={0}
				/>)
				||
				(formatDisplay === "temp" && temporaryState)
				||
				(formatDisplay === "freeInput" && <Input
					type={valueType}
					defaultValue={cellData}
					save={save}
				/>)
				||
				(!formatDisplay && cellData)
				// (cellData === false) || typeof cellData == "undefined"
				// ?
				// <Skeleton />
				// :
			  // (!editMode || (updateable === "withDropdown") || ((valueType === "number") && (hasBatches)))
				// 	?
				// 	(moment.isMoment(cellData)
				// 		?
				// 		cellData.format("YYYY-MM-DD")
				// 		:
				// 		temporaryState !== false ? temporaryState
				// 			:
				// 			(!cellData || cellData === "0" || omit)
				// 				?
				// 				""
				// 				:
				// 				Array.isArray(cellData)
				// 					?
				// 					(updateable === "withDropdown"
				// 					&& <DropDown
				// 						defaultValue={".."}
				// 						save={save}
				// 						options={`.., ${dropdownUpdateOptions}`}
				// 					/>) ||
				// 					<i>..</i>
				// 					:
				// 					updateable === "withDropdown"
				// 						? <DropDown
				// 							defaultValue={cellData}
				// 					  save={save}
				// 							options={dropdownUpdateOptions}
				// 						/>
				// 						:
				// 						(updateable === "withFreeInput" && valueType ==="number" && hasBatches)
				// 					 ?
				// 							<DropDown
				// 								defaultValue={cellData}
				// 								formattedFirstOption={
				// 									<NumberFormat
				// 										value={cellData}
				// 										decimalScale={2}
				// 										thousandSeparator={"."}
				// 										decimalSeparator={","}
				// 										fixedDecimalScale={inEuro}
				// 										prefix={inEuro ? "€" : ""}
				// 										displayType={"text"}
				// 										renderText={value => <option value={cellData}>{value}</option>}
				// 							 />
				// 								}
				// 								save={save}
				// 								options={0}
				// 							/>
				// 							:
				// 							(valueType === "number")
				// 								?
				// 								<NumberFormat
				// 									value={cellData}
				// 									decimalScale={2}
				// 									thousandSeparator={"."}
				// 									decimalSeparator={","}
				// 									fixedDecimalScale={inEuro}
				// 									prefix={inEuro ? "€" : ""}
				// 									displayType={"text"}
				// 						 />
				// 								:
				// 								cellData
				// 	)
				// 	:
				//
				// 	<Input
				// 		type={valueType}
				// 		defaultValue={cellData}
				// 		save={save}
				// 	/>
			}
			<style jsx>{`
        .td {
          border: 1px solid ${gray_light.color};
          border-width: 0 1px 1px 0;
					grid-column-start: ${colName};
					cursor: pointer;
					padding: 2px;
			 	${active || noExpand ? "" : (`
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;`)
		}
        }
        .td:nth-last-child(${noExpand ? 1 : 2}) {
          border-width: 0 0 1px 0;
        }
				.editable {
					cursor: text;
					background:
						linear-gradient(to top right,transparent 50%,${primary_light.color} 0) top right/3.5px 3.5px no-repeat,
						${primary_overlay.color};
				}
				.topLevel {
					background:
						linear-gradient(to top right,transparent 50%,${primary_light.color} 0) top right/3.5px 3.5px no-repeat;
				}
				.still-saving {
					animation: saving 3s infinite;
				}
				.error.editable {
					cursor: text;
					color: white;
					background:
						linear-gradient(to top right,transparent 50%,${primary_light.color} 0) top right/3.5px 3.5px no-repeat,
						rgb(${errorRGB});
				}

				@keyframes saving {
				  0%   {
						color: black;
						background:
							linear-gradient(to top right,transparent 50%,${secondary.color} 0) top right/3.5px 3.5px no-repeat,
							${primary_overlay.color};
					}
				  50% {
						color: gray;
						background:
							linear-gradient(to top right,transparent 50%,${secondary.color} 0) top right/3.5px 3.5px no-repeat,
							transparent;
					}
					100%  {
						color: black;
						background:
							linear-gradient(to top right,transparent 50%,${secondary.color} 0) top right/3.5px 3.5px no-repeat,
							${primary_overlay.color};
					}
				}

    `}
			</style>
		</div>
	);
};

/* .editable:after {
	content: '';
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 0 5px 5px 0;
	border-color: transparent ${secondary.color} transparent transparent;
	right: 0;
	top: 0;
	position: absolute;
} */
export default EditableCell;
