import React, {useMemo} from "react";
import moment from "moment-timezone";
import NumberFormat from "react-number-format";


import { useTheme } from "../../lib/custom-hooks";




const ExpandBlock = ({additionalColKeys, rowData, meta, conversionRate}) => {
	const {primary, gray_light} = useTheme();
	return (
		<div className="block">
			{additionalColKeys.map((key, i) => {
				const {valuetype, convertable, hovername, title, merge, specialnumberformat} = meta[key];
				const cellData = rowData[key];
				const convertedData = (valuetype === "number" && (convertable === "multiply" || convertable === "divide") && cellData) ? (convertable === "multiply" ? (cellData * conversionRate) : (cellData / conversionRate)) : cellData;
				return <div key={i} className={"block-row"}>
					<span className="block-row-left">
						{
							hovername
            || title
            || key
						}
					</span>
					<span className="block-row-right">
						{
							(valuetype === "date" && cellData)
								? moment(cellData).tz("Europe/Amsterdam").format("LL")
								:
								(valuetype === "number" && cellData)
									? <NumberFormat
										value={convertedData}
										decimalScale={2}
										thousandSeparator={"."}
										decimalSeparator={","}
										fixedDecimalScale={specialnumberformat === "money"}
										prefix={specialnumberformat === "money" ? "€" : ""}
										suffix={specialnumberformat === "percentage" ? "%" : ""}
										displayType={"text"}
									/>
									:
									(!cellData || cellData === "0" || (rowData
      									&& rowData.addedProps
      									&& !rowData.addedProps.merged
      									&& merge === "count"))
										? ""
										:
										Array.isArray(cellData)
											? cellData.join(" | ")
											:
											cellData
						}
					</span>
				</div>;
			})}
			<style jsx>{`
        .block {
          background-color: white;
          box-shadow: 1px 1px 2px gray;
          padding: 5px;
        }
        .block-row {
          padding: 3px;
          border-bottom: 1px solid ${gray_light.color}
        }
				.block-row:last-child {
					border-bottom: none;
				}
        .block-row-left {
        }
        .block-row-right {
          float: right;
					font-weight: bolder;
					color: ${primary.color};
        }
      `}</style>
		</div>
	);
};



export default ExpandBlock;
