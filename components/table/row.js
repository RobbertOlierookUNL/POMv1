import React, {useContext} from "react";

import {Context} from "../globalstate/store";
import { c } from "../../config/colors";
import Cell from "./cell";
import Expand from "./expand";
import handleViewport from "react-in-viewport";




const PreRow = ({id, meta, data, keys, additionalKeys, inViewport, forwardedRef}) => {
	const [state] = useContext(Context);

	return (
		<tr className={state.active === id && "active"} ref={forwardedRef}>
			<>
				{keys.map((key, i) =>
					<Cell data={data === false ? data : data[key]} width={meta[key].widthweight} key={i} rowId={id}/>
				)}
				<Expand keys={additionalKeys} data={data} active={state.active === id}/>
			</>
			<style jsx>{`
        tr:nth-child(even){background-color: ${c.gray_very_light.color};}
        tr:hover {background-color: ${c.gray_light.color};}
				.active, .active:hover {
					background-color: ${c.primary.color} !important;
					color: ${c.primary.text};
					border: none;
				}
      `}</style>
		</tr>
	);
};

const Row = handleViewport(PreRow);


export default Row;
