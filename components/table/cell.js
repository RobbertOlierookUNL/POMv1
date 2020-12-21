import React, {useContext, useState, useEffect} from "react";
import {Context} from "../globalstate/store";
import { c } from "../../config/colors";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";




const Cell = ({data, width, rowId, colName, inViewport}) => {
	const [{active}] = useContext(Context);


	return (
		<td className={colName}
		>{data === false ?
				<SkeletonTheme color={c.primary_very_light.color} highlightColor={"white"}>
					<Skeleton />
				</SkeletonTheme>
				:
				(!data || data === "0") ? "" : data
			}
			<style jsx>{`
        td {
          border: 1px solid ${c.gray_light.color};
          border-width: 0 1px 1px 0;
					/* grid-column-end: span ${width}; */
					cursor: pointer;
					padding: 2px;
			 	${active === rowId || (`
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
