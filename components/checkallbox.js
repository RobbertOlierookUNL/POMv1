import React, {useState, useCallback, useEffect} from "react";
import useGlobal from "./store";

const CheckAllBox = () => {
	const [checked, toggleCheckAll] = useGlobal(state => state.checked, actions => actions.toggleCheckAll);
	const [indeterminate, setIndeterminate] = useState(false);
	const [check, setCheck] = useState(false);
	const indeterminateControl = useCallback((node) => {
		node && (node.indeterminate = indeterminate);
	}, [indeterminate]);


	const handleChange = () => {
		if (!indeterminate) {
			toggleCheckAll(!check);
			setCheck(!check);
		} else {
			setIndeterminate(false);
			toggleCheckAll(false);
			setCheck(false);
		}
	};


	useEffect(() => {
		const allValues = Object.values(checked);
		let iteratingValue;
		for (var value of allValues) {
			if ((value === true) && (iteratingValue !== false)) {
				iteratingValue = true;
			}
			else if ((value === false) && (iteratingValue !== true)) {
				iteratingValue = false;
			}
			else {
				iteratingValue = null;
				break;
			}
		}
		switch (iteratingValue) {
		case true:
			setIndeterminate(false);
			setCheck(true);
			break;
		case false:
			setIndeterminate(false);
			setCheck(false);
			break;
		default:
			setCheck(true);
			setIndeterminate(true);
		}
	}, [checked]);


	return (
		<input
			type="checkbox"
			ref={indeterminateControl}
			id={"select-all"}
			name={"select-all"}
			checked={check}
			onChange={handleChange}
		/>
	);
};


export default CheckAllBox;
