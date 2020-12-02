import React from "react";

const Expand = ({keys, data, active}) => {
	console.log(keys);
	return (
		<td className={!active && "hide"}>
			{keys && keys.map((key) =>{
				console.log(key);
				return(
					data[key]
				);}
			)
			}
			<style jsx>{`
        td {
          display: grid;
          grid-column: 1/-1;
        }
        .hide{
          display: none;
        }
      `}</style>
		</td>
	);
};

export default Expand;
