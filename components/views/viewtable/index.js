import React, {useState, useEffect} from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import { allOptions } from "../../viewOptions";
import c from "../../colors";




const ViewTable = ({data, mode}) => {
	console.log(mode);
	const {view_name, created_at, updated_at, ...viewdata} = data || {};
	// belangrijk om alle niet-JSON hierboven weg te filteren
	const [dataState, setDataState] = useState({});
	const fakedata = new Array(50).fill(".");
	useEffect(() => {
		let _dataState = {};
		Object.keys(viewdata).map(key => {
			_dataState[key] = JSON.parse(viewdata[key]);
			// // for dynamic keys
			// if (_dataState[key]) {
			// 	Object.keys(_dataState[key]).map(k => {
			// 		if (!allOptions.includes(k)) {
			// 			allOptions.push(k);
			// 		}
			// 	});
			// }
			setDataState(_dataState);

		});
	}, [Object.keys(viewdata)[0]]);
	const saveData = async (attr) => {
		const value = JSON.stringify(dataState[attr]);
		if (value !== viewdata[attr]) {
			try {
				console.log(value);
				const res = await fetch("/api/edit-view", {
					method: "PATCH",
					body: JSON.stringify({
						attr,
						view_name,
						value
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8"
					}
				});
				console.log(2);
				const json = await res.json();
				console.log(3);
				if (!res.ok) throw Error(json.message);
			} catch (e) {
				throw Error(e.message);
			}
		}
	};

	return (
		<div className="container">
			<table>
				<colgroup>
					<col key={0} span={1} className={"firstcol evencols"} style={{}}/>
					{allOptions.map((h, i) => <col key={i+1} span={1} className={"evencols"}/>)}
				</colgroup>
				<thead>
					<tr>
						<th className="crossdivider">x</th>
						{allOptions.map((h, i) => <th key={i}>{h}</th>)}
					</tr>
				</thead>
				<tbody>
					{Object.keys(dataState)[0] ?
						Object.keys(dataState).map((attribute, i) => (
							<tr key={i}>
								<td key={0} className="firstcol">{attribute}</td>
								{allOptions.map((option, i) =>
									<td key={i+1}>
										{mode === "edit" ?
											<>
												<input
													value={dataState[attribute] && dataState[attribute][option] ? dataState[attribute][option] : ""}
													placeholder={dataState[attribute] && dataState[attribute][option] ? null : "-"  }
													onChange={(event) => setDataState({...dataState, [attribute]: {...dataState[attribute], [option]: event.target.value}})}
													onBlur={() => saveData(attribute)}
												/>
											</>
											:
											<>
												{dataState[attribute] && dataState[attribute][option] ? dataState[attribute][option] : "-"}
											</>
										}
									</td>

								)}
							</tr>
						))
						:
						<>
							{fakedata.map((dot, row) => (
								<tr key={row}>
									<td key={0}>
										<SkeletonTheme color={c.primary_very_light.color} highlightColor={"white"}>
											<Skeleton />
										</SkeletonTheme>
									</td>
									{allOptions.map((option, i) =>
										<td key={i+1}>
											<SkeletonTheme color={c.primary_very_light.color} highlightColor={"white"}>
												<Skeleton color={c.primary.color} highlightColor={c.primary_very_light}/>
											</SkeletonTheme>
										</td>
									)}
								</tr>
							))}
						</>
					}
				</tbody>
			</table>
			<style jsx>{`
				.container{
					width: calc(100% - 30px);
					overflow: auto;
					height: calc(100vh - 68.67px);
					position: relative;
					top: 15px;
					left: 15px;
					/* right: -15px;
					bottom: -15px; */
				}
				.evencols{
					width: ${(1/(allOptions.length+1)) * 100}%;
				}
				table{
					background-color: white;
					border-collapse: collapse;
					width: 100%;
				}

				tr:nth-child(even){
					background-color: ${c.gray_very_light.color};
				}
				.crossdivider {
					background-color: ${c.primary_very_light.color};
					color: ${c.primary_very_light.text};
				}
				td {
					text-align: right;
					border: 1px solid ${c.gray_light.color};
					border-width: 0 1px 1px 0;
					padding: 1px 7px;
				}
				td:nth-last-child(1) {
					border-width: 0 0 1px 0;
				}
				th{
					background-color: ${c.primary.color};
					color: ${c.primary.text};
					border: 1px solid ${c.gray_light.color};
					border-width: 0 1px 0 0;
					position: sticky;
					top: 0;
				}
				th:last-child {
					border-width: 0;
				}
				.firstcol{
					font-weight: bold;
					text-align: left;
				}

			`}</style>
		</div>
	);
};

export default ViewTable;
