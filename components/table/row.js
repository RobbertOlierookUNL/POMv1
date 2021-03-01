import React, { useRef, useEffect, useMemo } from "react";

import { allOptionsWithData } from "../../config/viewOptions";
import { dataTable_pk } from "../../config/globalvariables";
import { useGlobalUser } from "../../lib/store-hooks";
import Cell from "./cell";
import CheckBox from "../checkbox";
import EditableCell from "./editablecell";
import Expand from "./expand";
import useInViewport from "../../lib/forked-useInViewport";



const Row = ({id, order, totalRows, meta, rowData, keysForTableCols, groupedAdditionalColKeys,
	// inViewport, forwardedRef,
	onEnterViewport, hasViewportListener, updateEntry, triggerUpdate, toggle, check, theme, selectMode, setTopInView, setActive, thisRowActive,
}) => {
	// const [thisRowActive, setThisRowActive] = useState(active === id);
	const {tertiary, gray_light, gray_very_light} = theme;
	const expandRef = useRef(null);
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

	// useEffect(() => () => stopObserver(), []);

	// console.log({opLevel, saLevel});
	const user = useGlobalUser();
	const {operationsInputRights, salesInputRights} = user?.roll || {};


	return (
		<div
			className={`tr gridded-row ${thisRowActive ? "active" : ""}`}
			onDoubleClick={handleClick}
			ref={hasViewportListener ? getNode : undefined}>
			<>
				{selectMode &&
				<div className="td">
					<CheckBox id={id} toggle={toggle} check={check}/>
				</div>}
				{keysForTableCols.map((key, i) => {
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
								cellData={rowData === false ? false : rowData[key]}
								rowData={rowData}
								colName={key}
								updateable={meta[key].updateable}
								dropdownUpdateOptions={meta[key].dropdownupdateoptions}
								valueType={meta[key].valuetype || allOptionsWithData.valuetype.default}
								triggers={meta[key].triggers}
								inRangeOf={meta[key].inrangeof}
								inEuro={meta[key].unit === "€"}
								key={i}
								theme={theme}
								rowInViewPort={inViewport}
								rowId={id}
								active={thisRowActive}
								primaryKey={rowData[dataTable_pk]}
								updateEntry={updateEntry}
								triggerUpdate={triggerUpdate}
								hasBatches={rowData?.addedProps?.merged}
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
						cellData={rowData === false ? false : rowData[key]}
						colName={key}
						rowData={rowData}
						valueType={meta[key].valuetype || allOptionsWithData.valuetype.default}
						inRangeOf={meta[key].inrangeof}
						dateErrorOn={meta[key].dateerroronweeks}
						dateWarnOn={meta[key].datewarnonweeks}
						key={i}
						rowInViewPort={inViewport}
						inEuro={meta[key].unit === "€"}
						theme={theme}
						active={thisRowActive}
						omit={
							(rowData
								&& rowData.addedProps
								&& !rowData.addedProps.merged
								&& meta[key].merge === "count")
						}
					/>;
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
				/>
			</>
			<style jsx>{`
        .tr:nth-child(even){background-color: ${gray_very_light.color};}
        .tr:hover {background-color: ${gray_light.color};}
				.tr {
					min-height: 18px;
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
