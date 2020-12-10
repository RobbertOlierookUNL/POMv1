import React from "react";

import Row from "./row.js";


const TableBody = ({meta, data, keys, additionalKeys}) => {
	// const rows = Object.keys(data);
	return (
		<tbody>
			{data.map((row, i) => (
				<Row data={row} meta={meta} keys={keys} additionalKeys={additionalKeys} key={i}/>
			))}

		</tbody>
	);
};


export default TableBody;
