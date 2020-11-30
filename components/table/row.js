import React from "react";
import Cell from "./cell";

const Row = ({data, keys}) => {
	console.log(data);
	console.log(keys);
	return (
		<tr>
			{keys.map((key, i) => <Cell data={data[key]} key={i}/>)}
		</tr>
	);
};



export default Row;
