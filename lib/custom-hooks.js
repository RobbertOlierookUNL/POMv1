import React from "react";
import moment from "moment";

import { allOptionsWithData } from "../config/viewOptions";



export function isNumeric(str) {
	if (typeof str != "string") return false;
	return !isNaN(str) &&
       !isNaN(parseFloat(str));
}

function preProcess(someValue, config) {
	let preProcessedValue = someValue;
	if (config.type === "text") {
		if (!preProcessedValue){

			preProcessedValue = "zzz";
		}
	}
	if (config.type === "number") {
		preProcessedValue = isNumeric(preProcessedValue) ? parseInt(preProcessedValue) : preProcessedValue;
		if (!preProcessedValue && preProcessedValue !== 0){
			preProcessedValue = Infinity;
		}
	}
	return preProcessedValue;
}

export const useSortableData = (dataSet, config = null) => {
	const [sortConfig, setSortConfig] = React.useState(config);

	const sortedItems = React.useMemo(() => {
		if (Object.keys(dataSet)[0]) {
			let sortableItems = [...Object.keys(dataSet)];
			if (sortConfig !== null) {
				sortableItems.sort((a, b) => {
					const usableA = preProcess(dataSet[a][sortConfig.key], sortConfig);
					const usableB = preProcess(dataSet[b][sortConfig.key], sortConfig);

					if (usableA < usableB) {
						return sortConfig.direction === "ascending" ? -1 : 1;
					}
					if (usableA > usableB) {
						return sortConfig.direction === "ascending" ? 1 : -1;
					}
					return 0;
				});
			}
			return sortableItems;
		}
		return null;
	}, [dataSet, sortConfig]);

	const requestSort = (key, type) => {
		let direction = "ascending";
		if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction, type });
	};

	return { keys: sortedItems, requestSort, sortConfig };
};
export const mergeBy = (myData, myMeta, compact, expanded) => {
	if (!(myData && (myData !== []))) {
		return [];
	}
	const allKeys = compact.concat(expanded);
	const propToMergeBy = Object.keys(myMeta).find(key => myMeta[key].merge === "mergeBy") || false;
	const mergeMode = !!propToMergeBy;
	if (!mergeMode) {
		const strippedData = [];
		myData.forEach(obj => {
			const strippedObj = {};
			allKeys.map(key => {
				switch (myMeta[key].valuetype) {
				case "number":
					strippedObj[key] = parseFloat(obj[key]) || 0;
					break;
				case "text":
					strippedObj[key] = String(obj[key]) || "";
					break;
				case "date":
					strippedObj[key] = moment(obj[key]).isValid() ? moment(obj[key]) : obj[key];
					break;
				default:
					strippedObj[key] = obj[key];
				}
			});
			strippedData.push(strippedObj);
		});
		return strippedData;
	}
	const objectOfArraysByMergedProp = myData.reduce(function (acc, obj) {
		let mergeProp = obj[propToMergeBy];
		if (!acc[mergeProp]) {
			acc[mergeProp] = [];
		}
		const strippedObj = {};
		allKeys.map(key => {
			switch (myMeta[key].valuetype) {
			case "number":
				strippedObj[key] = parseFloat(obj[key]) || 0;
				break;
			case "text":
				strippedObj[key] = String(obj[key]) || "";
				break;
			case "date":
				strippedObj[key] = moment(obj[key]).isValid() ? moment(obj[key]) : obj[key];
				break;
			default:
				strippedObj[key] = obj[key];
			}
		});
		acc[mergeProp].push(strippedObj);
		return acc;
	}, {});
	const mergedData = [];
	for (const mergedProp in objectOfArraysByMergedProp) {
		if (Object.prototype.hasOwnProperty.call(objectOfArraysByMergedProp, mergedProp)) {
			if (objectOfArraysByMergedProp[mergedProp].length === 1) {
				const onlyChild = objectOfArraysByMergedProp[mergedProp][0];
				onlyChild["addedProps"] = {...onlyChild["addedProps"], merged: false};
				mergedData.push(onlyChild);
			} else {
				const internalMerge = objectOfArraysByMergedProp[mergedProp].reduce(function (acc, obj, idx){
					if (idx === 0) {
						acc = {...obj, addedProps: {...obj.addedProps, merged: true, mergedFrom: [obj]}};
						return acc;
					}
					allKeys.forEach(key => {
						switch (myMeta[key] && myMeta[key].merge ?
							myMeta[key].merge :
							allOptionsWithData.merge.default){
						case "getOne" || "mergeBy":
							if (acc[key]) break;
							if (obj[key]) acc[key] = obj[key];
							break;
						case "add":
							acc[key] = (
								(parseFloat(acc[key]) || 0)
								+ (parseFloat(obj[key]) || 0)
							);
							break;
						case "firstDate":
							acc[key] = moment.isMoment(acc[key])
								?
								(acc[key].isBefore(obj[key]) ? acc[key] : obj[key])
								:
								acc[key];
							break;
						default:
							if (acc[key]) break;
							if (obj[key]) acc[key] = obj[key];
							break;
						}
					});
					acc.addedProps.mergedFrom.push(obj);
					return acc;
				}, {});
				mergedData.push(internalMerge);
			}
		}
	}
	return mergedData;

};

export const mergeRefs = (...refs) => {
	const filteredRefs = refs.filter(Boolean);
	if (!filteredRefs.length) return null;
	if (filteredRefs.length === 0) return filteredRefs[0];
	return inst => {
		for (const ref of filteredRefs) {
			if (typeof ref === "function") {
				ref(inst);
			} else if (ref) {
				ref.current = inst;
			}
		}
	};
};

export const useToolkit = () => {

	// Array.prototype.groupBy = (property) => {
	// 	return this.reduce(function (acc, obj) {
	// 		let key = obj[property];
	// 		if (!acc[key]) {
	// 			acc[key] = [];
	// 		}
	// 		acc[key].push(obj);
	// 		return acc;
	// 	}, {});
	// };


	return {
		mergeRefs, isNumeric, mergeBy
	};
};
