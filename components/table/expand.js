import React, {useRef, useEffect, useState, forwardRef} from "react";

import { c } from "../../config/colors";

const mergeRefs = (...refs) => {
	const filteredRefs = refs.filter(Boolean);
	if (!filteredRefs.length) return null;
	if (filteredRefs.length === 0) return filteredRefs[0];
	return inst => {
		for (const ref of filteredRefs) {
			if (typeof ref === "function") {
				ref(inst);
			} else if (ref) {
				ref.current = inst;
			}
		}
	};
};



const Expand = ({keys, data, meta, active, rowId}, ref) => {
	const expandCell = useRef(null);
	const [height, setHeight] = useState("auto");
	// const [once, setOnce] = useState(false);
	// useEffect(() => {
	// 	if (once) {
	// 		setHeight(expandCell.current.scrollHeight + 11.33 + "px");
	// 	}
	// }, [once]);
	useEffect(() => {
		data && setHeight(expandCell.current.scrollHeight + 1.33 + "px");
	}, [data]);



	return (
		<td ref={mergeRefs(expandCell, ref)} className={`expandCell ${active && "active"}`}>
			<div className={`container ${active && "active"}`}>
				{keys && <div className="active-visibility"><dl className={"expandList"}>
					{keys.map((key, i) =>(
						<>
							<dt key={"dt" + i}>{meta[key].title || key}</dt>
							<dd key={"dd" + i}>{data[key]}</dd>
						</>
					))
					}

				</dl></div>}
			</div>

			<style jsx>{`
        td {
          transform: scaleY(0);
          transition: transform 10ms linear, height 30ms linear;
          height: 0;
					padding: 0;
          grid-column: 1/-1;
          background-color: white;

        }
        td.active{
          display: grid;
          transform: scaleY(1);
          max-height: 300px;
          grid-column: 1/-1;
          color: black;
          border: 1px solid ${c.gray_light.color};
          border-width: 0 0 1px 0;
          height: ${height};
          visibility: visible;
        }
				.active-visibility {
				}
				.container {
					visibility: hidden;
					background-color: white;
					padding: 8px;
				}
				.container.active {
					visibility: visible;
				}




      `}</style>
		</td>
	);
};

export default forwardRef(Expand);
