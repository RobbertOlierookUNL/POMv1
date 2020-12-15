import React, {useState} from "react";

import { useSortableData } from "../../lib/custom-hooks";
import Row from "./row.js";





const TableBody = ({meta, data, keys, sortedKeys, additionalKeys}) => {
	// const rows = Object.keys(data);
	const fakedata = new Array(26).fill(".");
	const [minLoad, setMinLoad] = useState(0);
	const [maxLoad, setMaxLoad] = useState(300);
	console.log(sortedKeys);

	const updateParameters = (i) => {
		if (i%140 === 0) {
			let min = i - 150;
			if (min < 0) {
				min = 0;
			}
			setMinLoad(min);
			setMaxLoad(min+300);
		}
	};

	return (
		<tbody>
			{data && Object.keys(data)[0] ?
				<>
					{sortedKeys.map((row, i) => (
						minLoad < i && i < maxLoad &&
							<Row onEnterViewport={() => updateParameters(i)} id={i} data={data[row]} meta={meta} keys={keys} additionalKeys={additionalKeys} key={i}/>
					))}
				</> : <>
					{fakedata.map((row, i) => (
						<Row id={i} data={false} meta={meta} keys={keys} additionalKeys={additionalKeys} key={i}/>
					))}
				</>
			}

		</tbody>
	);
};


export default TableBody;
