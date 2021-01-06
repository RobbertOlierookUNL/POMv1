import React from "react";

import ToolbarIcon from "./toolbaricon";
import useGlobal from "../store";


const Toolbar = ({options}) => {
	const [quadiary] = useGlobal(
		state => state.quadiary,
		() => null
	);
	const [, toggleSelectMode] = useGlobal(
		() => null,
		actions => actions.toggleSelectMode,
	);
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
        height: 25px;
        position: sticky;
				display: grid;
				grid-template-columns: [start] 1fr [midLeft] 1fr [midRight] 1fr [end];
        top:0;
        background-color: ${quadiary.color};
        color: ${quadiary.text};
      }

			.toolbarPart {
				width: 100%;
				padding: 2px;
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
