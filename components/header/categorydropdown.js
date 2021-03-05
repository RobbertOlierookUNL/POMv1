import React from "react";

import { categories } from "../../config/globalvariables";


const CategoryDropdown = ({setter, getter}) => {
	const handleChange = e => {
		setter(e.target.value);
	};
	return (
		<select value={getter} onChange={handleChange}>
			{categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
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
          font: inherit;
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
