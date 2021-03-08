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
					width: 710px;
					place-self: center;
					box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }
      `}</style>
		</div>
	);
};


export default CustomerDeals;
