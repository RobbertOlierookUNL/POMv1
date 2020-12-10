import React from "react";

import { c } from "../../config/colors";
import TableHeadCell from "./tableheadcell";


const TableHeaders = ({meta, keys, totalWidth}) => {

	return (
		<thead>
			<tr>
				{
					keys.map((col, i) => (
						<TableHeadCell data={meta[col]} key={i}/>
					))
				}

			</tr>
			<style jsx>{`
        thead {
          background-color: ${c.quadiary.color};
          color: ${c.quadiary.text};
        }

      `}</style>
			<style jsx global>{`
				tr {
					display: grid;
		    	grid-template-columns: repeat(${totalWidth}, 1fr);
				}
			`}</style>
		</thead>
	);
};

export default TableHeaders;
