import React from "react";
import moment from "moment";
import useGlobal from "../components/store";

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

const filter = (data, [filter, level, reference], values) => {
	const filteredData = [];
	for (var entry of data) {
		if (level === "batchlevel" && entry.addedProps?.merged) {
			let pushEntry = false;
			for (var batchEntry of entry.addedProps.mergedFrom) {
				const valueGettingFilterOn = batchEntry[reference];
				switch (filter) {
				case "searchField":
					for (const value of values) {
						if (valueGettingFilterOn.toUpperCase?.().includes?.(value.toUpperCase?.())) {
							pushEntry = true;
						}
					}
					break;
				case "dropdown":
					for (const value of values) {
						if (valueGettingFilterOn === value) {
							pushEntry = true;
						}
					}
					break;
				case "range":
					for (const value of values) {
						if (value[0] <= valueGettingFilterOn && valueGettingFilterOn <= value[1] ) {
							pushEntry = true;
						}
					}
					break;
				case "datePicker":
					for (const value of values) {
						if (value.from && value.to) {
							if (valueGettingFilterOn.isBetween?.(value.from, value.to)) {
						 pushEntry = true;
					 }
						} else if (value.from) {
							if (valueGettingFilterOn.isAfter?.(value.from)) {
								pushEntry = true;
							}
						} else if (value.to) {
							if (valueGettingFilterOn.isBefore?.(value.to)) {
								pushEntry = true;
							}
						} else {
							pushEntry = true;
						}
					}
					break;
				default:
					pushEntry = true;
				}
				if (pushEntry) {
					filteredData.push(entry);
					break;
				}
			}
		} else {
			const valueGettingFilterOn = entry[reference];
			const arrayMode = Array.isArray(valueGettingFilterOn);

			switch (filter) {
			case "searchField":
				for (const value of values) {
					if (arrayMode) {
						for (const vgfo of valueGettingFilterOn) {
							if (vgfo.toUpperCase?.().includes?.(value.toUpperCase?.())) {
								filteredData.push(entry);
								break;
							}
						}
					} else {
						if (valueGettingFilterOn.toUpperCase?.().includes?.(value.toUpperCase?.())) {
							filteredData.push(entry);
						}
					}
				}
				break;
			case "dropdown":
				for (const value of values) {
					if (arrayMode) {
						for (const vgfo of valueGettingFilterOn) {
							if (vgfo === value) {
								filteredData.push(entry);
								break;
							}
						}
					} else {
						if (valueGettingFilterOn === value) {
							filteredData.push(entry);
						}
					}
				}
				break;
			case "range":
				for (const value of values) {
					if (arrayMode) {
						for (const vgfo of valueGettingFilterOn) {
							if (value[0] <= vgfo && vgfo <= value[1] ) {
								filteredData.push(entry);
								break;
							}
						}
					} else {
						if (value[0] <= valueGettingFilterOn && valueGettingFilterOn <= value[1] ) {
							filteredData.push(entry);
						}
					}
				}
				break;
			case "datePicker":
				for (const value of values) {
					if (arrayMode) {
						for (const vgfo of valueGettingFilterOn) {
							if (value.from && value.to) {
								vgfo.isBetween?.(value.from, value.to) && filteredData.push(entry);
							} else if (value.from) {
								vgfo.isAfter?.(value.from) && filteredData.push(entry);
							} else if (value.to) {
								vgfo.isBefore?.(value.to) && filteredData.push(entry);
							} else {
								filteredData.push(entry);
							}
						}
					} else {
						if (value.from && value.to) {
							valueGettingFilterOn.isBetween?.(value.from, value.to) && filteredData.push(entry);
						} else if (value.from) {
							valueGettingFilterOn.isAfter?.(value.from) && filteredData.push(entry);
						} else if (value.to) {
							valueGettingFilterOn.isBefore?.(value.to) && filteredData.push(entry);
						} else {
							filteredData.push(entry);
						}
					}
				}
				break;
			default:
				filteredData.push(entry);

			}
		}
	}
	return filteredData;
};

export const useFilterableData = (dataSet, meta) => {
	const [arrayOfFilters] = useGlobal(state => state.arrayOfFilters);
	const [silentFilters] = useGlobal(state => state.silentFilters);

	// if (!arrayOfFilters.length) {
	// 	return dataSet;
	// }
	const mergedFilters = React.useMemo(() => {
		const allFilters = silentFilters.concat(arrayOfFilters);
		return allFilters.reduce((acc, obj) => {
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
	}, [arrayOfFilters, silentFilters]);
	console.log({mergedFilters});

	const filteredData =  React.useMemo(() => {
		let iteratingData = [...dataSet];
		for (var filterKey in mergedFilters) {
			iteratingData = filter(iteratingData, filterKey.split(",,>"), mergedFilters[filterKey] );
		}
		return iteratingData;
	}, [mergedFilters, dataSet]);
	return filteredData;
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

const countDecimals = function (value) {
	if(Math.floor(value) === value) return 0;
	return value.toString().split(".")[1]?.length || 0;
};

const getRangeFilterParameters = (theNumber, myMeta, key, parameters, level) => {
	if (myMeta[key]?.filtertype === "range"
			||
			myMeta[key]?.filtertype === "inherit"
	) {
		var numberOfDecimals = countDecimals(theNumber);
		if (!parameters[key]) {
			parameters[key] = {};
		}
		if(!parameters[key][level]) {
			parameters[key][level] = {};
		}
		if (!parameters[key][level].ggd || parameters[key][level].ggd < numberOfDecimals) {
			parameters[key][level].ggd = numberOfDecimals;
		}
		if (!parameters[key][level].max || parameters[key][level].max < theNumber) {
			parameters[key][level].max = theNumber;
		}
		if (!parameters[key][level].min || parameters[key][level].min > theNumber) {
			parameters[key][level].min = theNumber;
		}
	}
	return parameters;
};

const getDropDownParameters = (processedObj, myMeta, key, parameters, level, arrayMode = false) => {
	if (myMeta[key]?.filtertype === "dropdown") {
		if (!parameters[key]) {
			parameters[key] = {};
		}
		if(!parameters[key][level]) {
			parameters[key][level] = {};
		}
		const value = arrayMode ? processedObj : processedObj[key];

		if (parameters[key][level].options) {
			!parameters[key][level].options.includes(value) && parameters[key][level].options.push(value);
		} else {
			parameters[key][level].options = [value];
		}
	}
	return parameters;
};

const mapOverData = (allKeys, myMeta, obj, parameters, level) => {
	const processedObj = {};
	allKeys.map(key => {
		if ((level === "toplevel" && Array.isArray(obj[key]))) {
			for (var value of obj[key]) {
				parameters = getDropDownParameters(value, myMeta, key, parameters, level, true);
			}
			processedObj[key] = obj[key];
		} else {
			switch (myMeta[key]?.valuetype) {
			case "number":
				var theNumber = parseFloat(obj[key]) || 0;
				processedObj[key] = theNumber;
				/* haal de rangefilter parameters op */
				parameters = getRangeFilterParameters(theNumber, myMeta, key, parameters, level);
				break;
			case "text":
				processedObj[key] = String(obj[key]) || "";
				break;
			case "date":
				processedObj[key] = moment(obj[key]).isValid() ? moment(obj[key]) : obj[key];
				break;
			default:
				processedObj[key] = obj[key];
			}
			/* haal de dropdown parameters op */
			parameters = getDropDownParameters(processedObj, myMeta, key, parameters, level);
		}
	});
	return {processedObj, updatedParameters: parameters};
};

export const prepareData = (myData, myMeta) => {
	//wordt gevuld met filter parameters
	let parameters = {};
	//alle kolomnamen
	const allKeys = Object.keys(myMeta);
	//zoek de eerste kolom waarbij de metadata aangeeft het een `mergeBy` kolom is
	const propToMergeBy = allKeys.find(key => myMeta[key].merge === "mergeBy") || false;
	//als er een propToMergeBy gevonden is, is mergeMode true, anders false
	const mergeMode = !!propToMergeBy;

	/*
	* Wanneer er niet gemerged wordt:
	*/
	if (!mergeMode) {
		//lege array, wordt gevuld met de bewerkte data
		const processedData = [];
		// itereer over alle entries van de data
		myData.forEach(obj => {
			// geef alle kolommen, de metadata, de entry en het huidige parameter object mee
			// geeft de processed entry terug, en een nieuwe versie van het parameter object
			// (filterparameters zijn hier op toplevel,
			// maar gezien er niet gemerged wordt, is er ook geen batchlevel)
			const {processedObj, updatedParameters} = mapOverData(allKeys, myMeta, obj, parameters, "toplevel");
			//update het paramater object
			parameters = updatedParameters;
			//voeg de bewerkte entry toe aan de processedData
			processedData.push(processedObj);
		});
		//geef alle data en uiteindelijke filterparameter object terug
		return {processedData, parameters};
	}

	/*
	* Wanneer er wel gemerged wordt:
	*/
	//Hervorm de data naar object, met de waarde van de propToMergeBy als key
	//en een array van de entries als value
	const objectOfArraysByMergedProp = myData.reduce(function (acc, obj) {
		//pak de waarde van de kolom waar we op mergen per entry
		let mergeProp = obj[propToMergeBy];
		//Zit deze waarde nog niet in ons nieuwe object, maak hem dan aan
		if (!acc[mergeProp]) {
			acc[mergeProp] = [];
		}
		// geef alle kolommen, de metadata, de entry en het huidige parameter object mee
		// geeft de processed entry terug, en een nieuwe versie van het parameter object
		// (filterparameters zijn hier op batchlevel)
		const {processedObj, updatedParameters} = mapOverData(allKeys, myMeta, obj, parameters, "batchlevel");
		//update het paramater object
		parameters = updatedParameters;
		//voeg de bewerkte entry toe aan het nieuwe object onder de key met de waarde van de mergepop
		acc[mergeProp].push(processedObj);
		//return de accumaltive van deze iteratie
		return acc;
		//twee argument hier is waar de reduce functie mee start: een leeg object
	}, {});
	/* Volgende stap */
	//Lege array die we vullen met de data wanneer het daadwerkelijk gemerged is.
	const mergedData = [];
	//Per key-value pair van ons nieuwe object
	// (pakt dus alle batches die gemerged moeten worden)
	for (const mergedProp in objectOfArraysByMergedProp) {
		// security dingetje om te zorgen dat de for in loop een juiste waarde heeft gepakt
		if (Object.prototype.hasOwnProperty.call(objectOfArraysByMergedProp, mergedProp)) {
			//Waneer het totaal aantal batches per mergeprop 1 is, hoeft er niet gemerged te worden
			if (objectOfArraysByMergedProp[mergedProp].length === 1) {
				const onlyChild = objectOfArraysByMergedProp[mergedProp][0];
				//voeg een prop 'addedprops' toe dat er niet gemerged is
				onlyChild["addedProps"] = {...onlyChild["addedProps"], merged: false};
				//geef de toplevel filter parameters mee
				const {updatedParameters} = mapOverData(allKeys, myMeta, onlyChild, parameters, "toplevel");
				parameters = updatedParameters;
				//voeg de entry toe aan onze nieuwe array
				mergedData.push(onlyChild);
				// wanneer er meerdere batches zijn, moet er wel gemerged worden
			} else {
				//maak een nieuwe entry waar de gemergede waardes in komen
				const internalMerge = objectOfArraysByMergedProp[mergedProp].reduce(function (acc, obj, idx){
					//bij de eerste iteratie vullen we ons nieuwe object met de eerste batch
					if (idx === 0) {
						// we voegen toe in de 'addedprops', dat er gemerged is, en dat deze batch erin zit
						acc = {...obj, addedProps: {...obj.addedProps, merged: true, mergedFrom: [obj]}};
						// deze iteratie is klaar
						return acc;
					}
					//bij alle andere iteraties gaan we mergen met wat we tot dan toe in ons nieuwe object hebben
					// we gebruiken 'allKeys' zodat we alleen de reguliere kolommen hebbben,
					// en niet bijvoorbeedl 'addedProps' meenemen.
					allKeys.forEach(key => {
						//per kolom checken we bij de meta data hoe er gemerged moeten worden
						//is dit niet gespecificeerd? dan gebruik we de defaultvalue
						switch (myMeta[key]?.merge ?
							myMeta[key].merge :
							allOptionsWithData.merge.default){
						case "getOne" || "mergeBy":
							//Pak de eerste waarde die niet falsey is.
							//Als we er al een hebben stoppen we voortijdig
							if (acc[key]) break;
							if (obj[key]) acc[key] = obj[key];
							break;
						case "add":
							//Forceer de waarde naar een float, of maak het anders 0
							//Tel het bijelkaar op
							acc[key] = (
								(parseFloat(acc[key]) || 0)
								+ (parseFloat(obj[key]) || 0)
							);
							break;
						case "firstDate":
							//Check of de waarde een datum is
							//Vergelijk de data en pak de eerste
							//Is het geen datum? doe dan niks.
							acc[key] = moment.isMoment(acc[key])
								?
								(acc[key].isBefore(obj[key]) ? acc[key] : obj[key])
								:
								acc[key];
							break;
						case "displayMulti":
							//Zijn er verschillende waardes?
							//Maak er een array van, begin met de hoeveelheid aan zelfde waardes (de huidige index) toevoegen aan de aary
							if (acc[key] !== obj[key]) {
								if (!Array.isArray(acc[key])) {
									const tempArr = [];
									for (let i = 0; i < idx; i++) {
										tempArr.push(acc[key]);
									}
									acc[key] = tempArr;
									// acc[key] = [acc[key]];
								}
								acc[key].push(obj[key]);
								break;
								//Bij een enkele waarde laten we deze gewoon zien
							} else {
								if (obj[key]) acc[key] = obj[key];
							}
							break;
						case "count":
							//Tel hoe vaak we itereren
							acc[key] = idx + 1;
							break;
						default:
							// De default is het zelfde als getOne, als fallback
							if (acc[key]) break;
							if (obj[key]) acc[key] = obj[key];
							break;
						}
					});
					//Na iedere iteratie voegen we de onaangeraakte batch toe in onze mergedFrom array
					acc.addedProps.mergedFrom.push(obj);
					return acc;
				}, {});
				//Map nog een keer over het resultaat om de toplevel parameters te krijgen
				const {updatedParameters} = mapOverData(allKeys, myMeta, internalMerge, parameters, "toplevel");
				parameters = updatedParameters;
				mergedData.push(internalMerge);

			}
		}
	}
	return {processedData: mergedData, parameters};

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
		mergeRefs, isNumeric, prepareData
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
