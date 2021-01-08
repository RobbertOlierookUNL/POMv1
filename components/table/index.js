import React, { useState, useMemo, useRef } from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

import { allOptionsWithData } from "../../config/viewOptions";
import { useEntries, useView } from "../../lib/swr-hooks";
import { useSortableData, useToolkit } from "../../lib/custom-hooks";
import TableBody from "./tablebody";
import TableHeaders from "./tableheaders";
import ToTopButton from "../totopbutton";
import Toolbar from "./toolbar";
import useGlobal from "../store";


const Table = ({initialData, view, initialViewMeta}) => {
	console.log("tablererender");
	const {data: _meta} = useView(view, initialViewMeta);
	const {data: preData} = useEntries();
	const _data = preData || [];
	const {view_name, created_at, updated_at, config, ...meta} = _meta;
	const notUsed = {};
	notUsed.variables = {view_name, created_at, updated_at, config};
	// const [meta, setMeta] = useState({});
	// const [keys, setKeys] = useState({});
	const [data, setData] = useState({});
	const { keys: sortedKeys, requestSort, sortConfig } = useSortableData(data);
	const {mergeBy} = useToolkit();
	const tableRef = useRef(null);
	const fakedata = new Array(50).fill(".");
	const horPadding = 15;
	const verPadding = 15;
	const [primary_very_light] = useGlobal(
		state => state.primary_very_light,
		() => null
	);

	const handleClick = () => {
		tableRef.current.scrollTo(0, 0);
	};

	const cols = Object.keys(meta);
	const keys = {
		compact: [],
		expanded: [],
	};
	cols.map((col, i) => {
		meta[col] = meta[col] ? JSON.parse(meta[col]) : {};
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



	// useMemo(() => {
	// 	console.log(2);
	// 	const cols = Object.keys(metaString);
	// 	const keys = {
	// 		compact: [],
	// 		expanded: [],
	// 	};
	// 	let _meta = {};
	// 	cols.map((col, i) => {
	// 		_meta[col] = metaString[col] ? JSON.parse(metaString[col]) : {};
	// 		if (_meta[col].display === "compact") {
	// 			keys.compact.push(cols[i]);
	// 		} else if (_meta[col].display === "expanded") {
	// 			keys.expanded.push(cols[i]);
	// 		}
	// 	});
	// 	const onIndex = (a, b) => (
	// 		(_meta[a].indexweight || allOptionsWithData.widthweight.default) - (_meta[b].indexweight || allOptionsWithData.widthweight.default)
	// 	);
	// 	keys.compact.sort(onIndex);
	// 	keys.expanded.sort(onIndex);
	// 	setKeys(keys);
	// 	setMeta(_meta);
	// }, [ Object.keys(metaString)[0]]);
	//
	useMemo(() => {
		if (
			Object.keys(_data)[0]
			&& Object.keys(meta)[0])
		{
			setData(mergeBy(_data, meta, keys.compact, keys.expanded));
		}
	}, [Object.keys(_data)[0], Object.keys(meta)[0], Object.keys(keys)[0]]);


	return (
		<SkeletonTheme color={primary_very_light.color} highlightColor={"white"}>
			{data && Object.keys(data)[0] &&
				<ToTopButton
					handleClick={handleClick}
					top={`${38.67 + 25 + (verPadding * 3)}px`}
					left={`calc(100vw - ${50 + 2*verPadding}px)`}
				/>}
			<div className="tableContainer" ref={tableRef}>
				<Toolbar/>
				{meta && Object.keys(meta)[0] ?
					<table className="table">
						<TableHeaders
							requestSort={requestSort}
							sortConfig={sortConfig}
							meta={meta}
							keysForTableCols={keys.compact}/>
						<TableBody
							meta={meta}
							data={data}
							keysForTableCols={keys.compact}
							additionalColKeys={keys.expanded}
							sortedRowKeys={sortedKeys}/>
					</table>
					:
					<table className="table">
						<tbody>
							{fakedata.map((_, row) => (
								<tr key={row}>
									<td>
										<Skeleton />
									</td>
									<td>
										<Skeleton />
									</td>
									<td>
										<Skeleton />
									</td>
									<td>
										<Skeleton />
									</td>
									<td>
										<Skeleton />
									</td>
								</tr>
							))}
						</tbody>
					</table>

				}
			</div>
			<style jsx>{`
				.tableContainer {
					width: calc(100% - ${horPadding *2 - 10}px);
					overflow: auto;
					height: calc(100vh - 38.67px - ${verPadding * 2}px);
					position: relative;
					top: ${horPadding}px;
					left: ${verPadding}px;
					box-shadow: -1px 2px 10px rgba(0, 0, 0, 0.2);


				}
				.table {
					border-collapse: collapse;
					background-color: white;
					width: 100%;
					font-size: 0.7em
				}
			`}
			</style>
		</SkeletonTheme>
	);

};

export default Table;
