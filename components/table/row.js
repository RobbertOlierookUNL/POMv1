import React, { useRef, useEffect, useMemo } from "react";

import { allOptionsWithData } from "../../config/viewOptions";
import { dataTable_pk } from "../../config/globalvariables";
import { useGlobalUser } from "../../lib/store-hooks";
import { useTheme } from "../../lib/custom-hooks";
import Cell from "./cell";
import CheckBox from "../checkbox";
import EditableCell from "./editablecell";
import Expand from "./expand";
import useGlobal from "../store";
import useInViewport from "../../lib/forked-useInViewport";


function equal(a, b) {
	if (a === b) return true;
	if (!(Array.isArray(a) || Array.isArray(b))) {
		return false;
	}
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	// If you don't care about the order of the elements inside
	// the array, you should sort both arrays here.
	// Please note that calling sort on an array will modify that array.
	// you might want to clone your array first.

	for (var i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}


const Row = ({id, order, totalRows, meta, rowData, keysForTableCols, additionalColKeys,
	// inViewport, forwardedRef,
	onEnterViewport, updateEntry, toggle, check, setExpandedHeight
}) => {
	// const [thisRowActive, setThisRowActive] = useState(active === id);
	const [active, setActive] = useGlobal(
		state => state.active,
		actions => actions.setActive
	);
	const thisRowActive = useMemo(() => equal(active, id), [active, id]);

	const [, setTopInView] = useGlobal(
		() => null,
		actions => actions.setTopInView
	);
	const [selectMode] = useGlobal(
		state => state.selectMode,
		() => null
	);
	const {
		gray_very_light,
		gray_light,
		tertiary
	} = useTheme();

	const expandRef = useRef(null);
	const {inViewport, getNode} = useInViewport({onEnterViewport}, {rootMargin: "300px"}, { disconnectOnLeave: true });

	const handleClick = (event) => {
		if (!expandRef.current.contains(event.target)) {
			if (thisRowActive) {
				setActive(false);
				setExpandedHeight({});
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
			ref={getNode}>
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
								rowInViewPort={inViewport}
								rowId={id}
								active={thisRowActive}
								primaryKey={rowData[dataTable_pk]}
								updateEntry={updateEntry}
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
						key={i}
						rowInViewPort={inViewport}
						inEuro={meta[key].unit === "€"}
						active={thisRowActive}
						valueType={meta[key].valuetype || allOptionsWithData.valuetype.default}
						omit={
							(rowData
								&& rowData.addedProps
								&& !rowData.addedProps.merged
								&& meta[key].merge === "count")
						}
					/>;
				})}
				<Expand
					additionalColKeys={additionalColKeys}
					ref={expandRef}
					meta={meta}
					rowData={rowData}
					active={thisRowActive}
					mergedFrom={rowData
						&& rowData.addedProps
						&& rowData.addedProps.merged
						&& rowData.addedProps.mergedFrom}
					keysForMergedRows={keysForTableCols}
					updateEntry={updateEntry}
					operationsInputRights={operationsInputRights}
					salesInputRights={salesInputRights}
					rowInViewPort={inViewport}
					orderId={order}
					setExpandedHeight={setExpandedHeight}
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
