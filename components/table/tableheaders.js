import React from "react";
import TableHeadCell from "./tableheadcell";
import c from "../colors";

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
        thead {
          background-color: ${c.quadiary.color};
          color: ${c.quadiary.text};
        }
      `}</style>
		</thead>
	);
};

export default TableHeaders;
