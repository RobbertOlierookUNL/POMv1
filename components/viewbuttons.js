import React from "react";
import { useRouter } from "next/router";

import { isNumeric } from "../lib/custom-hooks";
import { useViews } from "../lib/swr-hooks";



const ViewButtons = () => {
	const {views, isLoading} = useViews();
	const Router = useRouter();
	const handleClick = (viewName) => {
		if(Router.query.slug && isNumeric(Router.query.slug[0])){
			Router.push(`/${Router.query.slug[0]}/${viewName}`);
		} else{
			Router.push(`/${viewName}`);
		}
	};
	return (
		<div className="view-button-container">
			{!isLoading && views.map((view, i) =>
				<button key={i} className="view-button" onClick={() => handleClick(view.view_name)}>
					{view.view_name}
				</button>
			)}
			<style jsx>{`

      `}</style>
		</div>
	);
};


export default ViewButtons;
