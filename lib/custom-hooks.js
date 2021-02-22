import React from "react";
import moment from "moment";
import useGlobal from "../components/store";
// import {useWorker} from "@koale/useworker";

import { allOptionsWithData } from "../config/viewOptions";



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


export const useWebWorker = (fileName, params, defaultValue, updateDefaultValue = false) => {
	const [worker, setWorker] = React.useState();
	const [response, setResponse] = React.useState(defaultValue);
	React.useEffect(() => {
		if (updateDefaultValue) {
			setResponse(defaultValue);
		}
	}, [defaultValue, updateDefaultValue]);

	React.useEffect(() => {
		console.log({params, worker});
		const send = JSON.parse(JSON.stringify(params));
		worker && worker.postMessage(send);
	}, [...Object.keys(params).map(key => params[key]), worker]);

	React.useEffect(() => {
		const myWorker = new Worker(fileName);
		myWorker.onmessage = function(e) {
			e?.data?.res && setResponse(e.data.res);
		};
		setWorker(myWorker);
	}, []);

	return response;
};

export const useFilterableData = (dataSet, meta) => {
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


	return useWebWorker("../filterworker.js", {dataSet, mergedFilters}, dataSet, true);
};

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


export const useCheckBox = () => {
	const [checked, toggleCheckBox] = useGlobal(state => state.checked, actions => actions.toggleCheckBox);
	const check = id => !!checked[id];
	const toggle = id => () => {
		console.log({id, checked});
		toggleCheckBox(id, !check(id));
	};
	const init = (id) => {
		toggleCheckBox(id, check(id));
	};


	return {check, toggle, init};

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
