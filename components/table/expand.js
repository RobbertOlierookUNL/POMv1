import React, {useRef, useEffect, useState} from "react";
import c from "../colors";

const Expand = ({keys, data, active}) => {
	const expandCell = useRef(null);
	const [height, setHeight] = useState("auto");

	useEffect(async () => {
		await setHeight("auto");
		setHeight(expandCell.current.scrollHeight + 11.33 + "px");
	}, []);
	return (
		<td ref={expandCell} className={active && "active"}>
			{keys && keys.map((key) =>{
				return(
					key + ": " + data[key]
				);}
			)
			}
			<style jsx>{`
        td {
          transform: scaleY(0);
          transition: transform 100ms ease-in, height 100ms ease-in, padding 100ms ease-in;
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
      `}</style>
		</td>
	);
};

export default Expand;
