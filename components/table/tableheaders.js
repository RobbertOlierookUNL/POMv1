import React from "react";
import TableHeadCell from "./tableheadcell";

const TableHeaders = ({meta, cols}) => {


	return (
		<thead>
			<tr>
				{
					cols.map((col, i) => (
						<TableHeadCell data={meta[col]} key={i}/>
					))
				}

			</tr>
			<style jsx>{`
          tr {
            display: flex;
          }
        `}
			</style>
		</thead>
	);
};

export default TableHeaders;
