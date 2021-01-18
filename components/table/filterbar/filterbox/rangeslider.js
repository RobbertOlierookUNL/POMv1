// import { useForm } from "react-hook-form";
import React, {useState} from "react";
import Slider from "@material-ui/core/Slider";

import Button from "../../../button";
import useGlobal from "../../../store";



const RangeSlider = ({reference, filterName, close}) => {
	const [, addToFilters] = useGlobal(() => null, actions => actions.addToFilters);
	// const { register, handleSubmit, errors } = useForm();
	const [value, setValue] = useState([0, 100]);

	const add = ({filter}) => {
		let reducedLength;
		if (filter.length < 7) {
			reducedLength = filter;
		} else {
			reducedLength = `${filter.substring(0,5)}..`;
		}
		addToFilters({
			shorthand: {
				filterName,
				value: reducedLength
			},
			value: filter,
			reference,
		});
		close();
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	function valuetext(value) {
		return `${value}`;
	}
	return (
		<form onSubmit={add} className="rangeslider">
			<h2>Filteren</h2>
			<Slider
			        value={value}
			        onChange={handleChange}
			        valueLabelDisplay="auto"
			        aria-labelledby="range-slider"
			        getAriaValueText={valuetext}
			      />
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
          margin: 0;
        }
        .rangeslider {
          margin: 7px;
        }
      `}
			</style>
		</form>
	);
};

export default RangeSlider;
