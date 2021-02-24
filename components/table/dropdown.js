import React, {useState,useEffect} from "react";

const DropDown = ({defaultValue, save, options, formattedFirstOption}) => {
	// const [value, setValue] = useState(defaultValue);
	//
	// useEffect(() => {
	// 	setValue(defaultValue);
	// }, [defaultValue]);


	return (
		<span>
			<select
				value={(!defaultValue || defaultValue === "0") ? "" : defaultValue}
				onChange={save}
			>
				{options === 0 ?
					<>
						{formattedFirstOption}
						<option value={0}>0</option>
					</>
					: options.split(", ").map((o, i) => <option key={i} value={o}>{o}</option>)}
			</select>

			<style jsx>{`
        select {
            width: 100%;
            background: transparent;
            border: none !important;
            outline: none !important;
						color: inherit;
						text-align-last: right;
            padding: 0;
            margin: 0;
            font: inherit;
            -webkit-appearance: none;
            -moz-appearance: none;
            text-indent: 0px;
            text-overflow: '';
        }
				option {
					color: black;
				}
        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type=number] {
          -moz-appearance: textfield;
        }
        span {
            display: block;
            overflow: hidden;
        }
      `}
			</style>
		</span>
	);
};



export default DropDown;
