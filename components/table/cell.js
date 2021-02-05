import React, {useState, useEffect} from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import mutate from "swr";

import { useTheme } from "../../lib/custom-hooks";
import DropDown from "./dropdown";
import Input from "./input";
import useGlobal from "../store";





const Cell = ({cellData, omit, rowId, colName, noExpand, allowInputFrom, valueType, updateable, dropdownUpdateOptions, primaryKey, updateEntry}) => {
	const [editMode, setEditMode] = useState(false);
	const [saving, setSaving] = useState(false);
	const [temporaryState, setTemporaryState] = useState(false);
	const [active] = useGlobal(
		state => state.active,
		() => null
	);
	const {gray_light, primary_light, primary_overlay} = useTheme();
	useEffect(() => {
		if (temporaryState) {
			setTemporaryState(false);
		}
	}, [cellData]);

	useEffect(() => {
		if (temporaryState) {
			updateEntry(rowId, primaryKey, colName, temporaryState);
			setSaving(false);
		}
	}, [temporaryState]);

	const edit = () => {
		setEditMode(true);
	};
	const save = (e) => {
		setEditMode(false);
		if (e.target.value !== cellData) {
			setSaving(true);
			setTemporaryState(e.target.value);
		}

		setTimeout(() => setSaving(false), 2000);
	};

	const isEditable = (updateable === "withDropdown" || updateable === "withFreeInput");

	return (
		<td
			className={colName + (isEditable ? " editable" : "")}
			onClick={isEditable ? edit : undefined}
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
						temporaryState ? temporaryState
							:
							(!cellData || cellData === "0" || omit)
								?
								""
								:
								Array.isArray(cellData)
									?
									<i>..</i>
									:
									updateable === "withDropdown" && <DropDown defaultValue={cellData} save={save} options={dropdownUpdateOptions}/> ||
									cellData
					)
					:
					(updateable === "withFreeInput" && <Input type={valueType} defaultValue={cellData} save={save}/>)
				

			}
			<style jsx>{`
        td {
          border: 1px solid ${gray_light.color};
          border-width: 0 1px 1px 0;
					grid-column-start: ${colName};
					cursor: pointer;
					padding: 2px;
			 	${(active === rowId) || noExpand ? "" : (`
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
export default Cell;
