import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";

import {Context} from "../globalstate/store";
import { SchemaContext } from "../../pages/_app";
import { colorschematic } from "../../config/colors";






const Cell = ({data, width, rowId, colName, inViewport}) => {
	const [{active}] = useContext(Context);
	const schema = useContext(SchemaContext);

	return (
		<td className={colName}
		>{data === false ?
				<Skeleton />
				:
				(!data || data === "0") ? "" : data
			}
			<style jsx>{`
        td {
          border: 1px solid ${colorschematic(schema).gray_light.color};
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
