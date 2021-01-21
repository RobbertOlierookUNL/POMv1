import React, {useRef, useEffect} from "react";
// import handleViewport from "react-in-viewport";
import {useInViewport} from "react-in-viewport";


import { allOptionsWithData } from "../../config/viewOptions";
import { useTheme } from "../../lib/custom-hooks";
import Cell from "./cell";
import Expand from "./expand";
import useGlobal from "../store";


const Row = ({id, order, totalRows, meta, rowData, keysForTableCols, additionalColKeys,
	// inViewport, forwardedRef,
	onEnterViewport
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
	const rowRef = useRef(null);
	const {inViewport} = useInViewport(rowRef, undefined, { disconnectOnLeave: true }, {onEnterViewport});

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





	return (
		<tr
			className={`gridded-row ${active === id ? "active" : ""}`}
			onDoubleClick={handleClick}
			ref={rowRef}>
			<>
				{selectMode &&
				<td>
					<input type="checkbox" id={id} name={id}/>
				</td>}
				{keysForTableCols.map((key, i) =>
					<Cell
						cellData={rowData === false ? false : rowData[key]}
						colName={key}
						width={meta[key].widthweight || allOptionsWithData.widthweight.default}
						key={i}
						rowId={id}
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
      `}</style>
		</tr>
	);
};

// const Row = handleViewport(PreRow, undefined, {disconnectOnLeave: true});


export default Row;
