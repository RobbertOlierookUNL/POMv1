import React from "react";
import c from "../../colors";

const ViewTable = ({data}) => {
	const {view_name, created_at, updated_at, ...viewdata} = data;
	// belangrijk om alle niet-JSON hierboven weg te filteren
	const allOptions = ["widthweight", "title", "display"];
	Object.keys(viewdata).map(key => {
		viewdata[key] = JSON.parse(viewdata[key]);
		/*
		// for dynamic keys
		if (viewdata[key]) {
			Object.keys(viewdata[key]).map(k => {
				if (!allOptions.includes(k)) {
					allOptions.push(k);
				}
			});
		}
		*/
	});
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
					{Object.keys(viewdata).map((attribute, i) => (
						<tr key={i}>
							<td key={0} className="firstcol">{attribute}</td>
							{allOptions.map((option, i) => <td key={i+1}>
								{viewdata[attribute] ? viewdata[attribute][option] : "-"}
							</td>)}
						</tr>
					))}

				</tbody>
			</table>
			<style jsx>{`
				.container{
					width: 100%;
					padding: 15px;
				}
				.evencols{
					width: ${(1/(allOptions.length+1)) * 100}%;
				}
				table{
					background-color: white;
					width: 100%;
					border-collapse: collapse;
				}
				thead {
					background-color: ${c.primary.color};
					color: ${c.primary.text};
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
					border: 1px solid ${c.gray_light.color};
					border-width: 0 1px 0 0;
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
