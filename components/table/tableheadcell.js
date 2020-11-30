import React from "react";

const TableHeadCell = ({data}) => {
	console.log(data);
	return (
		data.display === "compact" && (
			<th>
				{data.title}
				<style jsx>{`
          th{
            flex: ${data.widthweight};
          }
        `}</style>
			</th>

		)
	);
};


export default TableHeadCell;
