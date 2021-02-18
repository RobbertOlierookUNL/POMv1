import React, {useState, useEffect} from "react";

import { dataTable_pk, numberInView } from "../../config/globalvariables";
import { useCheckBox } from "../../lib/custom-hooks";
import Row from "./row.js";
import useGlobal from "../store";










const TableBody = ({meta, data, keysForTableCols, hasLoaded, sortedRowKeys, additionalColKeys, scrollTop, setScrollTop, updateEntry}) => {
	const {check, toggle, init} = useCheckBox();
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
	}, [data]);

	useEffect(() => {
		if (scrollTop) {
			setScrollTop(false);
			updateParameters(0);
		}
	}, [scrollTop]);

	useEffect(() => {
		if (sortedRowKeys) {
			console.log({sortedRowKeys});
			for (const key of sortedRowKeys) {
				init(key);
			}
		}
	}, [sortedRowKeys]);


	return (
		<>
			<tbody>
				{hasLoaded && sortedRowKeys ?
					<>
						{sortedRowKeys.map((row, i) => (
							minLoad <= i && i <= maxLoad &&
							<Row
								onEnterViewport={() => updateParameters(i)}
								id={data[row][dataTable_pk].toString()}
								order={i}
								totalRows={sortedRowKeys.length}
								rowData={data[row]}
								meta={meta}
								keysForTableCols={keysForTableCols}
								additionalColKeys={additionalColKeys}
								updateEntry={updateEntry}
								key={data[row][dataTable_pk].toString()}
								check={check(data[row][dataTable_pk].toString())}
								toggle={toggle(data[row][dataTable_pk].toString())}
							/>
						))}
					</> :
					hasLoaded ?
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
