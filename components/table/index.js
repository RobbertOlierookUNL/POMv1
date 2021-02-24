import React, { useState, useRef } from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

import {
	filterAndUnitBarHeight,
	filterDisplayBarHeight,
	headerHeight,
	horPadding,
	tableHeadersBarHeight,
	toolBarHeight,
	verPadding
} from "../../config/globalvariables";
import FilterBar from "./filterbar";
import FilterModal from "./filterbar/filtermodal";
import SharedShadowModal from "../sharedshadowmodal";
import TableBody from "./tablebody";
import TableHeaders from "./tableheaders";
import ToTopButton from "../totopbutton";
import Toolbar from "./toolbar";
import useGlobal from "../store";
import {useRouter} from "next/router";















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
		user,
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


	const [scrollTop, setScrollTop] = useState(false);
	const handleClick = () => {
		setScrollTop(true);
		tableRef.current.scrollTo(0, 0);
	};


	return (

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
						/>
						<TableBody
							meta={meta}
							data={filteredData}
							hasLoaded={hasLoaded}
							keysForTableCols={keys.compact}
							additionalColKeys={keys.expanded}
							sortedRowKeys={sortedKeys}
							scrollTop={scrollTop}
							setScrollTop={setScrollTop}
							updateEntry={updateEntry}
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
			<style jsx>{`
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
					width: 100%;
					font-size: 0.7em
				}
			`}
			</style>
		</SkeletonTheme>
	);

};

export default Table;
