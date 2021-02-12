import React, { useRef, useEffect } from "react";

import { allOptionsWithData } from "../../config/viewOptions";
import { dataTable_pk } from "../../config/globalvariables";
import { useTheme } from "../../lib/custom-hooks";
import Cell from "./cell";
import CheckBox from "../checkbox";
import Expand from "./expand";
import useGlobal from "../store";
import useInViewport from "../../lib/forked-useInViewport";




const Row = ({id, order, totalRows, meta, rowData, keysForTableCols, additionalColKeys,
	// inViewport, forwardedRef,
	onEnterViewport, updateEntry
}) => {
	const [active, setActive] = useGlobal(
		state => state.active,
		actions => actions.setActive
	);
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
	const {inViewport, getNode} = useInViewport({onEnterViewport}, undefined, { disconnectOnLeave: true });

	const handleClick = (event) => {
		if (!expandRef.current.contains(event.target)) {
			active === id ?
				setActive(false)
				: setActive(id);
		}
	};

	useEffect(() => {
		if (order === 4) {
			setTopInView(inViewport);
			return function cleanup () {
				totalRows < 10 ? setTopInView(true) : setTopInView(false);
			};
		}
	}, [inViewport, order, totalRows]);

	// useEffect(() => () => stopObserver(), []);



	return (
		<tr
			className={`gridded-row ${active === id ? "active" : ""}`}
			onDoubleClick={handleClick}
			ref={getNode}>
			<>
				{selectMode &&
				<td>
					<CheckBox id={id}/>
				</td>}
				{keysForTableCols.map((key, i) =>
					<Cell
						cellData={rowData === false ? false : rowData[key]}
						colName={key}
						width={meta[key].widthweight || allOptionsWithData.widthweight.default}
						updateable={meta[key].updateable}
						dropdownUpdateOptions={meta[key].dropdownupdateoptions}
						allowInputFrom={meta[key].allowinputfrom || allOptionsWithData.allowinputfrom.default}
						valueType={meta[key].valuetype || allOptionsWithData.valuetype.default}
						key={i}
						rowId={id}
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
				)}
				<Expand
					additionalColKeys={additionalColKeys}
					ref={expandRef}
					meta={meta}
					rowData={rowData}
					active={active === id}
					mergedFrom={rowData
						&& rowData.addedProps
						&& rowData.addedProps.merged
						&& rowData.addedProps.mergedFrom}
					keysForMergedRows={keysForTableCols}
					updateEntry={updateEntry}
				/>
			</>
			<style jsx>{`
        tr:nth-child(even){background-color: ${gray_very_light.color};}
        tr:hover {background-color: ${gray_light.color};}
				.active, .active:hover {
					background-color: ${tertiary.color} !important;
					color: ${tertiary.text};
					font-weight: bold;
					font-size: 0.97em;
					border: none;
				}
				td {
					border: 1px solid ${gray_light.color};
          border-width: 0 1px 1px 0;
					padding: 0;
				}
      `}</style>
		</tr>
	);
};

// const Row = handleViewport(PreRow, undefined, {disconnectOnLeave: true});


export default Row;
