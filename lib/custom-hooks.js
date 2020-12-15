import React from "react";

function isNumeric(str) {
	if (typeof str != "string") return false;
	return !isNaN(str) &&
       !isNaN(parseFloat(str));
}

export const useSortableData = (dataSet, config = null) => {
	const [sortConfig, setSortConfig] = React.useState(config);

	const sortedItems = React.useMemo(() => {
		if (Object.keys(dataSet)[0]) {
			let sortableItems = [...Object.keys(dataSet)];
			if (sortConfig !== null) {
				sortableItems.sort((a, b) => {
					const usableA = isNumeric(dataSet[a][sortConfig.key]) ? parseInt(dataSet[a][sortConfig.key]) : dataSet[a][sortConfig.key];
					const usableB = isNumeric(dataSet[b][sortConfig.key]) ? parseInt(dataSet[b][sortConfig.key]) : dataSet[b][sortConfig.key];
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

	const requestSort = key => {
		let direction = "ascending";
		if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	return { keys: sortedItems, requestSort, sortConfig };
};
