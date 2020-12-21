import React, {useState, useEffect, useRef} from "react";

import { c } from "../../config/colors";
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


	const horPadding = 15;
	const verPadding = 15;

	const handleClick = () => {
		tableRef.current.scrollTo(0, 0);
	};

	useEffect(() => {
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
		<>
			{data && Object.keys(data)[0] && <ToTopButton
				handleClick={handleClick}
				top={`${38.67 + (verPadding * 3)}px`}
				left={`calc(100vw - ${50 + 2*verPadding}px)`
				}/>}
			<div className="tableContainer" ref={tableRef}>
				<table className="table">
					{//<TableColGroup meta={meta} keys={keys.compact}/>
					}
					<TableHeaders requestSort={requestSort} sortConfig={sortConfig}  meta={meta} keys={compact} totalWidth={totalWidthCount}/>
					<TableBody meta={meta} data={data} keys={compact} additionalKeys={expanded} sortedKeys={sortedKeys}>
					</TableBody>
				</table>
			</div>
			<style jsx>{`
				.tableContainer {
					width: calc(100% - ${horPadding *2 - 10}px);
					overflow: auto;
					height: calc(100vh - 38.67px - ${verPadding * 2}px);
					position: relative;
					top: ${horPadding}px;
					left: ${verPadding}px;

				}
				.table {
					border-collapse: collapse;
					background-color: white;
					width: 100%;
					box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
					font-size: 0.7em
				}
				.toTopButton {
					z-index: 4;
					position: absolute;
					height: 50px;
					width: 50px;
					border-radius: 50%;
					background-color: red;
					top: ${38.67 + (verPadding * 3)}px;
					left: calc(100vw - ${50 + 2*verPadding}px);
					box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
					opacity: 0.7;
					background-color: ${c.primary_dark.color};
					color: ${c.primary_dark.text};
					text-align: center;
					padding: calc(10px - 0.18em) 10px 10px 10px;
					font-size: 30px;
					cursor: pointer;
				}
			`}
			</style>
		</>
	);

};

export default Table;
