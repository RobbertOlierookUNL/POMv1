import React, {useState, useEffect, useMemo} from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment-timezone";
import NumberFormat from "react-number-format";

import { dataTable_pk, errorRGB } from "../../config/globalvariables";
import { useError, useTheme } from "../../lib/custom-hooks";
import DropDown from "./dropdown";
import Input from "./input";









const EditableCell = ({cellData, rowData, omit, active, colName, triggers, noExpand, valueType, merge, inRangeOf, updateable, dropdownUpdateOptions, primaryKey, updateEntry, triggerUpdate, isRound, inEuro, isPercentage, hasBatches = false, theme, selectMode, checked, convertable, conversionRate}) => {
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
			let newValue = temporaryState;
			if (cellData !== convertedData) {
				if (convertable === "multiply") {
					newValue = temporaryState / conversionRate;
				} else {
					newValue = temporaryState * conversionRate;
				}
			}
			if (selectMode) {
				let checkedPks = [];
				for (const pk in checked) {
					if (checked[pk]) {
						checkedPks.push(pk.split(","));
					}
				}
				checkedPks = checkedPks.flat();
				for (const pk of checkedPks) {
					updateEntry(pk, colName, newValue);
					triggerUpdate(pk,newValue, hasBatches, colName, triggers, rowData);
				}
			}
			if (hasBatches) {
				for (const pk of primaryKey) {
					updateEntry(pk, colName, newValue);
					triggerUpdate(pk,newValue, hasBatches, colName, triggers, rowData);
				}
			} else {
				updateEntry(primaryKey, colName, newValue);
				triggerUpdate(primaryKey,newValue, hasBatches, colName, triggers, rowData);
			}
		}
	}, [temporaryState, hasBatches, selectMode, convertable, convertedData]);

	const edit = () => {
		setEditMode(true);
	};

	const save = (e) => {
		setEditMode(false);
		if (e.target.value != convertedData) {
			setTemporaryState(e.target.value);
		}
	};

	const formatDisplay = useMemo(() => {
		if (cellData === false || cellData == "undefined") {
			return "loading";
		} else if (temporaryState !== false) {
			return "temp";
		} else if (!(!editMode || (updateable === "withDropdown") || ((merge === "add") && (hasBatches || selectMode)))) {
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
		} else if (updateable === "withFreeInput" && merge ==="add" && (hasBatches || selectMode)) {
			return "allOrNothing";
		} else if (valueType === "number") {
			return "number";
		} else {
			return false;
		}
	}, [cellData, temporaryState, editMode, omit, valueType, hasBatches, updateable, selectMode]);

	const convertedData = useMemo(() => {
		if (cellData && (valueType === "number") && (convertable === "multiply" || convertable === "divide")) {
			if (convertable === "multiply") {
				return cellData * conversionRate;
			}
			return cellData / (conversionRate || 1);
		} else {
			return cellData;
		}}, [formatDisplay, valueType, cellData, convertable, conversionRate]);


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
					value={convertedData}
					decimalScale={isRound}
					thousandSeparator={"."}
					decimalSeparator={","}
					fixedDecimalScale={inEuro}
					prefix={inEuro ? "€" : ""}
					suffix={isPercentage ? "%" : ""}
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
					defaultValue={convertedData}
					save={save}
					options={dropdownUpdateOptions}
				/>)
				||
				(formatDisplay === "allOrNothing" && <DropDown
					defaultValue={convertedData}
					formattedFirstOption={
						<NumberFormat
							value={convertedData}
							decimalScale={isRound}
							thousandSeparator={"."}
							decimalSeparator={","}
							fixedDecimalScale={inEuro}
							prefix={inEuro ? "€" : ""}
							suffix={isPercentage ? "%" : ""}
							displayType={"text"}
							renderText={value => <option value={convertedData}>{value}</option>}
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
					defaultValue={convertedData}
					save={save}
				/>)
				||
				(!formatDisplay && cellData)
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
				/* .topLevel {
					background:
						linear-gradient(to top right,transparent 50%,${primary_light.color} 0) top right/3.5px 3.5px no-repeat;
				} */
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
