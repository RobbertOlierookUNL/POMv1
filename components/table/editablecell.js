import React, {useState, useEffect} from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";

import { useTheme } from "../../lib/custom-hooks";
import DropDown from "./dropdown";
import Input from "./input";
import { dataTable_pk } from "../../config/globalvariables";







const EditableCell = ({cellData, rowData, omit, active, colName, triggers, noExpand, valueType, updateable, dropdownUpdateOptions, primaryKey, updateEntry, hasBatches = false}) => {
	const [editMode, setEditMode] = useState(false);
	const [saving, setSaving] = useState(false);
	const [temporaryState, setTemporaryState] = useState(false);

	useEffect(() => {
		if (temporaryState !== false) {
			setTemporaryState(false);
		}
	}, [cellData]);


	const triggerUpdate = (pk, value, hasBatches) => {
		if (triggers) {
			const triggerArray = triggers.split(", ");
			for (var trigger of triggerArray) {
				const [colToUpdate, math] = trigger.split(" = ");
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

	const {gray_light, primary_light, primary_overlay, secondary} = useTheme();



	return (
		<td
			className={colName + " editable" + (hasBatches ? " topLevel" : "") +(temporaryState !== false ? " still-saving" : "")}
			onClick={edit}
		>
			{(cellData === false) || saving
				?
				<Skeleton />
				:
				!editMode || (updateable === "withDropdown")
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
									updateable === "withDropdown"
									&& <DropDown
										defaultValue={".."}
										save={save}
										options={`.., ${dropdownUpdateOptions}`}
									/> ||
									<i>..</i>
									:
									updateable === "withDropdown"
									&& <DropDown
										defaultValue={cellData}
									  save={save}
										options={dropdownUpdateOptions}
									/> ||
									cellData
					)
					:
					(updateable === "withFreeInput"
					&& <Input
						type={valueType}
						defaultValue={cellData}
						save={save}
					/>)


			}
			<style jsx>{`
        td {
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
        td:nth-last-child(${noExpand ? 1 : 2}) {
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
		</td>
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
