import React from "react";
import Row from "./row.js";

const TableBody = ({data, keys}) => {
	const rows = Object.keys(data);
	return (
		<tbody>
			{rows.map((row, i) => (
				<Row data={data[row]} keys={keys} key={i}/>
			))}
		</tbody>
	);
};


export default TableBody;
