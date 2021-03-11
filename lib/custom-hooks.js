import React from "react";

import { allOptionsWithData } from "../config/viewOptions";
import { cePerHe, dataTable_pk } from "../config/globalvariables";
import useGlobal from "../components/store";





export function isNumeric(str) {
	if (typeof str != "string") return false;
	return !isNaN(str) &&
       !isNaN(parseFloat(str));
}

export const useHandleClickOutstide = (activeWhen, functionToExecute) => {
	const [handleClickOutside, setHandleClickOutside] = React.useState(false);
	const [headerRef] = useGlobal(
		state => state.headerRef,
	);
	const [shadowRef] = useGlobal(
		state => state.shadowRef,
	);
	React.useEffect(() => {
		if (handleClickOutside) {
			document.removeEventListener("click", handleClickOutside, true);
			setHandleClickOutside(false);
		}

		if(activeWhen && shadowRef && headerRef) {
			setHandleClickOutside(() => function (event) {
				if (
					event.target === shadowRef.current
				||
				event.target === headerRef.current
				){
					functionToExecute();
				}
			});
		}
		return () => {
			if(handleClickOutside) {
				document.removeEventListener("click", handleClickOutside, true);
			}
		};
	}, [shadowRef, headerRef, activeWhen]);

	React.useEffect(() => {
		if (handleClickOutside) {
			document.addEventListener("click", handleClickOutside, true);
		}
	}, [handleClickOutside]);

};


export const useWebWorker = (fileName, module, params, defaultValue, updateDefaultValue = false) => {
	const worker = React.useRef();
	const [response, setResponse] = React.useState(defaultValue);
	const [firstResponse, setFirstResponse] = React.useState(false);
	React.useEffect(() => {
		if (updateDefaultValue && !firstResponse) {
			setResponse(defaultValue);
		}
	}, [defaultValue, updateDefaultValue, firstResponse.current]);

	React.useEffect(() => {
		const send = JSON.parse(JSON.stringify(params));
		worker.current && worker.current.postMessage(send);
	}, [...Object.keys(params).map(key => params[key]), worker.current]);

	React.useEffect(() => {
		// new URL(fileName, import.meta.url)
		worker.current = new Worker(fileName)
		// ,
		// 	{
		// 		type: "module",
		// 	}
		// )
		;
		worker.current.onmessage = function(e) {
			e?.data?.res && setResponse(e.data.res);
		 	!firstResponse && setFirstResponse(true);
		};
		return () => {
			worker.current.terminate();
		};
	}, []);

	return [response, firstResponse];
};

export const useFilterableData = (dataSet, meta, done, conversionMode) => {
	const [arrayOfFilters] = useGlobal(state => state.arrayOfFilters);
	// if (!arrayOfFilters.length) {
	// 	return dataSet;
	// }
	const mergedFilters = React.useMemo(() => {
		return arrayOfFilters.reduce((acc, obj) => {
			const {filter, level, value, reference} = obj;
			const key = [filter, level, reference].join(",,>");
			if (!acc[key]) {
				acc[key] = [];
			}
			let valArr = [];
			if (meta[reference].filterseperation === "none" || filter !== "searchField") {
				valArr = [value];
			} else {
				if (!meta[reference].filterseperation || meta[reference].filterseperation === "spaces" ) {
					valArr = value.split(" ");
				} else {
					valArr = value.split(meta[reference].filterseperation);
				}
			}
			for (var val of valArr) {
				acc[key].push(val);
			}
			return acc;
		}, {});
	}, [arrayOfFilters]);


	return useWebWorker("../filter.worker.js", false, {dataSet, mergedFilters, done, meta, conversionMode}, dataSet, true);
};

function preProcess(someValue, config, meta, conversionRate) {
	let preProcessedValue = someValue;
	if (config.type === "text") {
		if (!preProcessedValue){
			preProcessedValue = "zzz";
		}
	}
	if (config.type === "number") {
		preProcessedValue = isNumeric(preProcessedValue) ? parseInt(preProcessedValue) : preProcessedValue;
		if (meta[config.key].convertable === "multiply") {
			preProcessedValue = preProcessedValue * conversionRate;
		} else if (meta[config.key].convertable ==="divide") {
			preProcessedValue = preProcessedValue / conversionRate;
		}
		if (!preProcessedValue && preProcessedValue !== 0){
			preProcessedValue = Infinity;
		}
	}
	return preProcessedValue;
}

export const useError = (pk, col) => {
	const [error, _setError] = React.useState(false);
	const [, addError] = useGlobal(() => null, actions => actions.addError);
	const [, removeError] = useGlobal(() => null, actions => actions.removeError);
	const pk_col = `${pk}_${col}`;
	const setError = bool => {
		_setError(bool);
		if (bool) {
			addError(pk_col);
		} else {
			removeError(pk_col);
		}
	};
	return [error, setError];
};

export const useSortableData = (dataSet, config = null, datatable = true, meta) => {
	const [sortConfig, setSortConfig] = React.useState(config);

	const sortedItems = React.useMemo(() => {
		if (dataSet && Object.keys(dataSet)[0]) {
			let sortableItems = [...Object.keys(dataSet)];
			console.log({meta, sortConfig});
			if (sortConfig !== null) {
				sortableItems.sort((a, b) => {
					const conversionRateA = sortConfig.mode === "CE" ? dataSet[a][cePerHe] : 1;
					const conversionRateB = sortConfig.mode === "CE" ? dataSet[b][cePerHe] : 1;
					const usableA = preProcess(dataSet[a][sortConfig.key], sortConfig, meta, conversionRateA);
					const usableB = preProcess(dataSet[b][sortConfig.key], sortConfig, meta, conversionRateB);

					if (usableA < usableB) {
						return sortConfig.direction === "ascending" ? -1 : 1;
					}
					if (usableA > usableB) {
						return sortConfig.direction === "ascending" ? 1 : -1;
					}
					return 0;
				});
			}
			return datatable ? sortableItems.map(item => [dataSet[item][dataTable_pk], item]) : (sortableItems || []);
		}
		return [];
	}, [dataSet, sortConfig]);

	const requestSort = (key, type, mode) => {
		let direction = "ascending";
		if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction, type, mode});
	};

	return { keys: sortedItems, requestSort, sortConfig };
};


export const useCheckBox = (sortedRowKeys) => {
	const [checked, toggleCheckBox] = useGlobal(state => state.checked, actions => actions.toggleCheckBox);
	const [, setLastChecked] = useGlobal(() => null, actions => actions.setLastChecked);
	const [, clearBoxes] = useGlobal(() => null, actions => actions.clearBoxes);
	const [{rangeFound, start, end, checked: rangeChecked}, checkRange] = useGlobal(state => state.rangeChecked, actions => actions.checkRange);
	const [, clearRange] = useGlobal(() => null, actions => actions.clearRange);

	const check = id => !!checked[id];
	const toggle = (id, order) => e => {
		if (e.shiftKey) {
			checkRange(order, id, !check(id));
		} else {
			toggleCheckBox(id, !check(id));
			setLastChecked(order, !check(id));
		}
	};
	const init = (id) => {
		toggleCheckBox(id, check(id));
	};
	React.useEffect(() => {
		if (sortedRowKeys) {
			clearBoxes();
			for (const [pk] of sortedRowKeys) {
				init(pk);
			}
		}
	}, [sortedRowKeys]);

	React.useEffect(() => {
		if (rangeFound) {
			let low;
			let high;
			if (start < end) {
				low = start;
				high = end;
			} else {
				low = end;
				high = start;
			}
			for (let i = low; i <= high; i++) {
				const [pk] = sortedRowKeys[i];
				toggleCheckBox(pk, rangeChecked);
			}
			clearRange();
		}
	}, [rangeFound, start, end, rangeChecked, sortedRowKeys]);


	return {check, toggle, checked};

};



export function useWindowSize() {
	// Initialize state with undefined width/height so server and client renders match
	// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
	const [windowSize, setWindowSize] = React.useState({
		width: undefined,
		height: undefined,
	});

	React.useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		// Add event listener
		window.addEventListener("resize", handleResize);

		// Call handler right away so state gets updated with initial window size
		handleResize();

		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []); // Empty array ensures that effect is only run on mount

	return windowSize;
}

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
		mergeRefs, isNumeric
	};
};

export const useColors = (...colors) => {
	const globalColors = [];
	colors.forEach(color => {
		const [globalColor] = useGlobal(
			state => state[color],
			() => null
		);
		globalColors.push(globalColor);
	});
	return globalColors;
};

export const useTheme = () => {
	const [
		primary,
		primary_overlay,
		primary_very_light,
		primary_light,
		primary_dark,
		gray,
		gray_light,
		gray_lighter,
		gray_very_light,
		gray_dark,
		secondary,
		tertiary,
		quadiary
	] = useColors(
		"primary",
		"primary_overlay",
		"primary_very_light",
		"primary_light",
		"primary_dark",
		"gray",
		"gray_light",
		"gray_lighter",
		"gray_very_light",
		"gray_dark",
		"secondary",
		"tertiary",
		"quadiary"
	);
	return {
		primary,
		primary_overlay,
		primary_very_light,
		primary_light,
		primary_dark,
		gray,
		gray_light,
		gray_lighter,
		gray_very_light,
		gray_dark,
		secondary,
		tertiary,
		quadiary
	};
};
