import React from "react";

import { useColors, useTheme } from "../../../lib/custom-hooks";
import ToolbarIcon from "./toolbaricon";
import useGlobal from "../../store";




const Toolbar = ({options}) => {
	const {primary_dark} = useTheme();

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
				</div>
				<div className="toolbarPart mid"></div>
				<div className="toolbarPart rightSide">
				</div>
			</div>
			<style jsx>{`
      .toolbar {
        width:100%;
        height: 18px;
        position: sticky;
				display: grid;
				grid-template-columns: [start] 1fr [midLeft] 1fr [midRight] 1fr [end];
        top: ${arrayOfFilters.length ? "27px" : 0};
				transition: top 100ms ease-in;
        background-color: ${primary_dark.color};
        color: ${primary_dark.text};
      }

			.toolbarPart {
				width: 100%;
				padding: 0 2px;
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
