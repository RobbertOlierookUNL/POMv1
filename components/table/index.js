import React, {useState, useEffect} from "react";

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

const view = "testview";


const Table = () => {
	const {data: _metaString} = useView(view);
	const {data: preData} = useEntries();
	const {view_name, created_at, updated_at, ...metaString} = _metaString || {};
	const [..._data] = preData || [];
	console.log(_data[0]);
	const [meta, setMeta] = useState({});
	const [compact, setCompact] = useState([]);
	const [expanded, setExpanded] = useState([]);
	const [totalWidthCount, setTotalWidthCount] = useState(0);
	const [data, setData] = useState({});

	useEffect(() => {
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
				_totalWidthCount += _meta[col].widthweight;
			} else if (_meta[col].display === "expanded") {
				keys.expanded.push(cols[i]);
			}
		});
		setCompact(keys.compact);
		setExpanded(keys.expanded);
		setTotalWidthCount(_totalWidthCount);
		setMeta(_meta);
	}, [ Object.keys(metaString)[0]]);
	useEffect(() => {
		setData(_data);
	}, [Object.keys(_data)[0]]);
	return (
		<>
			<div className="tableContainer">
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
					width: 100%;
					padding: 15px 15px;
				}
				.table {
					border-collapse: collapse;
					background-color: white;
					width: 100%;
					box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
				}
			`}
			</style>
		</>
	);

};

export default Table;
