import React from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";

import { useTheme } from "../../lib/custom-hooks";



const Cell = ({cellData, omit, active, colName, noExpand}) => {
	const {gray_light} = useTheme();

	return (
		<td
			className={colName}
		>
			{(cellData === false)
				?
				<Skeleton />
				:

				(moment.isMoment(cellData)
					?
					cellData.format("YYYY-MM-DD")
					:

					(!cellData || cellData === "0" || omit)
						?
						""
						:
						Array.isArray(cellData)
							?
							<i>..</i>
							:
							cellData
				)



			}
			<style jsx>{`
        td {
          border: 1px solid ${gray_light.color};
          border-width: 0 1px 1px 0;
					grid-column-start: ${colName};
					cursor: pointer;
					padding: 2px;
			 	${active || noExpand ? "" : (`
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;`)
		}
        }
        td:nth-last-child(${noExpand ? 1 : 2}) {
          border-width: 0 0 1px 0;
        }
    `}
			</style>
		</td>
	);
};

/* .editable:after {
	content: '';
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 0 5px 5px 0;
	border-color: transparent ${secondary.color} transparent transparent;
	right: 0;
	top: 0;
	position: absolute;
} */
export default Cell;
