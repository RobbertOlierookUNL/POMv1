

import moment from "moment-timezone";

import {
	ZAN,
	cePerHe,
	dataTable_pk,
	salesExport
} from "../../../config/globalvariables";





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

const cellGetter = (meta, keys, conversionMode) => entry => {
	const formattedEntry = {};
	const conversionRate = conversionMode === "CE" ? entry[cePerHe] : 1;
	for (const key of keys) {
		let convertedCell;
		if (meta[key].convertable === "multiply") {
				 convertedCell = entry[key] * conversionRate;
		}
		if (meta[key].convertable === "divide") {
				 convertedCell = entry[key ]/ conversionRate;
		}
		const label = meta[key].hovername || meta[key].title || key;
		formattedEntry[label] =  convertedCell ||
		(meta[key].valuetype === "date"
			?
			moment(entry[key]).format("DD/MM/YYYY")
			:
			(!entry[key] || entry[key] === "0")
				?
				""
				:
				Array.isArray(entry[key])
					?
					entry[key].join(" | ")
					:
					entry[key]
		);
	}
	return formattedEntry;
};

const zanGetter = () => entry => {
	const formattedEntry = {};

	for (const zanEntry of ZAN) {
		const {label, col, divide, multiply, round, date} = zanEntry;
		let value = entry[col];
		if (date) {
			value = moment(value).toDate();
		}
		if (divide) {
			value = value / entry[divide];
		}
		if (multiply) {
			value = value * entry[multiply];
		}
		if (round) {
			const factor = Math.pow(10, round);
			value = Math.round((value + Number.EPSILON) * factor) / factor;
		}
		formattedEntry[label] = value;
	}
	return formattedEntry;
};

const saleGetter = () => entry => {
	const formattedEntry = {};

	for (const sEntry of salesExport) {
		const {label, col, divide, multiply, round, date} = sEntry;
		let value = entry[col];
		if (date) {
			value = moment(value).toDate();
		}
		if (divide) {
			value = value / entry[divide];
		}
		if (multiply) {
			value = value * entry[multiply];
		}
		if (round) {
			const factor = Math.pow(10, round);
			value = Math.round((value + Number.EPSILON) * factor) / factor;
		}
		formattedEntry[label] = value;
	}
	return formattedEntry;
};


export const getLevels =  (meta, keys, selectMode, checked, data, sortedRowKeys, mode = false, conversionMode) => {
	const getRightCells = mode === "ZAN" ? zanGetter() : mode === "Sales" ? saleGetter() : cellGetter(meta, keys, conversionMode);
	const batchLevel = [];
	let topLevel;

	if (selectMode) {
		const checkedPks = [];
		for (const pk in checked) {
			if (checked[pk]) {
				let thisPk = pk.split(",");
				if (thisPk.length === 1) {
					thisPk = pk;
				}
				checkedPks.push(thisPk);
			}
		}
		topLevel = checkedPks.map(pk => {
			const entry = data.find(el => equal(pk, el[dataTable_pk]));
			const formattedEntry = getRightCells(entry);
			if (entry.addedProps?.merged && entry.addedProps?.mergedFrom) {
				for (const subEntry of entry.addedProps.mergedFrom) {
					const formattedMergedEntry = getRightCells(subEntry);
					batchLevel.push(formattedMergedEntry);
				}
			} else {
				batchLevel.push(formattedEntry);
			}
			return formattedEntry;
		});

	} else {
		topLevel = sortedRowKeys.map(([, idx]) => {
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
	}

	return {topLevel, batchLevel};
};
