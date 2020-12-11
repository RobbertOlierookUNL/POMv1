import React, {useState, useEffect, useMemo} from "react";

import { useEntries, useView } from "../../lib/swr-hooks";
import TableBody from "./tablebody";
import TableHeaders from "./tableheaders";


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
	console.log(_data[0]);
	const [meta, setMeta] = useState({});
	const [compact, setCompact] = useState([]);
	const [expanded, setExpanded] = useState([]);
	const [totalWidthCount, setTotalWidthCount] = useState(0);
	const [data, setData] = useState({});

	useMemo(() => {
		const cols = Object.keys(metaString);
		const keys = {
			compact: [],
			expanded: [],
		};
		let _meta = {};
		let _totalWidthCount = 0;
		cols.map((col, i) => {
			_meta[col] = JSON.parse(metaString[col]);
			if (_meta[col].display === "compact") {
				keys.compact.push(cols[i]);
				_totalWidthCount += parseInt(_meta[col].widthweight);
			} else if (_meta[col].display === "expanded") {
				keys.expanded.push(cols[i]);
			}
		});
		setCompact(keys.compact);
		setExpanded(keys.expanded);
		setTotalWidthCount(_totalWidthCount);
		setMeta(_meta);
	}, [ Object.keys(metaString)[0]]);
	useMemo(() => {
		setData(_data);
	}, [Object.keys(_data)[0]]);
	return (
		<>
			<div className="tableContainer">
				{console.log(data)}
				<table className="table">
					{//<TableColGroup meta={meta} keys={keys.compact}/>
					}
					<TableHeaders meta={meta} keys={compact} totalWidth={totalWidthCount}/>
					<TableBody meta={meta} data={data} keys={compact} additionalKeys={expanded} totalWidth={totalWidthCount}>
					</TableBody>
				</table>
			</div>
			<style jsx>{`
				.tableContainer {
					width: calc(100% - 30px);
					overflow: auto;
					height: calc(100vh - 68.67px);
					position: relative;
					top: 15px;
					left: 15px;
				}
				.table {
					border-collapse: collapse;
					background-color: white;
					width: 100%;
					box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
					font-size: 0.7em
				}
			`}
			</style>
		</>
	);

};

export default Table;
