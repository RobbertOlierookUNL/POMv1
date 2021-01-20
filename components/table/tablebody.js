import React, {useState, useEffect} from "react";

import Row from "./row.js";







const TableBody = ({meta, data, keysForTableCols, sortedRowKeys, additionalColKeys, scrollTop, setScrollTop}) => {
	const numberInView = 100;
	const fakedata = new Array(26).fill(".");
	const [{minLoad, maxLoad}, setParameters] = useState({minLoad: 0, maxLoad: 30});
	const updateParameters = (i) => {
		if (i%(numberInView/2-10) === 0) {
			let min = i - numberInView/2;
			if (min < 0) {
				min = 0;
			}
			setParameters({minLoad: min, maxLoad: min+numberInView});
		}
	};
	useEffect(() => {
		updateParameters(0);
	}, []);

	useEffect(() => {
		if (scrollTop) {
			setScrollTop(false);
			updateParameters(0);
		}
	}, [scrollTop]);



	return (
		<>
			<tbody>
				{data && Object.keys(data)[0] ?
					<>
						{sortedRowKeys.map((row, i) => (
							minLoad <= i && i <= maxLoad &&
							<Row
								onEnterViewport={() => updateParameters(i)}
								id={row}
								order={i}
								totalRows={sortedRowKeys.length}
								rowData={data[row]}
								meta={meta}
								keysForTableCols={keysForTableCols}
								additionalColKeys={additionalColKeys}
								key={i}/>
						))}
					</> :
					data === false ?
						<>
							<tr>
								<td>
									Geen resultaat
								</td>
							</tr>
						</>
						:
						<>
							{fakedata.map((row, i) => (
								<Row
									id={i}
									rowData={false}
									meta={meta}
									keysForTableCols={keysForTableCols}
									additionalColKeys={additionalColKeys}
									key={i}/>
							))}
						</>
				}
			</tbody>
		</>
	);
};


export default TableBody;
