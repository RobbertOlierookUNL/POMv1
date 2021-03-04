import React, {useEffect, useMemo} from "react";

import {
	dataTable_pk,
	numberOfColumnsInExpandBlock
} from "../../config/globalvariables";
import { useCheckBox, useTheme } from "../../lib/custom-hooks";
import DummyRow from "./dummyrow";
import Row from "./row";
import useGlobal from "../store";











// const Row = React.lazy(() => import("./row"));





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



const TableBody = ({meta, data, keysForTableCols, hasLoaded, sortedRowKeys, additionalColKeys, parameters, updateParameters, shouldUpdateParameters, conversionMode, updateEntry, check, toggle, checked, selectMode, salesMode}) => {


	const fakedata = new Array(26).fill(".");
	const {minLoad, maxLoad} = parameters;



	const [active, setActive] = useGlobal(
		state => state.active,
		actions => actions.setActive
	);

	const [, setTopInView] = useGlobal(
		() => null,
		actions => actions.setTopInView
	);

	const theme = useTheme() || {};


	const groupedAKs = useMemo(() => {
		const grouped = [];
		const perGroup = Math.ceil(additionalColKeys.length / (salesMode ? numberOfColumnsInExpandBlock - 2 : numberOfColumnsInExpandBlock));
		for (let i = 0; i < additionalColKeys.length; i += perGroup) {
			grouped.push(additionalColKeys.slice(i, i+perGroup));
		}
		return grouped;
	}, [additionalColKeys, salesMode]);

	const triggerUpdate = (pk, value, hasBatches, colName, triggers, rowData) => {
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


	console.log({tablebody: {hasLoaded, sortedRowKeys, data, minLoad, maxLoad}});
	return (
		<>
			<div className="tablebody">
				{hasLoaded && sortedRowKeys ?
					<>
						{sortedRowKeys.map(([pk, row], i) => (
							minLoad <= i && i <= maxLoad &&
							<Row
								onEnterViewport={() => updateParameters(i)}
								hasViewportListener={shouldUpdateParameters(i) || i ===4}
								id={pk}
								order={i}
								totalRows={sortedRowKeys.length}
								rowData={data[row]}
								meta={meta}
								keysForTableCols={keysForTableCols}
								groupedAdditionalColKeys={groupedAKs}
								updateEntry={updateEntry}
								triggerUpdate={triggerUpdate}
								key={pk}
								check={check(pk, i)}
								toggle={toggle(pk, i)}
								checked={checked}
								theme={theme}
								selectMode={selectMode}
								setTopInView={setTopInView}
								setActive={setActive}
								thisRowActive={equal(active, pk)}
								conversionMode={conversionMode}
								salesMode={salesMode}
							/>
						))}
					</>
					 :
					hasLoaded ?
						<>
							<div>
								<div>
									Geen resultaat
								</div>
							</div>
						</>
						:
						<>
							{fakedata.map((row, i) => (
								<DummyRow
									meta={meta}
									keysForTableCols={keysForTableCols}
									theme={theme}
									key={i}/>
							))}
						</>
				}
			</div>
			<style jsx>{`
				.tablebody {
					display: grid;
					background-color: white;
				}
			`}</style>
		</>
	);
};


export default TableBody;
