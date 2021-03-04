import NumberFormat from "react-number-format";
import React, {useMemo} from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment-timezone";

import { errorRGB, warningRGB } from "../../config/globalvariables";





const Cell = ({cellData, omit, active, colName, noExpand, compare, valueType, inEuro, isPercentage, theme, rowData, inRangeOf, dateErrorOn, dateWarnOn, convertable, conversionRate, count}) => {
	const {gray_light, gray_very_light, gray_dark} = theme;
	const rangeError = useMemo(() => (inRangeOf && (cellData > rowData[inRangeOf]) || (Math.sign(cellData) === -1)), [inRangeOf, cellData, rowData]);
	const formatDisplay = useMemo(() => {
		if (cellData === false || cellData == "undefined") {
			return "loading";
		} else if (!cellData || cellData === "0" || omit) {
			return "empty";
		} else if (valueType === "date") {
			return "date";
		} else if (count) {
			return "count";
		} else if (valueType === "number") {
			return "number";
		} else if (Array.isArray(cellData)) {
			return "multi";
		} else {
			return false;
		}
	}, [cellData, valueType, omit]);

	const convertedData = useMemo(() => {
		if (formatDisplay === "number" && (convertable === "multiply" || convertable === "divide")) {
			if (convertable === "multiply") {
				console.log({cellData});
				return cellData * conversionRate;
			}
			return cellData / (conversionRate || 1);
		}
		return cellData;
	}, [formatDisplay, cellData, convertable, conversionRate]);

	const monthDiff = useMemo(() => {
		if ((formatDisplay === "date") && cellData) {
			const today = moment();
			const thisDay = moment(cellData);
			if (thisDay.isBefore(today)) {
				return 0;
			}
			return thisDay.diff(today, "weeks", true);
		}
		return false;
	}, [formatDisplay, cellData]
	);
	const dateError = useMemo(() => ((monthDiff === 0 || monthDiff) && dateErrorOn) && (monthDiff <= dateErrorOn), [monthDiff, dateErrorOn]);
	const dateWarningNumber = useMemo(() => {
		if(!monthDiff) return false;
		const thisErrorDate = (dateErrorOn || 0);
		const errorWarnDiff = (dateWarnOn - thisErrorDate);
		let num = monthDiff - thisErrorDate;
		if ((num < 0) || (num > errorWarnDiff)) return false;
		return (errorWarnDiff - num)/(errorWarnDiff * 2.5) + 0.15;
	}, [monthDiff, dateErrorOn, dateWarnOn]);
	return (
		<div
			className={"td " + colName +
			(rangeError || dateError ? " error" : "") +
			(dateWarningNumber ? " warn" : "") +
			(((noExpand && (compare || !cellData)) && (cellData === compare)) ? " same" : "")
			}
		>
			{
				(formatDisplay === "loading" && <Skeleton />)
				||
				(formatDisplay === "empty" &&  "")
				||
				(formatDisplay === "count" && count)
				||
				(formatDisplay === "date" && moment(cellData).format("YYYY-MM-DD"))
				||
				(formatDisplay === "number" && <NumberFormat
					value={convertedData}
					decimalScale={2}
					thousandSeparator={"."}
					decimalSeparator={","}
					fixedDecimalScale={inEuro}
					prefix={inEuro ? "€" : ""}
					suffix={isPercentage ? "%" : ""}
					displayType={"text"}
				/>)
				||
				(formatDisplay === "multi" && <i>..</i>)
				||
				(!formatDisplay && cellData)
			}

			{/*

			// || !rowInViewPort
				?
				<Skeleton />
				:

				(!cellData || cellData === "0" || omit)
					?
					""
					:
					(valueType === "date"
						?
						moment(cellData).format("YYYY-MM-DD")
						:
						(valueType === "number")
						  ?
							<NumberFormat
								value={cellData}
								decimalScale={2}
								thousandSeparator={"."}
								decimalSeparator={","}
								fixedDecimalScale={inEuro}
								prefix={inEuro ? "€" : ""}
								displayType={"text"}
							 />
							:
							Array.isArray(cellData)
								?
								<i>..</i>
								:
								cellData
					)



			} */}
			<style jsx>{`
        .td {
          border: 1px solid ${gray_light.color};
          border-width: 0 1px 1px 0;
					grid-column-start: ${colName};
					cursor: pointer;
					padding: 2px;
			 	${active || noExpand ? "" : (`
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					`)
		}
        }
        .td:nth-last-child(${noExpand ? 1 : 2}) {
          border-width: 0 0 1px 0;
        }
				.error {
					color: white;
					background:
						rgb(${errorRGB});
				}
				.warn {
					color: black;
					background:
						rgba(${warningRGB}, ${dateWarningNumber});
				}
				.same {
					font-weight: normal;
					color: ${gray_dark.color};
					background-color: ${gray_very_light.color};
				}
    `}
			</style>
		</div>
	);
};

/* .editable:after {
	content: '';
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 0 5px 5px 0;
	border-color: transparent ${secondary.color} transparent transparent;
	right: 0;
	top: 0;
	position: absolute;
} */
export default Cell;
