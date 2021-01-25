import React from "react";

const SharedShadowModal = ({open, children}) => {
	return (
		<div>
			{children}
			<style jsx>{`
        opacity: ${open ? 1 : 0};
        pointer-events: ${open ? "auto" : "none"};
        transition: opacity 250ms;
        z-index: 11;
        background-color: white;
        position: absolute;
        left: 50%;
        top: 50%;
				padding: 0;
				border: 0;
				border-radius: 6px;
        transform: translate(-50%, -50%);
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
      `}</style>
		</div>
	);
};

export default SharedShadowModal;
