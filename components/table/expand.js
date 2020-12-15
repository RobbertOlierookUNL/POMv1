import React, {useRef, useEffect, useState} from "react";

import { c } from "../../config/colors";



const Expand = ({keys, data, meta, active}) => {
	const expandCell = useRef(null);
	const [height, setHeight] = useState("auto");
	useEffect(async () => {
		await setHeight("auto");
		setHeight(expandCell.current.scrollHeight + 11.33 + "px");
	}, [expandCell.current !== null && expandCell.current.scrollHeight]);


	return (
		<td ref={expandCell} height={height} className={`expandCell ${active && "active"}`}>
			{keys && <div><dl className={"expandList"}>
				{keys.map((key, i) =>(
					<>
						<dt key={"dt" + i}>{meta[key].title || key}</dt>
						<dd key={"dd" + i}>{data[key]}</dd>
					</>
				))
				}

			</dl></div>}

			<style jsx>{`
        td {
          transform: scaleY(0);
          transition: transform 10ms linear, height 10ms linear, padding 10ms linear;
          padding: 0;
          height: 0;
          grid-column: 1/-1;
          background-color: white;
          background-color: ${c.primary_very_light.color};


        }
        .active{
          display: grid;
          transform: scaleY(1);
          max-height: 300px;
          grid-column: 1/-1;
          color: black;
          border: 1px solid ${c.gray_light.color};
          border-width: 0 0 1px 0;
          padding: 5px;
          height: ${height};
          visibility: visible;
        }
				.expandList {
				}

      `}</style>
		</td>
	);
};

export default Expand;
