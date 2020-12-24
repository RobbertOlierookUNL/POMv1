import React from "react";
import ViewCard from "./viewcard.js";

const GetViews = ({views}) => {
	console.log(views);
	return (
		<div className="container">
			{views.map(view => (
				<ViewCard key={view.view_name} view={view}/>
			))}
			<style jsx>{`
        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
		</div>
	);
};

export default GetViews;
