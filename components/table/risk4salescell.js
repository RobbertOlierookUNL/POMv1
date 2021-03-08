import React, {useEffect} from "react";
import Skeleton from "react-loading-skeleton";
import NumberFormat from "react-number-format";




const Risk4SalesCell = ({cellData, rowData, colName, active, noExpand, theme, updateEntry, primaryKey, hasBatches}) => {
	const {gray_light} = theme;

	useEffect(() => {
		const thisCellData = (cellData !== false
      && typeof rowData?.costprice !== "undefined"
      && typeof rowData?.qty_to_offer !== "undefined")
			? (rowData.costprice || 0) * (rowData.qty_to_offer || 0) : false;
		if (!hasBatches && (cellData !== false) && (thisCellData !== false) && (thisCellData !== cellData)) {
			updateEntry(primaryKey, colName, thisCellData, false);
		}
	}, [cellData, rowData]);

	return (
		<div className={"td " + colName}>
			{(isNaN(cellData) || cellData === false) ? <Skeleton/> : <NumberFormat
				value={cellData}
				decimalScale={0}
				thousandSeparator={"."}
				decimalSeparator={","}
				fixedDecimalScale={true}
				prefix={"€"}
				displayType={"text"}
			/>}
      	<style jsx>{`
            .td {
              border: 1px solid ${gray_light.color};
              border-width: 0 1px 1px 0;
    					grid-column-start: ${colName};
    					cursor: pointer;
    					padding: 2px;
    			 	${active || noExpand ? "" : (`
    					text-overflow: ellipsis;
    					white-space: nowrap;
    					overflow: hidden;
    					`)
    		}
            }
            .td:nth-last-child(${noExpand ? 1 : 2}) {
              border-width: 0 0 1px 0;
            }
        `}
    			</style>
		</div>
	);
};

export default Risk4SalesCell;
