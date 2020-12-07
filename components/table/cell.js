import React, {useContext} from "react";
import c from "../colors";
import {Context} from "../globalstate/store";


const Cell = ({data, width, rowId}) => {
	const [state, dispatch] = useContext(Context);
	const handleClick = () => {
		state.active === rowId ?
			dispatch({type: "SET_ACTIVE", payload: false})
			: dispatch({type: "SET_ACTIVE", payload: rowId});
	};
	return (
		<td onClick={handleClick}>{data}
			<style jsx>{`
        td {
          border: 1px solid ${c.gray_light.color};
          border-width: 0 1px 1px 0;
					grid-column-end: span ${width};
					cursor: pointer;

        }
        td:nth-last-child(2) {
          border-width: 0 0 1px 0;
        }
    `}
			</style>
		</td>
	);
};

export default Cell;
