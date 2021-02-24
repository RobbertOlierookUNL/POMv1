import React from "react";
import { VariableSizeList as List } from "react-window";

const data = [0, 1, 2, 3, 4];
const sizes = [50, 50, 1000, 50, 50];

const Row = ({index, style}) =>
	<tr style={style}>{data[index]}</tr>;

const getItemSize = index => sizes[index];

const Test = () => {
	return (
		<List
			height={150}
			itemCount={5}
			itemSize={getItemSize}
			width={300}
			innerElementType="tbody"
			outerElementType="table"

		>
			{Row}
		</List>
	);
};


export default Test;
