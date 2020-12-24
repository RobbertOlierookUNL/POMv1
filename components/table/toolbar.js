import React from "react";
import useGlobal from "../store";

const Toolbar = () => {
	const [quadiary] = useGlobal(
		state => state.quadiary,
		() => null
	);
	return (
		<>
			<div className="toolbar"></div>
			<style jsx>{`
      .toolbar {
        width:100%;
        height: 25px;
        position: sticky;
        top:0;
        background-color: ${quadiary.color};
        color: ${quadiary.text};

      }
    `}</style>
		</>
	);
};

export default Toolbar;
