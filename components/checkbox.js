import React, {useEffect} from "react";
import useGlobal from "./store";

const CheckBox = ({id}) => {
	const [checked, toggleCheckBox] = useGlobal(state => state.checked, actions => actions.toggleCheckBox);
	const check = !!checked[id];
	const toggle = () => toggleCheckBox(id, !check);

	useEffect(() => {
		toggleCheckBox(id, check);
	}, []);


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
