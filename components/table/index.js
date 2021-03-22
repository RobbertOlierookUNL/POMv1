import {useRouter} from "next/router";
import React, { useState, useRef, useEffect } from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

import {
	filterAndUnitBarHeight,
	filterDisplayBarHeight,
	headerHeight,
	horPadding,
	tableHeadersBarHeight,
	toolBarHeight,
	verPadding,
	numberInView
} from "../../config/globalvariables";
import { useCheckBox } from "../../lib/custom-hooks";
import FilterBar from "./filterbar";
import FilterModal from "./filterbar/filtermodal";
import SharedShadowModal from "../sharedshadowmodal";
import TableBody from "./tablebody";
import TableHeaders from "./tableheaders";
import ToTopButton from "../totopbutton";
import Toolbar from "./toolbar";
import useGlobal from "../store";
















const Table = ({data}) => {
	console.log("rerender");
	const {
		filteredData,
		meta,
		keys,
		hasLoaded,
		filterParameters,
		sortedKeys,
		requestSort,
		sortConfig,
		updateEntry,
		salesMode,
		user,
		conversionMode,
		setConversionMode,
		country,
	} = data;
	const tableRef = useRef(null);
	const fakedata = new Array(50).fill(".");

	const [primary_very_light] = useGlobal(
		state => state.primary_very_light,
		() => null
	);
	const [gray_light] = useGlobal(
		state => state.gray_light,
		() => null
	);
	const [arrayOfFilters] = useGlobal(state => state.arrayOfFilters, () => null);
	const [filterModal] = useGlobal(
		state => state.filterModal,
	);
	const { isFallback } = useRouter();


	const [parameters, setParameters] = useState({minLoad: 0, maxLoad: 30});

	const {check, toggle, checked} = useCheckBox(sortedKeys);
	const [selectMode, setSelectMode] = useState(false);


	const updateParameters = (i) => {
		let min = i - (numberInView/2) + 10;
		if (min < 0) {
			min = 0;
		}
		let max = min+numberInView;
		if (sortedKeys.length && (max > (sortedKeys.length - 1))) {
			max = sortedKeys.length - 1;
			min = max-numberInView;
			if (min < 0) {
				min = 0;
			}
		}

		setParameters({minLoad: min, maxLoad: max});
	};

	const shouldUpdateParameters = i => i%(numberInView/2-10) === 0;

	useEffect(() => {
		updateParameters(0);
	}, [data.length]);


	const handleClick = () => {
		updateParameters(0);
		tableRef.current.scrollTo(0, 0);
	};


	return (
		<div className="outerContainer">
			<SkeletonTheme color={primary_very_light.color} highlightColor={"white"}>
				{hasLoaded && !isFallback &&
				<ToTopButton
					handleClick={handleClick}
					top={
						`calc(
							${headerHeight} +
							${verPadding}px +
							${arrayOfFilters.length ? filterDisplayBarHeight : "0px"} +
							${toolBarHeight} +
							${tableHeadersBarHeight} +
							${filterAndUnitBarHeight} +
							${verPadding}px)`
					}
					right={`${2*horPadding + 10}px`}
				/>}
				{!isFallback &&
				<SharedShadowModal open={filterModal}>
					<FilterModal
						meta={meta}
						keys={keys}
						filterParameters={filterParameters}
						sortedRowKeys={sortedKeys}
					/>
				</SharedShadowModal>
				}
				<div className="tableContainer" ref={tableRef}>
					<FilterBar/>
					<Toolbar
						data={filteredData}
						keys={keys.compact.concat(keys.expanded)}
						sortedRowKeys={sortedKeys}
						meta={meta}
						conversionMode={conversionMode}
						setConversionMode={setConversionMode}
						toggleSelectMode={() => setSelectMode(!selectMode)}
						checked={checked}
						selectMode={selectMode}
					/>
					{!isFallback ?
						<div className="table">
							<TableHeaders
								requestSort={requestSort}
								sortConfig={sortConfig}
								meta={meta}
								keysForTableCols={keys.compact}
								filterParameters={filterParameters}
								numberOfEntries={sortedKeys && sortedKeys.length}
								conversionMode={conversionMode}
								selectMode={selectMode}
							/>
							<TableBody
								meta={meta}
								data={filteredData}
								hasLoaded={hasLoaded}
								keysForTableCols={keys.compact}
								additionalColKeys={keys.expanded}
								sortedRowKeys={sortedKeys}
								parameters={parameters}
								updateParameters={updateParameters}
								shouldUpdateParameters={shouldUpdateParameters}
								updateEntry={updateEntry}
								conversionMode={conversionMode}
								toggle={toggle}
								check={check}
								checked={checked}
								selectMode={selectMode}
								salesMode={salesMode}
								user={user}
							 	country={country}
							/>
						</div>
						:
						<table className="table">
							<tbody>
								{fakedata.map((_, row) => (
									<tr key={row}>
										<td>
											<Skeleton />
										</td>
										<td>
											<Skeleton />
										</td>
										<td>
											<Skeleton />
										</td>
										<td>
											<Skeleton />
										</td>
										<td>
											<Skeleton />
										</td>
									</tr>
								))}
							</tbody>
						</table>

					}
				</div>

			</SkeletonTheme>
			<style jsx>{`
				.outerContainer {
					max-width: 1400px;
					margin: auto;
					position: relative;
				}
				.tableContainer {
					width: calc(100% - ${horPadding *2 - 0}px);
					overflow: auto;
					height: calc(100vh - 38.67px - ${verPadding * 2}px);
					position: relative;
					top: ${verPadding}px;
					left: ${horPadding}px;
					box-shadow: -1px 2px 10px rgba(0, 0, 0, 0.2);
					border-radius: 6px;
					background-color: ${gray_light.color};


				}
				.table {
					border-collapse: collapse;
					background-color: ${isFallback ? "red" : "white"};
					font-size: 0.7em;
					display: grid;
				}
		`}
			</style>
		</div>
	);

};

export default Table;
