import React from "react";

import Row from "./row.js";


const TableBody = ({meta, data, keys, additionalKeys}) => {
	const rows = Object.keys(data);
	return (
		<tbody>
			{rows.map((row, i) => (
				<Row id={row} data={data[row]} meta={meta} keys={keys} additionalKeys={additionalKeys} key={i}/>
			))}

		</tbody>
	);
};


export default TableBody;
