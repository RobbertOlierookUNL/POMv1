import React from "react";

import TableBody from "./tablebody";
import TableColGroup from "./tablecolgroup";
import TableHeaders from "./tableheaders";
import c from "../colors";




const colmeta = {
	defaultview: {
		description: {
			display: "compact",
			widthweight: 3,
		},
		quantity: {
			display: "expanded",
			widthweight: 2,
		},
	},
	meetingview: {
		description: {
			title: "description",
			display: "compact",
			widthweight: 1,
		},
		quantity: {
			title: "qty",
			display: "compact",
			widthweight: 2,
		},
	}




};

const data = {
	product1: {
		description: "test",
		quantity: 8000,
	},
	product2: {
		quantity: 8200,
		description: "test2",
	}

};

const view = "meetingview";


const Table = () => {
	const meta = colmeta[view];
	const cols = Object.keys(meta);
	const keys = {
		compact: [],
		expanded: [],
	};
	cols.forEach((col, i) => {
		if (meta[col].display === "compact") {
			keys.compact.push(cols[i]);
		}
	});

	return (
		<>
			<div className="tableContainer">
				<table className="table">
					<TableColGroup meta={meta} keys={keys.compact}/>
					<TableHeaders meta={meta} keys={keys.compact}/>
					<TableBody data={data} keys={keys.compact}/>
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
