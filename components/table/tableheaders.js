import React from "react";
import TableHeadCell from "./tableheadcell";

const TableHeaders = ({meta, keys}) => {


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
          tr {
            display: flex;
          }
        `}
			</style>
		</thead>
	);
};

export default TableHeaders;
