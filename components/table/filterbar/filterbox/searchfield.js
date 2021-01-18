import React from "react";
import useGlobal from "../../../store";

const SearchField = ({reference, filterName}) => {
	const [, addToFilters] = useGlobal(() => null, actions => actions.addToFilters);
	const add = () => {
		addToFilters({
			shorthand: {
				filterName,
				value: "hi"
			},
			value: "hi",
			reference,
		});
	};
	return (
		<div onClick={add}>hi</div>
	);
};

export default SearchField;
