import React from "react";

import { c } from "../config/colors";
import Shadow from "./shadow";


const Modal = ({header, children}) => {
	return (
		<>
			<div className={"modal"}>
				<div className={"header"}>
					<b>{header}</b>
				</div>
				<div className={"body"}>{children}</div>
			</div>
			<Shadow thickness={0.1} selfAnimate clickthrough={false}/>
			<style jsx>{`
        .modal {
          z-index: 2;
          background-color: white;
          position: absolute;
          width: 300px;
          left: 50%;
          top: 33%;
          transform: translate(-50%, -50%);
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        }
        .header{
          background-color: ${c.primary.color};
          color: ${c.primary.text};
          padding: 7px 0 7px 14px;
        }
        .body {
          padding: 14px;
        }
      `}</style>
		</>
	);
};



export default Modal;
