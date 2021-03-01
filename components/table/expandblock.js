import React from "react";
import moment from "moment-timezone";

import { useTheme } from "../../lib/custom-hooks";




const ExpandBlock = ({additionalColKeys, rowData, meta, active}) => {
	const {primary, gray_light} = useTheme();
	return (
		<div className="block">
			{additionalColKeys.map((key, i) =>
				<div key={i} className={"block-row"}>
					<span className="block-row-left">
						{
							meta[key].hovername
            || meta[key].title
            || key
						}
					</span>
					<span className="block-row-right">
						{
							(moment.isMoment(rowData[key]))
								? rowData[key].format("YYYY-MM-DD")
								:
								(!rowData[key] || rowData[key] === "0" || (rowData
      									&& rowData.addedProps
      									&& !rowData.addedProps.merged
      									&& meta[key].merge === "count"))
									? ""
									:
									Array.isArray(rowData[key])
										? rowData[key].join(" | ")
										:
										rowData[key]
						}
					</span>
				</div>
			)}
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
