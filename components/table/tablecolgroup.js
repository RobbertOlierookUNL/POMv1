import React from "react";
import Colwidth from "./colwidth";



const TableColGroup = ({keys, meta}) => {
	let totalWidthCount = 0;
	keys.forEach((col) => {
		totalWidthCount += meta[col].widthweight;
	});
	return (
		<colgroup>
			{keys.map((col, i) => (
				<Colwidth data={meta[col]} key={i} totalWidth={totalWidthCount}/>
			))}
		</colgroup>
	);
};



export default TableColGroup;
