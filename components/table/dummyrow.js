import React from "react";

import { allOptionsWithData } from "../../config/viewOptions";
import Cell from "./cell";





const DummyRow = ({meta, keysForTableCols, theme}) => {

	const {tertiary, gray_light, gray_very_light} = theme;


	return (
		<div
			className={"tr gridded-row"}
		>
			<>
				{keysForTableCols.map((key, i) => {

					return <Cell
						cellData={false}
						colName={key}
						rowData={false}
						inRangeOf={meta[key].inrangeof}
						key={i}
						inEuro={meta[key].unit === "€"}
						theme={theme}
						valueType={meta[key].valuetype || allOptionsWithData.valuetype.default}					
					/>;
				})}
			</>
			<style jsx>{`
        .tr:nth-child(even){background-color: ${gray_very_light.color};}
        .tr:hover {background-color: ${gray_light.color};}
				.tr {
					min-height: 18px;
				}
				.active, .active:hover {
					background-color: ${tertiary.color} !important;
					color: ${tertiary.text};
					font-weight: bold;
					font-size: 0.97em;
					border: none;
				}
				.td {
					border: 1px solid ${gray_light.color};
          border-width: 0 1px 1px 0;
					padding: 0;
				}
      `}</style>
		</div>
	);
};

// const Row = handleViewport(PreRow, undefined, {disconnectOnLeave: true});


export default DummyRow;
