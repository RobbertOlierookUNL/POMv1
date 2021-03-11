import { mutate } from "swr";
import React from "react";
import moment from "moment-timezone";

import { allOptionsWithData } from "../config/viewOptions";
import { dataTable_pk } from "../config/globalvariables";
import { useEntries, useUserSpecificEntries, useView } from "./swr-hooks";
import {
	useFilterableData,
	useSortableData,
	useToolkit,
	useWebWorker
} from "./custom-hooks";
import useGlobal from "../components/store";



const updateUser = async (id, col, val) => {
	try {

		const res = await fetch("/api/user/edit-user", {
			method: "PATCH",
			body: JSON.stringify({
				id,
				col,
				val,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		});
		const json = await res.json();
		if (!res.ok) throw Error(json.message);
	} catch (e) {
		throw Error(e.message);
	}
};

export const useDataForView = (view, initialViewMeta, exView, initialExtendedView, silentFilters, user, conversionMode) => {
	const {userId, totalLogins, allLogins, firstName, lastName} = user || {};
	const [extendedView, setExtendedView] = React.useState(exView);
	const {data: preMeta} = useView(view, initialViewMeta);
	const {data: extendedMeta} = useView(extendedView || view, initialExtendedView || initialViewMeta);
	const [, setSchema] = useGlobal(
		() => null,
		actions => actions.setSchema
	);

	// React.useEffect(() => {

	// });


	React.useEffect(() => {
	  if (userId && (totalLogins || (totalLogins === 0))) {
			const rightNow = moment(new Date()).tz("Europe/Amsterdam").format();
	  	updateUser(userId, "lastLogin", rightNow);
			updateUser(userId, "totalLogins", (totalLogins || 0) + 1);
			const parsedAll = JSON.parse(allLogins || "[]");
			parsedAll.push(rightNow);
			updateUser(userId, "allLogins", JSON.stringify(parsedAll));
	  }
	}, [userId]);

	// const [filterParameters, setFilterParameters] = React.useState({});
	// const [data, setData] = React.useState([]);


	const {meta, keys, allKeys} = React.useMemo(() => {
		const {view_name, created_at, updated_at, config, ..._meta} = preMeta;
		const parsedConfig = JSON.parse(config || null);
		if (config) {
			if (parsedConfig.extendable && parsedConfig.extend && extendedView !== parsedConfig.extend) {
				setExtendedView(parsedConfig.extend);
			}
		}
		const {view_nameX, created_atX, updated_atX, configX, ..._metaX} = extendedMeta || {};
  	const notUsed = {};
  	notUsed.variables = {view_name, created_at, updated_at, view_nameX, created_atX, updated_atX, configX};
		// setSchema(parsedConfig?.theme || 10);
  	const cols = Object.keys(_meta);
  	const meta = {};
  	const keys = {
  		compact: [],
  		expanded: [],
			hidden: [],
  	};
  	cols.map((col, i) => {
			if (!_metaX) {
				meta[col] = _meta[col] ? JSON.parse(_meta[col]) : {};
			} else {
				const parsedMeta = JSON.parse(_meta[col]);
				const parsedMetaX = JSON.parse(_metaX[col]);

				meta[col] = {};
				for (const option in allOptionsWithData) {
					meta[col][option] = allOptionsWithData[option].extendable
						? parsedMetaX?.[option] || allOptionsWithData[option].default
						: parsedMeta?.[option] || allOptionsWithData[option].default;
				}
			}
  		if (meta[col].display === "compact") {
  			keys.compact.push(cols[i]);
  		} else if (meta[col].display === "expanded") {
  			keys.expanded.push(cols[i]);
  		} else if (meta[col].display === "hidden" || meta[col].hardcoded) {
  			keys.hidden.push(cols[i]);
  		}

  	});
  	const onIndex = (a, b) => (
  		(meta[a].indexweight || allOptionsWithData.widthweight.default) - (meta[b].indexweight || allOptionsWithData.widthweight.default)
  	);
  	keys.compact.sort(onIndex);
  	keys.expanded.sort(onIndex);
		const allKeys = Object.values(keys).flat();

		return {meta, keys, allKeys};
	}, [preMeta, extendedMeta]);
	const {data: preData, isLoading} = useUserSpecificEntries(allKeys, silentFilters);


	React.useEffect(() => {
		const { config } = preMeta;
		const parsedConfig = JSON.parse(config || null);
		setSchema(parsedConfig?.theme || 10);
	}, [preMeta]);

	// const {processedData: data, parameters: filterParameters} = React.useMemo(() => {
	// 	if (!isLoading)
	// 	{
	// 		return prepareData(preData, meta);
	// 	}
	// 	return {processedData: [], parameters: {}};
	// }, [preData, meta, isLoading]);
	const [{data, filterParameters}, donePreparing] = useWebWorker("../preparedata.worker.js", true, {isLoading, preData, meta, allOptionsWithData, allKeys}, {data: [], filterParameters: {}});


	const [filteredData] = useFilterableData(data, meta, donePreparing, conversionMode);
	const { keys: sortedKeys, requestSort, sortConfig } = useSortableData(filteredData,
		{
			key: keys.compact[0],
			direction: "ascending",
			type: keys.compact[0]?.valuetype || allOptionsWithData.valuetype.default,
			mode: "HE",
		},
		true,
		meta
	);

	const updateEntry = async (pk, col, val, withUser = true) => {
		for (const entry of preData) {
			if (entry[dataTable_pk] === pk) entry[col] = val;
			break;
		}
		mutate("/api/data/get-entries", preData, false);
		try {

			const res = await fetch("/api/data/edit-entry", {
				method: "PATCH",
				body: JSON.stringify({
					id: pk,
					col,
					val,
					usr: withUser ? `${firstName} ${lastName}` : null,
					now: withUser ? moment(new Date()).tz("Europe/Amsterdam").format() : null

				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			});

			const json = await res.json();
			if (!res.ok) throw Error(json.message);

		} catch (e) {
			throw Error(e.message);
		}
		mutate("/api/data/get-entries");
	};
	console.log({filteredData: filteredData || data || [], meta, keys, hasLoaded: donePreparing && !isLoading, filterParameters, sortedKeys, requestSort, sortConfig, updateEntry});
	return {filteredData: filteredData || data || [], meta, keys, hasLoaded: donePreparing && !isLoading, filterParameters, sortedKeys, requestSort, sortConfig, updateEntry};

};
