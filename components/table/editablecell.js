import React, {useState, useEffect} from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import NumberFormat from "react-number-format";

import { dataTable_pk, errorRGB } from "../../config/globalvariables";
import { useError, useTheme } from "../../lib/custom-hooks";
import DropDown from "./dropdown";
import Input from "./input";









const EditableCell = ({cellData, rowData, omit, active, colName, triggers, noExpand, valueType, inRangeOf, updateable, dropdownUpdateOptions, primaryKey, updateEntry, inEuro, hasBatches = false}) => {
	const [editMode, setEditMode] = useState(false);
	const [saving, setSaving] = useState(false);
	const [temporaryState, setTemporaryState] = useState(false);
	const [error, setError] = useError(primaryKey, colName);
	const [limitOptions, setLimitOptions] = useState([]);

	useEffect(() => {
		if (temporaryState !== false) {
			setTemporaryState(false);
		}
	}, [cellData]);

	// useEffect(() => {
	// 	if (inRangeOf && hasBatches) {
	// 		const arr = inRangeOf.split(", ");
	// 		const limits = [];
	// 		for (const a of arr) {
	// 			const identifier = a.replace("$", "");
	// 			limits.push(identifier);
	// 		}
	// 		limits.push("0")
	// 		setLimitOptions(limits);
	// 	}
	// }, [inRangeOf, rowData])

	useEffect(() => {
	  if (inRangeOf) {
			if ((cellData > rowData[inRangeOf]) && !error) {
				setError(true);
				console.log({cellData});
			} else if ((cellData <= rowData[inRangeOf]) && error) {
				setError(false);
			}
	  }
	}, [inRangeOf, cellData, rowData]);


	const triggerUpdate = (pk, value, hasBatches) => {
		if (triggers) {
			const triggerArray = triggers.split(", ");
			for (var trigger of triggerArray) {
				const [conditionsAndcolToUpdate, math] = trigger.split(" = ");
				const arr = conditionsAndcolToUpdate.split(" | ");
				const colToUpdate = arr.length === 1 ? arr[0] : arr[1];
				const conditions = arr.length === 1 ? [] : arr[0].split(", ");
				let conditionsPassed = true;
				for (const condition of conditions) {
					if (value === condition) {
						conditionsPassed = true;
						break;
					}
					conditionsPassed = false;
				}
				if (conditionsPassed) {
					let answer;
					if (!hasBatches) {
						answer = eval(math.replace(`$${colName}`, `${value}`).replace(/\$/g, "rowData."));
					} else {
						for (const mergedFrom of rowData.addedProps.mergedFrom) {
							if (pk === mergedFrom[dataTable_pk]) {
						 	answer = eval(math.replace(`$${colName}`, `${value}`).replace(/\$/g, "mergedFrom."));
							}
						}
					}
					const formattedColToUpdate = colToUpdate.replace("$", "");
					const correctAnswer = !Number.isNaN(answer);
					if ((formattedColToUpdate in rowData) && correctAnswer ) {
						updateEntry(pk, formattedColToUpdate, answer);
					}
				}
			}
		}
	};

	useEffect(() => {
		if (temporaryState !== false) {
			if (hasBatches) {
				for (const pk of primaryKey) {
					updateEntry(pk, colName, temporaryState);
					triggerUpdate(pk,temporaryState, hasBatches);
				}
			} else {
				updateEntry(primaryKey, colName, temporaryState);
				triggerUpdate(primaryKey,temporaryState, hasBatches);
			}
			setSaving(false);
		}
	}, [temporaryState, hasBatches]);

	const edit = () => {
		setEditMode(true);

	};
	const save = (e) => {
		setEditMode(false);
		if (e.target.value != cellData) {
			setSaving(true);
			setTemporaryState(e.target.value);
		}

		setTimeout(() => setSaving(false), 2000);
	};

	const {gray_light, primary_light, primary_overlay, secondary, tertiary} = useTheme();



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
			{(cellData === false) || saving || typeof cellData == "undefined"
				?
				<Skeleton />
				:
			  (!editMode || (updateable === "withDropdown") || ((valueType === "number") && (hasBatches)))
					?
					(moment.isMoment(cellData)
						?
						cellData.format("YYYY-MM-DD")
						:
						temporaryState !== false ? temporaryState
							:
							(!cellData || cellData === "0" || omit)
								?
								""
								:
								Array.isArray(cellData)
									?
									(updateable === "withDropdown"
									&& <DropDown
										defaultValue={".."}
										save={save}
										options={`.., ${dropdownUpdateOptions}`}
									/>) ||
									<i>..</i>
									:
									updateable === "withDropdown"
										? <DropDown
											defaultValue={cellData}
									  save={save}
											options={dropdownUpdateOptions}
										/>
										:
										(updateable === "withFreeInput" && valueType ==="number" && hasBatches)
									 ?
											<DropDown
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
											/>
											:
											(valueType === "number")
												?
												<NumberFormat
													value={cellData}
													decimalScale={2}
													thousandSeparator={"."}
													decimalSeparator={","}
													fixedDecimalScale={inEuro}
													prefix={inEuro ? "€" : ""}
													displayType={"text"}
										 />
												:
												cellData
					)
					:

					<Input
						type={valueType}
						defaultValue={cellData}
						save={save}
					/>
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
