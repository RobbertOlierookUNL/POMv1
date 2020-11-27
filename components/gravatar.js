import React from "react";
import c from "./colors";

const Gravatar = ({first_name, last_name, width}) => {
	const initials = first_name.charAt(0) + last_name.charAt(0);
	return (
		<>
			<div className='container'>
				<div className='initials'>
					{initials}
				</div>
			</div>
			<style jsx>{`
				.container {
	        display: inline-block;
	        vertical-align: middle;


	        position: relative;

	        background-color: ${c.gray_dark.color};
	        color: ${c.gray_dark.text};
					font-size: 0.7em;
	        border-radius: 50%;
					border: 1.5px solid white;
					// box-shadow: 1px 1px 1px white;
	        height: ${width || "48px"};
	        width: ${width || "48px"};
				}
				.initials {
					left: 50%;
	        position: absolute;
	        top: 50%;
	        transform: translate(-50%, -50%);
				}
        `}
			</style>
		</>
	);
};

export default Gravatar;
