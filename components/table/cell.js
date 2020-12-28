import React from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";

import useGlobal from "../store";


const Cell = ({cellData, width, rowId, colName, noExpand}) => {
	const [active] = useGlobal(
		state => state.active,
		() => null
	);
	const [gray_light] = useGlobal(
		state => state.gray_light,
		() => null
	);
	return (
		<td className={colName}
		>{cellData === false ?
				<Skeleton />
				: (moment.isMoment(cellData)) ? cellData.format("YYYY-MM-DD") :
					(!cellData || cellData === "0") ? "" : cellData
			}
			<style jsx>{`
        td {
          border: 1px solid ${gray_light.color};
          border-width: 0 1px 1px 0;
					/* grid-column-end: span ${width}; */
					cursor: pointer;
					padding: 2px;
			 	${(active === rowId) || noExpand ? "" : (`
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

export default Cell;
