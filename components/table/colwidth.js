import React from "react";


const Colwidth = ({data, totalWidth}) => {
	return (
		<>
			<col span="1" id={data.title}></col>
			<style jsx>{`
        col {
        width: ${(parseInt(data.widthweight)/totalWidth) * 100}%;
      }
    `}</style>
		</>
	);
};



export default Colwidth ;
