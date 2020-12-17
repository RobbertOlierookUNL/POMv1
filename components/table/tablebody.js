import React, {useState} from "react";

import { useSortableData } from "../../lib/custom-hooks";
import Row from "./row.js";


const numberInView = 150;


const TableBody = ({meta, data, keys, sortedKeys, additionalKeys}) => {
	// const rows = Object.keys(data);
	const fakedata = new Array(26).fill(".");
	const [minLoad, setMinLoad] = useState(0);
	const [maxLoad, setMaxLoad] = useState(numberInView);

	const updateParameters = (i) => {
		if (i%(numberInView/2-10) === 0) {
			let min = i - numberInView/2;
			if (min < 0) {
				min = 0;
			}
			setMinLoad(min);
			setMaxLoad(min+numberInView);
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
