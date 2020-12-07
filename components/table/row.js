import React, {useContext} from "react";

import Cell from "./cell";
import Expand from "./expand";
import c from "../colors";

import {Context} from "../globalstate/store";



const Row = ({id, meta, data, keys, additionalKeys}) => {
	const [state] = useContext(Context);

	return (
		<tr className={state.active === id && "active"}>
			{keys.map((key, i) =>
				<Cell data={data[key]} width={meta[key].widthweight} key={i} rowId={id}/>)
			}
			<Expand keys={additionalKeys} data={data} active={state.active === id}/>
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



export default Row;
