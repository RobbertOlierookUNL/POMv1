import React, {useContext, useRef} from "react";

import {Context} from "../globalstate/store";
import { c } from "../../config/colors";
import Cell from "./cell";
import Expand from "./expand";
import handleViewport from "react-in-viewport";




const PreRow = ({id, meta, data, keys, additionalKeys, inViewport, forwardedRef}) => {
	const [state, dispatch] = useContext(Context);
	const expandRef = useRef(null);
	const handleClick = (event) => {
		if (!expandRef.current.contains(event.target)) {
			state.active === id ?
				dispatch({type: "SET_ACTIVE", payload: false})
				: dispatch({type: "SET_ACTIVE", payload: id});
		}
	};


	return (
		<tr className={state.active === id && "active"} onClick={inViewport ? handleClick : undefined} ref={forwardedRef}>
			<>
				{keys.map((key, i) =>
					<Cell data={data === false ? data : data[key]} inViewport={inViewport} colName={key} width={meta[key].widthweight || 12} key={i} rowId={id}/>
				)}
				<Expand keys={additionalKeys} ref={expandRef} meta={meta} data={data} rowId={id} active={state.active === id}/>
			</>
			<style jsx>{`
        tr:nth-child(even){background-color: ${c.gray_very_light.color};}
        tr:hover {background-color: ${c.gray_light.color};}
				.active, .active:hover {
					background-color: ${c.primary_very_light.color} !important;
					color: ${c.primary_very_light.text};
					border: none;
				}
      `}</style>
		</tr>
	);
};

const Row = handleViewport(PreRow);


export default Row;
