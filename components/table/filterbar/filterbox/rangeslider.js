// import { useForm } from "react-hook-form";
import React, {useState, useEffect} from "react";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";


import Button from "../../../button";
import useGlobal from "../../../store";



const RangeSlider = ({reference, filterName, close, parameters, level}) => {
	const [, addToFilters] = useGlobal(() => null, actions => actions.addToFilters);
	const {min, max, ggd} = parameters;
	// const { register, handleSubmit, errors } = useForm();
	const [value, setValue] = useState([min, max]);
	const step = 1 / Math.pow(10, ggd);

	const add = () => {
		const toText = value.join("-");
		addToFilters({
			shorthand: {
				filterName,
				value: toText
			},
			value,
			reference,
			level,
			filter: "range"

		});
		close();
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const handleMinInputChange = (event) => {
		const newValue = [...value];
		newValue[0] = event.target.value === "" ? "" : Number(event.target.value);
	 setValue(newValue);
	};
	const handleMaxInputChange = (event) => {
		const newValue = [...value];
		newValue[1] = event.target.value === "" ? "" : Number(event.target.value);
	 setValue(newValue);
	};
	const handleBlur = () => {
		if (value[0] < min) {
			const newValue= value;
			newValue[0] = min;
			setValue(newValue);
		} else if (value > max) {
			const newValue= [...value];
			newValue[1] = max;
			setValue(newValue);
		}
	};

	function valuetext(value) {
		return `${value}`;
	}

	useEffect(() => {
		//
	}, [min, max]);
	return (
		<form onSubmit={add} className="rangeslider">
			<h2>Waardes tussen..</h2>
			<div className="inputGrid">
				<Input
					value={value[0]}
					margin="dense"
					onChange={handleMinInputChange}
					onBlur={handleBlur}
					inputProps={{
						step,
						min,
						max,
						type: "number",
						"aria-labelledby": "input-slider",
					}}
				/>
				<Input
					value={value[1]}
					margin="dense"
					onChange={handleMaxInputChange}
					onBlur={handleBlur}
					inputProps={{
						step,
						min,
						max,
						type: "number",
						"aria-labelledby": "input-slider",
					}}
				/>
				<div style={{gridColumn: "span 2"}}>
					<Slider
						value={value}
						onChange={handleChange}
						valueLabelDisplay="auto"
						getAriaValueText={valuetext}
						min={min}
						max={max}
						step={step}
					/>
				</div>
			</div>
			<Button
				width={"100%"}
				style={{marginTop: "15px"}}
				type={"submit"}
			>
				Filter toevoegen
			</Button>
			<style jsx>{`
        h2 {
          text-align: left;
          margin: 0 0 12px;
        }
        .rangeslider {
          margin: 7px;
        }
				.inputGrid {
					display: grid;
					grid: 1fr 1fr / auto auto;
					gap: 15px;
				}
      `}
			</style>
		</form>
	);
};

export default RangeSlider;
