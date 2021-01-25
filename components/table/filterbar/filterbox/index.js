import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuItem, Select } from "@material-ui/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React, {useState, useEffect} from "react";

import { useTheme } from "../../../../lib/custom-hooks";
import DatePicker from "./datepicker";
import DropDown from "./dropdown";
import RangeSlider from "./rangeslider";
import SearchField from "./searchfield";






const FilterBox = ({active, filtertype, filterName, valuetype, title, parameters, reference, close}) => {
	const {gray_light, primary_light} = useTheme();
	const placeholder = () => <></>;
	const [Filter, setFilter] = useState(() => placeholder);
	const [level, setLevel] = useState("toplevel");

	useEffect(() => {
		switch (filtertype) {
    	case "searchField":
    		setFilter(() => SearchField);
    		break;
		  case "dropdown":
		  	setFilter(() => DropDown);
			  break;
		  case "range":
	  		setFilter(() => RangeSlider);
		  	break;
		  case "datePicker":
			  setFilter(() => DatePicker);
			  break;
    	default:
    		switch (valuetype) {
      		case "number":
				    setFilter(() => RangeSlider);
      			break;
				  case "date":
				  	setFilter(() => DatePicker);
				    break;
      		default:
      			setFilter(() => SearchField);
    		}
  	}
	}, [filtertype, valuetype]);

	const handleChange = event => {
		setLevel(event.target.value);
	};

	return (
		<div className="filter-box">
			<div className="title">
				{title}
				{!!close &&
					<div className="close-button" onClick={close}>
						<FontAwesomeIcon icon={faTimes}/>
					</div>
				}
			</div>
			{parameters && level &&
				<div className="scale">
					<Select
						id="level"
						value={level}
						onChange={handleChange}
					>
						<MenuItem value={"toplevel"}>Toplevel</MenuItem>
						{parameters.batchlevel && <MenuItem value={"batchlevel"}>Batchlevel</MenuItem>}
					</Select>
				</div>
			}

			{active && level &&
        <Filter
        	reference={reference}
        	filterName={filterName}
        	close={close}
        	parameters={parameters[level]}
        	level={level}
        />}
			<style jsx>{`
        .filter-box {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          height: ${active ? "auto" : 0};
          min-height: ${active ? "150px" : 0};
          width: ${active ? "200px" : 0};
          line-height: ${active ? "inherit" : 0};
          overflow: ${active ? "auto" : "hidden"};
					overflow-x: hidden;
          transition: min-height 100ms ease-in, width 100ms ease-in;
          background-color: white;
          /* ${gray_light.color}; */
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
        }
        .title {
          background-color: ${primary_light.color};
          color: ${primary_light.text};
          line-height: 25px;
					height: 25px;
        }
        .close-button {
          float: right;
					position: absolute;
          cursor: pointer;
          color: ${gray_light.color};
					right: 7px;
					top: 0;
          line-height: 25px;
          font-size: 1.5em;
          transform: scale(1);
          transition: color 100ms, transform 100ms;
        }
        .close-button:hover {
          color: white;
          transform: scale(1.1);
        }
				.scale {
					transform: scale(0.8);
				}
      `}
			</style>
		</div>
	);
};


export default FilterBox;
