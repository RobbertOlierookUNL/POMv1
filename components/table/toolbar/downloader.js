import React, {useEffect} from "react";

import { useEntries } from "../../../lib/swr-hooks";


const Downloader = ({terminate, download}) => {
	const {data, isLoading} = useEntries();
	console.log("hi");
	useEffect(() => {
		if (!isLoading) {
			download(data);
			terminate();
		}
	}, [data, isLoading]);
	return (
		<></>
	);
};



export default Downloader;
