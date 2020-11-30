import React from "react";
import TableHeaders from "./tableheaders";
import TableBody from "./tablebody";



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
		qty: 8000,
	},
	product2: {
		description: "test2",
		qty: 8200,
	}

};

const view = "meetingview";


const Table = () => {
	const meta = colmeta[view];
	const cols = Object.keys(meta);

	return (
		<>
			<div className="tableContainer">
				<table className="table">
					<TableHeaders meta={meta} cols={cols}/>
					<TableBody/>
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
