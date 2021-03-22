import React from "react";

import { countries } from "../../config/globalvariables";



const CategoryDropdown = ({setter, getter}) => {
	const handleChange = e => {
		setter(e.target.value);
	};
	return (
		<select value={getter} onChange={handleChange}>
			{countries.map(cou => <option key={cou} value={cou}>{cou}</option>)}
			<style jsx>{`
        select {
          pointer-events: auto;
          cursor: pointer;
          background: transparent;
          border: 1px solid white !important;
          border-radius: 7px;
          outline: none !important;
          color: inherit;
          padding: 0;
          margin: 0;
					margin-left: 7px;
					/* transform: translateY(-1.5px); */
          font: inherit;
					font-size: 1.2em;
          /* -webkit-appearance: none;
          -moz-appearance: none; */
          text-indent: 0px;
          text-overflow: '';
        }
        option {
          color: black;
        }
      `}</style>
		</select>
	);
};

export default CategoryDropdown;
