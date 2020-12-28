import React, {useState, useRef, useMemo} from "react";
import handleViewport from "react-in-viewport";

import { allOptionsWithData } from "../../config/viewOptions";
import { useToolkit } from "../../lib/custom-hooks";
import Row from "./row.js";







const TableBody = ({meta, data, keys, sortedKeys, additionalKeys}) => {
	const numberInView = 100;
	const fakedata = new Array(26).fill(".");
	const [{minLoad, maxLoad}, setParameters] = useState({minLoad: 0, maxLoad: numberInView});
	const updateParameters = (i) => {
		if (i%(numberInView/2-10) === 0) {
			let min = i - numberInView/2;
			if (min < 0) {
				min = 0;
			}
			setParameters({minLoad: min, maxLoad: min+numberInView});
		}
	};



	return (
		<>
			<tbody>
				{data && Object.keys(data)[0] ?
					<>
						{console.log("rerender")}
						{sortedKeys.map((row, i) => (
							minLoad <= i && i <= maxLoad &&
							<Row onEnterViewport={() => updateParameters(i)} id={i} rowData={data[row]} meta={meta} keys={keys} additionalKeys={additionalKeys} key={i}/>
						))}
					</> : <>
						{fakedata.map((row, i) => (
							<Row id={i} rowData={false} meta={meta} keys={keys} additionalKeys={additionalKeys} key={i}/>
						))}
					</>
				}
			</tbody>
		</>
	);
};


export default TableBody;
