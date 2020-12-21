import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import React, {useContext} from "react";

import { SchemaContext } from "../../pages/_app";
import { colorschematic } from "../../config/colors";








const TableHeadCell = ({data, colName, requestSort, sortConfig}) => {
	const schema = useContext(SchemaContext);

	return (
		<th onClick={() => requestSort(colName, data.valuetype)}>
			{
				sortConfig && sortConfig.key === colName &&
			(
				sortConfig.direction === "ascending" && <FontAwesomeIcon icon={faArrowDown} />
			||
				sortConfig.direction === "descending" && <FontAwesomeIcon icon={faArrowUp} />
			)}
			<style jsx>{`
          th{
						background-color: ${colorschematic(schema).primary.color};
						color: ${colorschematic(schema).primary.text};
            border: 1px solid ${colorschematic(schema).gray_light.color};
            border-width: 0 1px 0 0;
						text-overflow: clip;
				    white-space: nowrap;
				    overflow: hidden;
						grid-column-start: ${colName};
						cursor: pointer;
						position: relative;
						padding: 2px 0;
          }
					th:last-child {
						border-width: 0;
					}
					th{

					}
					th::after {
					  content: "${data.title || colName}";
					}
					th:hover {
						z-index: 5;
						min-width: 100%;
						width: fit-content;
						transition: width 1s linear;
						padding: 1px 3px;
					}
					th:hover::after {
						content: "${data.hovername || data.title || colName}";

					}
        `}</style>
			<style jsx global>{`
					td.${colName} {
					${data.textdisplay === "mono-right" &&
							`
							font-family: monospace;
							font-size: 1.25em;
							text-align: right;

							`}
					}
				`}</style>
		</th>


	);
};


export default TableHeadCell;
