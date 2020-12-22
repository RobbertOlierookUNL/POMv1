import React, { useContext, useRef, useMemo, useEffect, useCallback } from "react";
import handleViewport from "react-in-viewport";

import useGlobal from "../store";
import { SchemaContext } from "../../pages/_app";
import { colorschematic } from "../../config/colors";
import Cell from "./cell";
import Expand from "./expand";

const PreRow = ({id, meta, data, keys, additionalKeys, inViewport, forwardedRef}) => {
	const [active, setActive] = useGlobal(
		state => state.active,
		actions => actions.setActive
	);
	const [, setTopInView] = useGlobal(
		() => null,
		actions => actions.setTopInView
	);
	const expandRef = useRef(null);
	const schema = useContext(SchemaContext);
	const {gray_very_light, gray_light, tertiary} = useMemo(() => colorschematic(schema), []);

	const handleClick = (event) => {
		if (!expandRef.current.contains(event.target)) {
			active === id ?
				setActive(false)
				: setActive(id);
		}
	};

	// useCallback(() => {
	//   () => {handleClick(event);};
	// }, []);
	useEffect(() => {
		if (id === 10) {
			setTopInView(inViewport);
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
					background-color: ${tertiary.color} !important;
					color: ${tertiary.text};
					font-weight: bold;
					font-size: 0.97em;
					border: none;

				}
      `}</style>
		</tr>
	);
};

const Row = handleViewport(PreRow);


export default Row;
