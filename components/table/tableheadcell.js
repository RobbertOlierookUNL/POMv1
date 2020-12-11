import React from "react";

import { c } from "../../config/colors";




const TableHeadCell = ({data, backup}) => {
	return (
		<th>
			{data.title || backup}
			<style jsx>{`
          th{
						background-color: ${c.primary.color};
						color: ${c.primary.text};
            border: 1px solid ${c.gray_light.color};
            border-width: 0 1px 0 0;
						grid-column-end: span ${data.widthweight};
						position: sticky;
						top: 0;
          }
          th:last-child {
            border-width: 0;
          }
        `}</style>
		</th>


	);
};


export default TableHeadCell;
