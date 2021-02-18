import { CSVLink } from "react-csv";
import * as FileSaver from "file-saver";
import React, {useMemo} from "react";
import * as XLSX from "xlsx";
import moment from "moment";

import {
	filterDisplayBarHeight,
	horPadding,
	toolBarHeight
} from "../../../config/globalvariables";
import { useGlobalUser } from "../../../lib/store-hooks";
import { useHandleClickOutstide, useTheme } from "../../../lib/custom-hooks";
import ToolbarIcon from "./toolbaricon";
import useGlobal from "../../store";











const Toolbar = ({options, data, keys, sortedRowKeys, meta}) => {
	const {primary_dark, primary_very_light} = useTheme();
	const [arrayOfFilters] = useGlobal(state => state.arrayOfFilters, () => null);

	const [, toggleSelectMode] = useGlobal(
		() => null,
		actions => actions.toggleSelectMode,
	);
	const [filterModal, openFilterModal] = useGlobal(
		state => state.filterModal,
		actions => actions.openFilterModal,
	);
	useHandleClickOutstide(filterModal, () => openFilterModal(false));
	const user = useGlobalUser();

	const headers = useMemo(() => keys.map(key => {return {label: key, key};}), [keys]);

	const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
	const fileName = `POM-dump_${moment().format("YYYY-MM-DD")}_${user?.firstName ? user.firstName : ""}${user?.lastName ? `-${user.lastName}` : "user"}`;
	const fileExtension = ".xlsx";

	const getRightCells = entry => {
		const formattedEntry = {};
		for (const key of keys) {
			const label = meta[key].hovername || meta[key].title || key;
			formattedEntry[label] =  (moment.isMoment(entry[key])
				?
				entry[key].format("YYYY-MM-DD")
				:

				(!entry[key] || entry[key] === "0")
					?
					""
					:
					Array.isArray(entry[key])
						?
						<i>..</i>
						:
						entry[key]
			);
		}
		return formattedEntry;
	};

	const exportToCSV = () => {

		const batchLevel = [];
		const topLevel = sortedRowKeys.map(idx => {
			const formattedEntry = getRightCells(data[idx]);
			if (data[idx].addedProps?.merged && data[idx].addedProps?.mergedFrom) {
				for (const entry of data[idx].addedProps.mergedFrom) {
					const formattedMergedEntry = getRightCells(entry);
					batchLevel.push(formattedMergedEntry);
				}
			} else {
				batchLevel.push(formattedEntry);
			}
			return formattedEntry;
		});
		const tl = XLSX.utils.json_to_sheet(topLevel);
		const bl = XLSX.utils.json_to_sheet(batchLevel);

		const wb = { Sheets: { "topLevel": tl, "batchLevel": bl}, SheetNames: ["topLevel", "batchLevel"] };
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		const blob = new Blob([excelBuffer], {type: fileType});
		FileSaver.saveAs(blob, fileName + fileExtension);
	};

	// console.log({data, headers});

	return (
		<>
			<div className="toolbar">
				<div className="toolbarPart leftSide">
					<ToolbarIcon type={"multi-select"} iconClick={toggleSelectMode}/>
					<ToolbarIcon type={"filter"} iconClick={() => openFilterModal(true)}/>
				</div>
				<div className="toolbarPart mid"></div>
				<div className="toolbarPart rightSide">
					{/* <CSVLink data={data} headers={headers}> */}
					<ToolbarIcon type={"export"} iconClick={exportToCSV}/>
					{/* </CSVLink> */}
				</div>
			</div>
			<style jsx>{`
      .toolbar {
        width:100%;
        height: ${toolBarHeight};
        position: sticky;
				display: grid;
				align-items: center;
				grid-template-columns: [start] 1fr [midLeft] 1fr [midRight] 1fr [end];
        top: ${arrayOfFilters.length ? filterDisplayBarHeight : "0px"};
				transition: top 100ms ease-in;
        background-color: ${primary_dark.color};
        color: ${primary_very_light.color};
      }

			.toolbarPart {
				width: 100%;
				padding: 0 ${horPadding}px;
				gap: ${horPadding}px;
			}
			.leftSide {
				grid-column: start / midLeft;
				display: flex;
				justify-content: flex-start;
			}
			.mid {
				grid-column: midLeft / midRight;
				display: flex;
				justify-content: center;
			}
			.rightSide{
				grid-column: midRight / end;
				display: flex;
				justify-content: flex-end;
			}
    `}</style>
		</>
	);
};

export default Toolbar;
