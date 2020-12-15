import React from "react";

import { c } from "../../config/colors";
import TableHeadCell from "./tableheadcell";


const TableHeaders = ({meta, keys, totalWidth, requestSort}) => {

	return (
		<thead>
			<tr>
				{
					keys.map((col, i) => (
						<TableHeadCell requestSort={requestSort} data={meta[col]} backup={col} key={i}/>
					))
				}

			</tr>
			<style jsx>{`
        tr {
			    position: sticky;
					top: 0;
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
