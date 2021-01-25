import React from "react";

import { allOptionsWithData } from "../config/viewOptions";
import { useEntries, useView } from "./swr-hooks";
import { useFilterableData, useSortableData, useToolkit } from "./custom-hooks";


export const useMeta = (view, initialViewMeta) => {
	const {data: preMeta} = useView(view, initialViewMeta);

	const [didUpdate, setDidUpdate] = React.useState(true);
	const update = () => setDidUpdate(!didUpdate);
	React.useEffect(() => {
		update();
		console.log("update");
	}, [preMeta]);

	const {view_name, created_at, updated_at, config, ..._meta} = preMeta;
	const notUsed = {};
	notUsed.variables = {view_name, created_at, updated_at, config};
	const cols = Object.keys(_meta);
	const meta = {};
	const keys = {
		compact: [],
		expanded: [],
	};
	cols.map((col, i) => {
		meta[col] = _meta[col] ? JSON.parse(_meta[col]) : {};
		if (meta[col].display === "compact") {
			keys.compact.push(cols[i]);
		} else if (meta[col].display === "expanded") {
			keys.expanded.push(cols[i]);
		}
	});
	const onIndex = (a, b) => (
		(meta[a].indexweight || allOptionsWithData.widthweight.default) - (meta[b].indexweight || allOptionsWithData.widthweight.default)
	);
	keys.compact.sort(onIndex);
	keys.expanded.sort(onIndex);
	return {meta, keys, didUpdate};
};

export const useData = (meta, keys, metaDidUpdate) => {
	const {data: preData, isLoading} = useEntries();

	const [filterParameters, setFilterParameters] = React.useState({});

	const _data = preData || [];
	const [data, setData] = React.useState([]);
	const filteredData = useFilterableData(data);
	const { keys: sortedKeys, requestSort, sortConfig } = useSortableData(filteredData, {
		key: keys.compact[0],
		direction: "ascending",
		type: keys.compact[0]?.valuetype || allOptionsWithData.valuetype.default
	});
	const {prepareData} = useToolkit();

	React.useMemo(() => {
		if (
			Object.keys(_data)[0]
      && Object.keys(meta)[0])
		{
			const {processedData, parameters} = prepareData(_data, meta);
			setData(processedData);
			setFilterParameters(parameters);
		}
	}, [preData, metaDidUpdate]);

	return {filteredData, hasLoaded: !isLoading, filterParameters, sortedKeys, requestSort, sortConfig};
};

export const useDataForView = (view, initialViewMeta) => {

	const {data: preMeta} = useView(view, initialViewMeta);
	const {data: preData, isLoading} = useEntries();
	const {prepareData} = useToolkit();


	const [filterParameters, setFilterParameters] = React.useState({});
	const [data, setData] = React.useState([]);


	const {meta, keys} = React.useMemo(() => {
		const {view_name, created_at, updated_at, config, ..._meta} = preMeta;
  	const notUsed = {};
  	notUsed.variables = {view_name, created_at, updated_at, config};
  	const cols = Object.keys(_meta);
  	const meta = {};
  	const keys = {
  		compact: [],
  		expanded: [],
  	};
  	cols.map((col, i) => {
  		meta[col] = _meta[col] ? JSON.parse(_meta[col]) : {};
  		if (meta[col].display === "compact") {
  			keys.compact.push(cols[i]);
  		} else if (meta[col].display === "expanded") {
  			keys.expanded.push(cols[i]);
  		}
  	});
  	const onIndex = (a, b) => (
  		(meta[a].indexweight || allOptionsWithData.widthweight.default) - (meta[b].indexweight || allOptionsWithData.widthweight.default)
  	);
  	keys.compact.sort(onIndex);
  	keys.expanded.sort(onIndex);

		return {meta, keys};
	}, [preMeta]);

	React.useMemo(() => {
		if (!isLoading)
		{
			const {processedData, parameters} = prepareData(preData, meta);
			setData(processedData);
			setFilterParameters(parameters);
		}
	}, [preData, meta, isLoading]);

	const filteredData = useFilterableData(data);
	const { keys: sortedKeys, requestSort, sortConfig } = useSortableData(filteredData,
		{
			key: keys.compact[0],
			direction: "ascending",
			type: keys.compact[0]?.valuetype || allOptionsWithData.valuetype.default
		});

	return {filteredData, meta, keys, hasLoaded: !isLoading, filterParameters, sortedKeys, requestSort, sortConfig};

};
