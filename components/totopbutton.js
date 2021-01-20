import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import React, {useContext} from "react";

import useGlobal from "./store";





const ToTopButton = ({handleClick, top, left}) => {
	const [topInView] = useGlobal(
		state => state.topInView,
		() => null
	);
	const [tertiary] = useGlobal(
		state => state.tertiary,
		() => null
	);
	return (
		<div onClick={handleClick} className="toTopButton">
			<FontAwesomeIcon icon={faArrowUp} />
			<style jsx>{`
        .toTopButton {
          z-index: 4;
          position: absolute;
          height: 50px;
          width: 50px;
          border-radius: 50%;
          top: ${top};
          left: ${left};
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
          opacity: ${topInView ? 0 : 0.8};
          background-color: ${tertiary.color};
          color: ${tertiary.text};
          text-align: center;
          padding: calc(10px - 0.18em) 10px 10px 10px;
          font-size: 30px;
          cursor: pointer;
          transform: scale(0.7);
          transition: all 0.2s linear
        }
        .toTopButton:hover {
          transform: scale(0.8);
          opacity: ${topInView ? "0" : "1"};
          visibility: ${topInView ? "hidden" : "visible"};


        }
      `}</style>
		</div>
	);
};



export default ToTopButton;
