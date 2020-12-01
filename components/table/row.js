import React from "react";
import Cell from "./cell";
import c from "../colors";

const Row = ({data, keys}) => {
	console.log(data);
	console.log(keys);
	return (
		<tr>
			{keys.map((key, i) => <Cell data={data[key]} key={i}/>)}
			<style jsx>{`
        tr:nth-child(even){background-color: ${c.gray_very_light.color};}
        tr:hover {background-color: ${c.gray_light.color};}
      `}</style>
		</tr>
	);
};



export default Row;
