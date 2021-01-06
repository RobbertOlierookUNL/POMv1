import React, {useContext} from "react";

import useGlobal from "./store";



const Gravatar = ({first_name, last_name, width}) => {
	const [secondary] = useGlobal(
		state => state.secondary,
		() => null
	);
	const [tertiary] = useGlobal(
		state => state.tertiary,
		() => null
	);
	let initials;
	if (first_name && last_name) {
		initials = first_name.charAt(0) + last_name.charAt(0);
	}
	return (
		<>
			<div className='container'>
				<div className='initials'>
					<b>{initials}</b>
				</div>
			</div>
			<style jsx>{`
				.container {
					opacity: ${first_name && last_name ? 1 : 0};
	        display: inline-block;
	        vertical-align: middle;
	        position: relative;
					/* right: 5px; */
	        background-color: ${tertiary.color};
	        color: ${tertiary.text};
					font-size: 0.7em;
	        border-radius: 50%;
					border: 1.5px solid ${tertiary.color};
	        height: ${width || "48px"};
	        width: ${first_name && last_name ? (width || "48px") : 0};
					transition: all 0.2s ease-in-out;

				}

				.container:hover {
					filter: drop-shadow(0px 0px 5px ${secondary.color});
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
