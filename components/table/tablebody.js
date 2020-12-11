import React, {useState} from "react";

import Row from "./row.js";




const TableBody = ({meta, data, keys, additionalKeys}) => {
	console.log(data);
	// const rows = Object.keys(data);
	const fakedata = new Array(26).fill(".");
	const [minLoad, setMinLoad] = useState(0);
	const [maxLoad, setMaxLoad] = useState(300);

	const updateParameters = (i) => {
		if (i%140 === 0) {
			let min = i - 150;
			if (min < 0) {
				min = 0;
			}
			setMinLoad(min);
			setMaxLoad(min+300);
			console.log(minLoad, i,  maxLoad);
		}
	};

	return (
		<tbody>
			{data && Object.keys(data)[0] ?
				<>
					{data.map((row, i) => (
						minLoad < i && i < maxLoad &&
							<Row onEnterViewport={() => updateParameters(i)} id={i} data={row} meta={meta} keys={keys} additionalKeys={additionalKeys} key={i}/>
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
