import React from "react";

import {
	filterDisplayBarHeight,
	horPadding,
	toolBarHeight
} from "../../../config/globalvariables";
import { useTheme } from "../../../lib/custom-hooks";
import ToolbarIcon from "./toolbaricon";
import useGlobal from "../../store";






const Toolbar = ({options}) => {
	const {primary_dark, primary_very_light} = useTheme();

	const [, toggleSelectMode] = useGlobal(
		() => null,
		actions => actions.toggleSelectMode,
	);
	const [arrayOfFilters] = useGlobal(state => state.arrayOfFilters, () => null);

	return (
		<>
			<div className="toolbar">
				<div className="toolbarPart leftSide">
					<ToolbarIcon type={"multi-select"} iconClick={toggleSelectMode}/>
					<ToolbarIcon type={"filter"} iconClick={toggleSelectMode}/>

				</div>
				<div className="toolbarPart mid"></div>
				<div className="toolbarPart rightSide">
				</div>
			</div>
			<style jsx>{`
      .toolbar {
        width:100%;
        height: ${toolBarHeight};
        position: sticky;
				display: grid;
				align-items: center;
				grid-template-columns: [start] 1fr [midLeft] 1fr [midRight] 1fr [end];
        top: ${arrayOfFilters.length ? filterDisplayBarHeight : "0px"};
				transition: top 100ms ease-in;
        background-color: ${primary_dark.color};
        color: ${primary_very_light.color};
      }

			.toolbarPart {
				width: 100%;
				padding: 0 ${horPadding}px;
				gap: ${horPadding}px;
			}
			.leftSide {
				grid-column: start / midLeft;
				display: flex;
				justify-content: flex-start;
			}
			.mid {
				grid-column: midLeft / midRight;
				display: flex;
				justify-content: center;
			}
			.rightSide{
				grid-column: midRight / end;
				display: flex;
				justify-content: flex-end;
			}
    `}</style>
		</>
	);
};

export default Toolbar;
