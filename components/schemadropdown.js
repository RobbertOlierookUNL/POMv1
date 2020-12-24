import React from "react";
import useGlobal from "./store";

const SchemaDropdown = () => {
	const [value, setValue] = React.useState(10);
	const [, setSchema] = useGlobal(
		() => null,
		actions => actions.setSchema
	);
	return (
		<select
			value={value}
			onChange={(e)=>{setValue(e.target.value);
				setSchema(e.target.value);}}
		>
			<option value={0}>Geel-Blauw</option>
			<option value={1}>Roze-Blauw</option>
			<option value={2}>Roze-Groen</option>
			<option value={3}>Paars-Groen</option>
			<option value={4}>Geel-Paars</option>
			<option value={5}>Rood-Paars</option>
			<option value={6}>Geel-Roze</option>
			<option value={7}>Paars-Roze</option>
			<option value={8}>Roze-Rood</option>
			<option value={9}>Geel-Rood</option>
			<option value={10}>Groen-Geel</option>
			<option value={11}>Roze-Geel</option>
		</select>
	);
};


export default SchemaDropdown;
