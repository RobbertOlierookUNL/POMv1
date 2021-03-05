function isNumeric(str) {
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

const sortItems = (dataSet, sortConfig) => {
	if (dataSet && Object.keys(dataSet)[0]) {
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
};

onmessage = function(e) {
	const {dataSet, sortConfig, done} = e.data;
	console.log({dataSet, sortConfig});
	if (Array.isArray(dataSet) && done) {
		const sortedItems = JSON.parse(JSON.stringify(sortItems(dataSet, sortConfig)));
  	postMessage({res: sortedItems});
	}
};
