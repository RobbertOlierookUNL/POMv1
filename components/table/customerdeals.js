import React from "react";

import CustomerDealsContent from "./customerdealscontent";







const CustomerDeals = (props) => {

	return (
		<div className="container">
			{props.active && <CustomerDealsContent {...props}/>}
			<style jsx>{`
        .container {
          background-color: white;
          height: 270px;
        }
      `}</style>
		</div>
	);
};


export default CustomerDeals;
