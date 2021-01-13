import React, {useRef, useEffect, useState, forwardRef} from "react";

import { allOptionsWithData } from "../../config/viewOptions";
import { useColors, useToolkit } from "../../lib/custom-hooks";
import Cell from "./cell";
import useGlobal from "../store";





const Expand = ({additionalColKeys, rowData, meta, active, mergedFrom, keysForMergedRows}, ref) => {
	const expandCell = useRef(null);
	const [height, setHeight] = useState("auto");
	const {mergeRefs} = useToolkit();
	const [gray_light, gray_lighter] = useColors("gray_light", "gray_lighter");

	useEffect(() => {
		rowData && setHeight(expandCell.current.scrollHeight + 1.33 + "px");
	}, [rowData]);

	return (
		<td ref={mergeRefs(expandCell, ref)} className={`expandCell ${active && "active"}`}>
			{mergedFrom && (
				<table className={"sub-table"}>
					<tbody>
						{mergedFrom.map((row, idx) =>
							<tr key={idx}>
								{keysForMergedRows.map((key, i) =>
									<Cell
										cellData={rowData === false ? false : row[key]}
										colName={key}
										width={meta[key].widthweight || allOptionsWithData.widthweight.default}
										key={i}
										noExpand
									/>
								)}
							</tr>
						)}
					</tbody>
				</table>
			)}
			{active && console.log(rowData)}
			<div className={"container"}>
				{additionalColKeys &&
					<div>
						<dl className={"expandList"}>
							{additionalColKeys.map((key, i) =>(
								<div key={i}>
									<dt key={"dt" + i}>{meta[key].title || key}</dt>
									<dd key={"dd" + i}>{rowData[key]}</dd>
								</div>
							))
							}

						</dl></div>}
			</div>

			<style jsx>{`
        td {
          transition: height 100ms linear;
          height: 0;
					padding: 0;
          grid-column: 1/-1;
          background-color: white;
					overflow: hidden;
					display: grid;
        }
        td.active{
          height: ${height};
        }
				.container {
					background-color: white;
					padding: 8px;
					color: black;
					border: 1px solid ${gray_light.color};
					border-width: 0 0 1px 0;
					font-weight: normal;
				}
				.sub-table {
					width: 100%;
					background-color: ${gray_lighter.color};
					color: ${gray_lighter.text};
					border-collapse: collapse;
					font-weight: bold;
				}
				.expandCell:not(.active) {
					font-size: 0.97em;
				}



      `}</style>
		</td>
	);
};

export default forwardRef(Expand);
