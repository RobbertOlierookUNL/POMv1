import React, {useState} from "react";

import Cell from "./cell";
import Expand from "./expand";
import c from "../colors";


const Row = ({id, meta, data, keys, additionalKeys}) => {
	const [active, setActive] = useState(false);
	const handleClick = () => {
		setActive(!active);
	};
	return (
		<tr className={active && "active"} onClick={handleClick}>
			{keys.map((key, i) =>
				<Cell data={data[key]} width={meta[key].widthweight} key={i}/>)
			}
			<Expand keys={additionalKeys} data={data} active={active}/>
			<style jsx>{`
        tr:nth-child(even){background-color: ${c.gray_very_light.color};}
        tr:hover {background-color: ${c.gray_light.color};}
				.active {background-color: ${c.gray_light.color};}
      `}</style>
		</tr>
	);
};



export default Row;
