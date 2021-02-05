import React, {useRef, useEffect} from "react";

const Input = ({type, defaultValue, save}) => {
	const inputRef = useRef(null);
	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return (
		<span>
			<input
				type={type}
				ref={inputRef}
				defaultValue={(!defaultValue || defaultValue === "0") ? "" : defaultValue}
				onBlur={save}
				onKeyDown={(e) => {e.code === "Enter" && save(e);}}
			/>
			<style jsx>{`
        input {
            width: 100%;
            background: transparent;
            border: none !important;
            outline: none !important;
            padding: 0;
            font: inherit;
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



export default Input;
