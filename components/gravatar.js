import React from "react";
import c from "./colors";

const Gravatar = ({first_name, last_name, width}) => {
	let initials = "?";
	if (first_name && last_name) {
		initials = first_name.charAt(0) + last_name.charAt(0);
	}
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
	        height: ${width || "48px"};
	        width: ${width || "48px"};
					transition: all 0.2s ease-in-out;

				}

				.container:hover {
					filter: drop-shadow(0px 0px 5px ${c.secondary.color});
					cursor: pointer;
					transform: scale(1.2, 1.2);

				}

				.initials {
					left: 50%;
	        position: absolute;
	        top: 50%;
	        transform: translate(-50%, -50%);
					pointer-events: none;
					user-select: none;
				}
        `}
			</style>
		</>
	);
};

export default Gravatar;
