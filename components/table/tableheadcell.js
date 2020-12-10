import React from "react";

import { c } from "../../config/colors";




const TableHeadCell = ({data}) => {
	return (
		<th>
			{data.title}
			<style jsx>{`
          th{
            border: 1px solid ${c.gray_light.color};
            border-width: 0 1px 0 0;
						grid-column-end: span ${data.widthweight};
          }
          th:last-child {
            border-width: 0;
          }
        `}</style>
		</th>


	);
};


export default TableHeadCell;
