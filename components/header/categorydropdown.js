import React from "react";

import { categories } from "../../config/globalvariables";


const CategoryDropdown = ({setter, getter}) => {
	const handleChange = e => setter(e.target.value);
	return (
		<select value={getter} onChange={handleChange}>
			{categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
			<style jsx>{`
        select {
          pointer-events: auto;
        }
      `}</style>
		</select>
	);
};

export default CategoryDropdown;
