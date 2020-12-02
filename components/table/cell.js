import React from "react";
import c from "../colors";

const Cell = ({data, width}) => {
	return (
		<td>{data}
			<style jsx>{`
        td {
          border: 1px solid ${c.gray_light.color};
          border-width: 0 1px 1px 0;
					grid-column-end: span ${width};

        }
        td:last-child {
          border-width: 0 0 1px 0;
        }
    `}
			</style>
		</td>
	);
};

export default Cell;
