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

onmessage = function(e) {
	const {dataSet, mergedFilters, done} = e.data;
	console.log({dataSet, mergedFilters});
	if (Array.isArray(dataSet) && done) {
		let iteratingData = [...dataSet];
  	for (var filterKey in mergedFilters) {
  		iteratingData = filter(iteratingData, filterKey.split(",,>"), mergedFilters[filterKey] );
  	}
		console.log({iteratingData});
  	postMessage({res: iteratingData});
	}
};
