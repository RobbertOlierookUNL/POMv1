import React, {useState, useMemo, useEffect, useContext, useRef} from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

import { SchemaContext } from "../../pages/_app";
import { colorschematic } from "../../config/colors";
import { useEntries, useView } from "../../lib/swr-hooks";
import { useSortableData } from "../../lib/custom-hooks";
import TableBody from "./tablebody";
import TableHeaders from "./tableheaders";
import ToTopButton from "../totopbutton";







//
// const colmeta = {
// 	defaultview: {
// 		description: {
// 			title: "description",
// 			display: "compact",
// 			widthweight: 3,
// 		},
// 		quantity: {
// 			title: "qty",
// 			display: "expanded",
// 			widthweight: 2,
// 		},
// 	},
// 	meetingview: {
// 		description: {
// 			title: "description",
// 			display: "compact",
// 			widthweight: 1,
// 		},
// 		quantity: {
// 			title: "qty",
// 			display: "compact",
// 			widthweight: 2,
// 		},
// 	}
//
//
//
//
// };
//
// const data = {
// 	product1: {
// 		description: "test",
// 		quantity: 8000,
// 	},
// 	product2: {
// 		quantity: 8200,
// 		description: "test2",
// 	},
// 	product3: {
// 		description: "test",
// 		quantity: 8000,
// 	},
// 	product4: {
// 		quantity: 8200,
// 		description: "test2",
// 	},
//
// };

const view = "salesview";


const Table = () => {
	const {data: _metaString} = useView(view);
	const {data: preData} = useEntries();
	const {view_name, created_at, updated_at, config, ...metaString} = _metaString || {};
	const [..._data] = preData || [];
	const [meta, setMeta] = useState({});
	const [compact, setCompact] = useState([]);
	const [expanded, setExpanded] = useState([]);
	const [totalWidthCount, setTotalWidthCount] = useState(0);
	const [data, setData] = useState({});
	const { keys: sortedKeys, requestSort, sortConfig } = useSortableData(data);
	const tableRef = useRef(null);
	const schema = useContext(SchemaContext);
	const fakedata = new Array(50).fill(".");
	const horPadding = 15;
	const verPadding = 15;

	const handleClick = () => {
		tableRef.current.scrollTo(0, 0);
	};

	useMemo(() => {
		const cols = Object.keys(metaString);
		const keys = {
			compact: [],
			expanded: [],
		};
		let _meta = {};
		let _totalWidthCount = 0;
		cols.map((col, i) => {
			_meta[col] = metaString[col] ? JSON.parse(metaString[col]) : {};
			if (_meta[col].display === "compact") {
				keys.compact.push(cols[i]);
				_totalWidthCount += _meta[col].widthweight ? parseInt(_meta[col].widthweight) : 12;
			} else if (_meta[col].display === "expanded") {
				keys.expanded.push(cols[i]);
			}
		});
		const onIndex = (a, b) => (
			(_meta[a].indexweight || 10) - (_meta[b].indexweight || 10)
		);
		setCompact(keys.compact.sort(onIndex));
		setExpanded(keys.expanded.sort(onIndex));
		setTotalWidthCount(_totalWidthCount);
		setMeta(_meta);
	}, [ Object.keys(metaString)[0]]);

	useEffect(() => {
		setData(_data);
	}, [Object.keys(_data)[0]]);


	return (
		<SkeletonTheme color={colorschematic(schema).primary_very_light.color} highlightColor={"white"}>

			{data && Object.keys(data)[0] && <ToTopButton
				handleClick={handleClick}
				top={`${38.67 + (verPadding * 3)}px`}
				left={`calc(100vw - ${50 + 2*verPadding}px)`
				}/>}
			<div className="tableContainer" ref={tableRef}>
				{meta && Object.keys(meta)[0] ? <table className="table">
					{//<TableColGroup meta={meta} keys={keys.compact}/>
					}
					<TableHeaders requestSort={requestSort} sortConfig={sortConfig} meta={meta} keys={compact} totalWidth={totalWidthCount}/>
					<TableBody meta={meta} data={data} keys={compact} additionalKeys={expanded} sortedKeys={sortedKeys}>
					</TableBody>
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
