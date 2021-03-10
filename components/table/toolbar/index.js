// import { CSVLink } from "react-csv";
import * as FileSaver from "file-saver";
import React, {useMemo, useState} from "react";
import moment from "moment-timezone";

import {
	filterDisplayBarHeight,
	horPadding,
	toolBarHeight
} from "../../../config/globalvariables";
import { getLevels, getZan } from "./exports";
import { useGlobalUser } from "../../../lib/store-hooks";
import { useHandleClickOutstide, useTheme } from "../../../lib/custom-hooks";
import ConversionDropDown from "./conversiondropdown";
import ConversionSwitch from "./conversionswitch";
import Downloader from "./downloader";
import ToolbarIcon from "./toolbaricon";
import useGlobal from "../../store";












const Toolbar = ({options, data, keys, sortedRowKeys, meta, conversionMode, setConversionMode, checked, selectMode, toggleSelectMode}) => {
	const {primary_dark, primary_very_light} = useTheme();
	const [arrayOfFilters] = useGlobal(state => state.arrayOfFilters, () => null);

	// const [, toggleSelectMode] = useGlobal(
	// 	() => null,
	// 	actions => actions.toggleSelectMode,
	// );
	const [filterModal, openFilterModal] = useGlobal(
		state => state.filterModal,
		actions => actions.openFilterModal,
	);
	useHandleClickOutstide(filterModal, () => openFilterModal(false));
	const user = useGlobalUser();

	// const headers = useMemo(() => keys.map(key => {return {label: key, key};}), [keys]);
	const [downloadAll, setDownloadAll] = useState(false);

	const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
	const fileName = `POM-dump_${moment().format("YYYY-MM-DD")}_${user?.firstName ? user.firstName : ""}${user?.lastName ? `-${user.lastName}` : "user"}`;
	const fileExtension = ".xlsx";


	const exportToCSV = async () => {
		const XLSX = await import("xlsx");
		const {topLevel, batchLevel} = getLevels(meta, keys, selectMode, checked, data, sortedRowKeys);

		const tl = XLSX.utils.json_to_sheet(topLevel);
		const bl = XLSX.utils.json_to_sheet(batchLevel);

		const wb = { Sheets: { "topLevel": tl, "batchLevel": bl}, SheetNames: ["topLevel", "batchLevel"] };
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		const blob = new Blob([excelBuffer], {type: fileType});
		FileSaver.saveAs(blob, fileName + fileExtension);
	};

	const zanExport = async () => {
		const XLSX = await import("xlsx");
		const {batchLevel: zan} = getLevels(meta, keys, selectMode, checked, data, sortedRowKeys, true);

		const z = XLSX.utils.json_to_sheet(zan);

		const wb = { Sheets: { "ZAN": z}, SheetNames: ["ZAN"] };
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		const blob = new Blob([excelBuffer], {type: fileType});
		FileSaver.saveAs(blob, fileName + fileExtension);
	};

	const exportAll = () => {
		setDownloadAll(true);
	};

	const exportAllToCSV = async (a) => {
		const XLSX = await import("xlsx");
		const z = XLSX.utils.json_to_sheet(a);

		const wb = { Sheets: { "database": z}, SheetNames: ["database"] };
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		const blob = new Blob([excelBuffer], {type: fileType});
		FileSaver.saveAs(blob, fileName + fileExtension);
	};


	return (
		<>
			<div className="toolbar">
				<div className="toolbarPart leftSide">
					<ToolbarIcon type={"multi-select"} iconClick={toggleSelectMode}/>
					<ToolbarIcon type={"filter"} iconClick={() => openFilterModal(true)}/>
					{sortedRowKeys && <span className="results">{sortedRowKeys.length} resultaten</span>}
				</div>
				<div className="toolbarPart mid">
					<ConversionSwitch getter={conversionMode} setter={setConversionMode}/>
				</div>
				<div className="toolbarPart rightSide">
					{/* <CSVLink data={data} headers={headers}> */}
					<ToolbarIcon type={"export"} iconClick={exportToCSV} button={selectMode ? "Selectie" : "Scherm"}/>
					<ToolbarIcon type={"export"} iconClick={zanExport} button="ZAN"/>
					<ToolbarIcon type={downloadAll ? "spinner" : "export"} iconClick={exportAll} button="Database"/>
					{downloadAll && <Downloader terminate={() => setDownloadAll(false)} download={exportAllToCSV}/>}


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
				left:0;
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
				height: inherit;
				grid-column: midLeft / midRight;
				display: flex;
				justify-content: center;
			}
			.rightSide{
				grid-column: midRight / end;
				display: flex;
				justify-content: flex-end;
			}
			.results {
				font-size: small;
			}
    `}</style>
		</>
	);
};

export default Toolbar;
