import React from "react";

const CheckBox = ({id, check, toggle}) => {

	return (
		<input
			type="checkbox"
			id={id}
			name={id}
			checked={check}
			onChange={toggle}
		/>
	);
};


export default CheckBox;
