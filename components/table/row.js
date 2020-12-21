import React, { useContext, useRef, useMemo, useEffect } from "react";
import handleViewport from "react-in-viewport";

import {Context} from "../globalstate/store";
import { SchemaContext } from "../../pages/_app";
import { colorschematic } from "../../config/colors";
import Cell from "./cell";
import Expand from "./expand";






const PreRow = ({id, meta, data, keys, additionalKeys, inViewport, forwardedRef}) => {
	const [{active}, dispatch] = useContext(Context);
	const expandRef = useRef(null);
	const schema = useContext(SchemaContext);
	const {gray_very_light, gray_light, primary_very_light} = useMemo(() => colorschematic(schema), []);

	const handleClick = (event) => {
		if (!expandRef.current.contains(event.target)) {
			active === id ?
				dispatch({type: "SET_ACTIVE", payload: false})
				: dispatch({type: "SET_ACTIVE", payload: id});
		}
	};
	useEffect(() => {
		if (id === 10) {
			dispatch({type: "SET_TOP_IN_VIEW", payload: inViewport});
		}
	}, [inViewport]);




	return (
		<tr className={active === id && "active"} onClick={inViewport ? handleClick : undefined} ref={forwardedRef}>
			<>
				{keys.map((key, i) =>
					<Cell data={data === false ? data : data[key]} inViewport={inViewport} colName={key} width={meta[key].widthweight || 12} key={i} rowId={id}/>
				)}
				<Expand keys={additionalKeys} ref={expandRef} meta={meta} data={data} rowId={id} active={active === id}/>
			</>
			<style jsx>{`
        tr:nth-child(even){background-color: ${gray_very_light.color};}
        tr:hover {background-color: ${gray_light.color};}
				.active, .active:hover {
					background-color: ${primary_very_light.color} !important;
					color: ${primary_very_light.text};
					border: none;
				}
      `}</style>
		</tr>
	);
};

const Row = handleViewport(PreRow);


export default Row;
