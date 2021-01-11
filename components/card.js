import React from "react";

import { useColors, useTheme } from "../lib/custom-hooks";
import useGlobal from "./store";



const Card = ({title, titlefloater, children, bodyPadding=false}) => {
	const {primary} = useTheme();
	return (
		<>
			<div className="card-header">
				{title}
				{titlefloater && <span className="float-right">{titlefloater}</span>}
			</div>
			<div className="card-body">
				{children}
			</div>
			<style jsx>{`
        .card-header{
          background-color: ${primary.color};
          color: ${primary.text};
          padding: 4px;
          position: sticky;
          top: 0;

        }
        .card-body{
          padding: ${bodyPadding ? bodyPadding === "text" ? "2px 4px" : "4px" : 0};
        }
        .float-right {
          float: right;

        }
      `}</style>
		</>
	);
};


export default Card;
