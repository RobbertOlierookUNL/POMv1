import React, {useEffect} from "react";
import moment from "moment-timezone";


const DynamicCell = ({ChildCell, rowData, cellData, hasBatches, primaryKey, updateEntry, colName, triggers}) => {

	// const triggerUpdate = (pk, value = 0, hasBatches, colName, triggers, rowData) => {
	// 	if (triggers) {
	// 		const triggerArray = triggers.split(", ");
	// 		for (var trigger of triggerArray) {
	// 			const [conditionsAndcolToUpdate, math] = trigger.split(" = ");
	// 			const arr = conditionsAndcolToUpdate.split(" | ");
	// 			const colToUpdate = arr.length === 1 ? arr[0] : arr[1];
	// 			const conditions = arr.length === 1 ? [] : arr[0].split(", ");
	// 			let conditionsPassed = true;
	// 			for (const condition of conditions) {
	// 				if (value === condition) {
	// 					conditionsPassed = true;
	// 					break;
	// 				}
	// 				conditionsPassed = false;
	// 			}
	// 			if (conditionsPassed) {
	// 				let answer;
	// 				if (!hasBatches) {
	// 					answer = eval(math.replace(`$${colName}`, `${value}`).replaceAll("$", "rowData."));
	// 				} else {
	// 					for (const mergedFrom of rowData.addedProps.mergedFrom) {
	// 						if (pk === mergedFrom[dataTable_pk]) {
	// 							answer = eval(math.replace(`$${colName}`, `${value}`).replaceAll("$", "mergedFrom."));
	// 						}
	// 					}
	// 				}
	// 				const formattedColToUpdate = colToUpdate.replace("$", "");
	// 				const correctAnswer = !Number.isNaN(answer);
	// 				if ((formattedColToUpdate in rowData) && correctAnswer ) {
	// 					updateEntry(pk, formattedColToUpdate, answer);
	// 				}
	// 			}
	// 		}
	// 	}
	// };

	const cols = [];
	const words = triggers.split(" ");
	for (let word of words) {
		if (word.includes("$")) {
			// const colString = word.replace("$", "rowData.");
			// console.log({colString});
			cols.push(rowData?.[word.replace("$", "")]);
		}
	}
	let foundUndefined = false;
	for (let col of cols) {
		if (typeof col === "undefined") {
			foundUndefined = true;
		}
	}


	useEffect(() => {
		const now = () => moment(new Date()).tz("Europe/Amsterdam").format();

		if (colName === "risk4sales") {



			const arrFromTrigger = triggers.split(" | ");
			const math = arrFromTrigger.length === 1 ? arrFromTrigger[0] : arrFromTrigger[1];
			const conditions = arrFromTrigger.length === 1 ? "true" : arrFromTrigger[0];

			const conditionPassed = eval(conditions.replaceAll("$", "rowData."));
			const thisCellData = (cellData !== false && !foundUndefined && conditionPassed)
				?
				eval(math.replaceAll("$", "rowData."))
				: false;
			const correctAnswer = !Number.isNaN(thisCellData);
			if ((!hasBatches && !Array.isArray(primaryKey)) && (cellData !== false) && (thisCellData !== false) && (thisCellData !== cellData) && correctAnswer) {
				console.log("GOOOOOOOO", {thisCellData, cellData});
				updateEntry(primaryKey, colName, thisCellData, false);
			}
		}
	}, [cellData, ...cols]);

	return (
		<ChildCell/>
	);
};



export default DynamicCell;
