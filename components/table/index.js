import React, { useState, useMemo, useRef } from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

import { allOptionsWithData } from "../../config/viewOptions";
import {
	filterAndUnitBarHeight,
	filterDisplayBarHeight,
	headerHeight,
	horPadding,
	tableHeadersBarHeight,
	toolBarHeight,
	verPadding
} from "../../config/globalvariables";
import { useEntries, useView } from "../../lib/swr-hooks";
import {
	useFilterableData,
	useSortableData,
	useToolkit
} from "../../lib/custom-hooks";
import FilterBar from "./filterbar";
import TableBody from "./tablebody";
import TableHeaders from "./tableheaders";
import ToTopButton from "../totopbutton";
import Toolbar from "./toolbar";
import useGlobal from "../store";








const Table = ({view, initialViewMeta, user}) => {
	console.log("tablererender");
	const {data: preMeta} = useView(view, initialViewMeta);
	const {data: preData} = useEntries();
	const {view_name, created_at, updated_at, config, ..._meta} = preMeta;
	const notUsed = {};
	notUsed.variables = {view_name, created_at, updated_at, config};
	const [filterParameters, setFilterParameters] = useState({});
	const tableRef = useRef(null);
	const fakedata = new Array(50).fill(".");

	const [primary_very_light] = useGlobal(
		state => state.primary_very_light,
		() => null
	);
	const [arrayOfFilters] = useGlobal(state => state.arrayOfFilters, () => null);


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


	const _data = preData || [];
	const [data, setData] = useState([]);
	const filteredData = useFilterableData(data);
	const { keys: sortedKeys, requestSort, sortConfig } = useSortableData(filteredData, {
		key: keys.compact[0],
		direction: "ascending",
		type: keys.compact[0]?.valuetype || allOptionsWithData.valuetype.default
	});
	const {prepareData} = useToolkit();

	useMemo(() => {
		if (
			Object.keys(_data)[0]
			&& Object.keys(meta)[0])
		{
			const {processedData, parameters} = prepareData(_data, meta);
			setData(processedData);
			setFilterParameters(parameters);
		}
	}, [preData, preMeta]);


	const [scrollTop, setScrollTop] = useState(false);
	const handleClick = () => {
		setScrollTop(true);
		tableRef.current.scrollTo(0, 0);
	};


	return (
		<SkeletonTheme color={primary_very_light.color} highlightColor={"white"}>
			{data && Object.keys(data)[0] &&
				<ToTopButton
					handleClick={handleClick}
					top={
						`calc(
							${headerHeight} +
							${verPadding}px +
							${arrayOfFilters.length ? filterDisplayBarHeight : "0px"} +
							${toolBarHeight} +
							${tableHeadersBarHeight} +
							${filterAndUnitBarHeight} +
							${verPadding}px)`
					}
					right={`${2*horPadding + 10}px`}
				/>}
			{console.log({filteredData})}
			<div className="tableContainer" ref={tableRef}>
				<FilterBar/>
				<Toolbar/>
				{meta && Object.keys(meta)[0] ?
					<table className="table">
						<TableHeaders
							requestSort={requestSort}
							sortConfig={sortConfig}
							meta={meta}
							keysForTableCols={keys.compact}
							filterParameters={filterParameters}
						/>
						<TableBody
							meta={meta}
							data={filteredData}
							keysForTableCols={keys.compact}
							additionalColKeys={keys.expanded}
							sortedRowKeys={sortedKeys}
							scrollTop={scrollTop}
							setScrollTop={setScrollTop}
						/>
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
					width: calc(100% - ${horPadding *2 - 0}px);
					overflow: auto;
					height: calc(100vh - 38.67px - ${verPadding * 2}px);
					position: relative;
					top: ${verPadding}px;
					left: ${horPadding}px;
					box-shadow: -1px 2px 10px rgba(0, 0, 0, 0.2);
					border-radius: 6px;


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
