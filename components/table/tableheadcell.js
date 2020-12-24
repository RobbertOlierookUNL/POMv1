import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import React, {useContext} from "react";

import useGlobal from "../store";







const TableHeadCell = ({data, colName, requestSort, sortConfig}) => {
	const [primary] = useGlobal(
		state => state.primary,
		() => null
	);
	const [gray_light] = useGlobal(
		state => state.gray_light,
		() => null
	);
	const [tertiary] = useGlobal(
		state => state.tertiary,
		() => null
	);
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
						background-color: ${primary.color};
						color: ${primary.text};
            border: 1px solid ${gray_light.color};
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
						position: relative;
						z-index: 5;
						min-width: 100%;
						width: fit-content;
						transition: all 200ms linear;
						padding: 1px 3px;
						background-color: ${tertiary.color};
						color: ${tertiary.text};
					}
					th:hover::after {
						content: "${data.hovername || data.title || colName}";

					}
        `}</style>
			<style jsx global>{`
					td.${colName} {
					${data.textdisplay === "mono-right" ?
			`
							font-family: monospace;
							font-size: 1.25em;
							text-align: right;

							` : ""}
					}
				`}</style>
		</th>


	);
};


export default TableHeadCell;
