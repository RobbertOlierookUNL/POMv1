import React from "react";

const TableHeadCell = ({data}) => {
	console.log(data);
	return (
		<th>
			{data.title}
			<style jsx>{`
          th{
            flex: ${data.widthweight};
          }
        `}</style>
		</th>

		
	);
};


export default TableHeadCell;
