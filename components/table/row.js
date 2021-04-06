import React, { useRef, useEffect, useMemo, useState } from "react";

import { allOptionsWithData } from "../../config/viewOptions";
import {
	cePerHe,
	dataTable_pk,
	warningRGB
} from "../../config/globalvariables";
import { useGlobalUser } from "../../lib/store-hooks";
import Cell from "./cell";
import CheckBox from "../checkbox";
import DynamicCell from "./dynamiccell";
import EditableCell from "./editablecell";
import Expand from "./expand";
import Risk4SalesCell from "./risk4salescell";
import useInViewport from "../../lib/forked-useInViewport";







const Row = ({id, order, totalRows, meta, rowData, keysForTableCols, groupedAdditionalColKeys,
	// inViewport, forwardedRef,
	onEnterViewport, hasViewportListener, updateEntry, triggerUpdate, toggle, check, checked, theme, user, selectMode, setTopInView, setActive, thisRowActive, conversionMode, salesMode, country
}) => {
	// const [thisRowActive, setThisRowActive] = useState(active === id);
	const {tertiary, gray_light, gray_very_light, gray_dark} = theme;
	const expandRef = useRef(null);
	const [untouched, setUntouched] = useState(false);
	const {inViewport, getNode} = useInViewport({onEnterViewport}, {rootMargin: "300px"}, { disconnectOnLeave: true }, hasViewportListener);

	const handleClick = (event) => {
		if (!expandRef.current.contains(event.target)) {
			if (thisRowActive) {
				setActive(false);
			} else {
				setActive(id);
			}
		}
	};

	// useEffect(() => {
	//
	// 	if ((active === id) !== thisRowActive) {
	// 		setThisRowActive(active === id);
	// 	}
	// }, [active, id, thisRowActive]);

	useEffect(() => {
		if (order === 4) {
			setTopInView(inViewport);
			return function cleanup () {
				totalRows < 10 ? setTopInView(true) : setTopInView(false);
			};
		}
	}, [inViewport, order, totalRows]);

	const {operationsInputRights, salesInputRights} = user?.roll || {};

	const conversionRate = useMemo(() => {
		if (conversionMode === "CE" && rowData) {
			return rowData[cePerHe];
		}
 		return 1;
	}, [conversionMode, rowData]);


	return (
		<div
			className={`tr gridded-row ${thisRowActive ? "active" : ""} ${(selectMode && !check) ? "disabled" : ""}`}
			onDoubleClick={handleClick}
			ref={hasViewportListener ? getNode : undefined}>
			<>
				{selectMode &&
				<div className="td">
					<CheckBox id={id} toggle={toggle} check={check}/>
				</div>}
				{keysForTableCols.map((key, i) => {
					// if (key === "risk4sales") {
					// 	return (
					// 		<Risk4SalesCell
					// 			cellData={rowData === false ? false : rowData[key]}
					// 			rowData={rowData}
					// 			active={thisRowActive}
					// 			colName={key}
					// 			key={key}
					// 			theme={theme}
					// 			primaryKey={rowData && rowData[dataTable_pk]}
					// 			updateEntry={updateEntry}
					// 			hasBatches={rowData?.addedProps?.merged}
					// 		/>
					// 	);
					// }
					const updateable = meta[key].updateable;
					const allowInputFrom = meta[key].allowinputfrom || allOptionsWithData.allowinputfrom.default;
					const [elemOpLevel, elemSaLevel] = allowInputFrom.split(", ").map(el => parseInt(el[2]));
					const isEditable = (updateable === "withDropdown" || updateable === "withFreeInput")
							&& (
								(elemOpLevel && (operationsInputRights >= elemOpLevel))
								|| (elemSaLevel && (salesInputRights >= elemSaLevel))
							) && (!selectMode || check);
					const genericProps = {
						cellData: rowData === false ? false : rowData[key],
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
						active: thisRowActive,
						rowData,
						theme,
						conversionRate,
					};
					const dynamicProps = {
						triggers: meta[key].triggers,
						cellData: rowData === false ? false : rowData[key],
						colName: key,
						active: thisRowActive,
						primaryKey: rowData && rowData[dataTable_pk],
						updateEntry,
						triggerUpdate,
						rowData
					};

					const InputCell = (props) => (
						<EditableCell {...genericProps} {...props}
							checked={checked}
							updateable={meta[key].updateable}
							dropdownUpdateOptions={meta[key].dropdownupdateoptions}
							merge={meta[key].merge}
							primaryKey={rowData && rowData[dataTable_pk]}
							updateEntry={updateEntry}
							selectMode={selectMode}
							hasBatches={rowData?.addedProps?.merged}
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
				<Expand
					groupedAdditionalColKeys={groupedAdditionalColKeys}
					ref={expandRef}
					meta={meta}
					rowData={rowData}
					theme={theme}
					active={thisRowActive}
					mergedFrom={rowData
						&& rowData.addedProps
						&& rowData.addedProps.merged
						&& rowData.addedProps.mergedFrom}
					keysForMergedRows={keysForTableCols}
					updateEntry={updateEntry}
					triggerUpdate={triggerUpdate}
					operationsInputRights={operationsInputRights}
					salesInputRights={salesInputRights}
					rowInViewPort={inViewport}
					conversionRate={conversionRate}
					conversionMode={conversionMode}
					salesMode={salesMode}
					user={user}
					setUntouched={setUntouched}
				 	country={country}
				/>
			</>
			<style jsx>{`
        .tr:nth-child(even){
					background-color: ${gray_very_light.color};
					${untouched ? `background-color: rgba(${warningRGB}, 0.1);` : ""}

				}
        .tr:hover {background-color: ${gray_light.color};}
				.tr {
					min-height: 18px;
					/* content-visibility: auto; */
					${untouched ? `background-color: rgba(${warningRGB}, 0.1);` : ""}
				}
				.disabled {
					color: ${gray_dark.color} !important;
				}
				.active, .active:hover {
					background-color: ${tertiary.color} !important;
					color: ${tertiary.text};
					font-weight: bold;
					font-size: 0.97em;
					border: none;
				}
				.td {
					border: 1px solid ${gray_light.color};
          border-width: 0 1px 1px 0;
					padding: 0;
				}
      `}</style>
		</div>
	);
};

// const Row = handleViewport(PreRow, undefined, {disconnectOnLeave: true});


export default Row;
