import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";

import useGlobal from "../store";

const Cell = ({data, width, rowId, colName, inViewport}) => {
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
		>{data === false ?
				<Skeleton />
				:
				(!data || data === "0") ? "" : data
			}
			<style jsx>{`
        td {
          border: 1px solid ${gray_light.color};
          border-width: 0 1px 1px 0;
					/* grid-column-end: span ${width}; */
					cursor: pointer;
					padding: 2px;
			 	${active === rowId ? "" : (`
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;`)
		}
        }
        td:nth-last-child(2) {
          border-width: 0 0 1px 0;
        }
    `}
			</style>
		</td>
	);
};

export default Cell;
