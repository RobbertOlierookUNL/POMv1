import React from "react";

import AddViewForm from "../components/views/addviewform";
import GetViews from "../components/views/getviews";

import { useViews } from "../lib/swr-hooks";



const Views = () => {
	const {views, isLoading} = useViews();
	return (
		<>
			<GetViews views={views}/>
			<AddViewForm/>
		</>
	);
};



export default Views;
