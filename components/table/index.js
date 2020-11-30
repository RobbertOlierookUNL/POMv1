import React from "react";

import TableBody from "./tablebody";
import TableColGroup from "./tablecolgroup";
import TableHeaders from "./tableheaders";




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
					<TableColGroup/>
					<TableHeaders meta={meta} keys={keys.compact}/>
					<TableBody data={data} keys={keys.compact}/>
				</table>
			</div>
			<style jsx>{`
				.tableContainer {
					width: 100%;
					background-color: red;
				}
				.table {
					border-collapse: collapse;
					width: 100%;
				}
			`}
			</style>
		</>
	);

};

export default Table;
