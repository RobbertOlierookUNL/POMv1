importScripts("//cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js");

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

const mapOverData = (allKeys, myMeta, obj, parameters, level, moment) => {
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


const prepareData = (myData, myMeta, moment, allOptionsWithData) => {
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
			const {processedObj, updatedParameters} = mapOverData(allKeys, myMeta, obj, parameters, "toplevel", moment);
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
		const {processedObj, updatedParameters} = mapOverData(allKeys, myMeta, obj, parameters, "batchlevel", moment);
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
				const {updatedParameters} = mapOverData(allKeys, myMeta, onlyChild, parameters, "toplevel", moment);
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
				const {updatedParameters} = mapOverData(allKeys, myMeta, internalMerge, parameters, "toplevel", moment);
				parameters = updatedParameters;
				mergedData.push(internalMerge);

			}
		}
	}
	return {data: mergedData, filterParameters: parameters};

};


onmessage = function(e) {
	const {isLoading, preData, meta, moment, allOptionsWithData} = e.data;
	console.log({isLoading, preData, meta, moment, allOptionsWithData});
  	if (!isLoading)
  	{
  		return {res: prepareData(preData, meta, moment, allOptionsWithData)};
  	}
};
