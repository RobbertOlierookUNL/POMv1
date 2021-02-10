import React from "react";

import SchemaDropdown from "./schemadropdown";
import SilentFilters from "./silentfilters";
import ViewButtons from "./viewbuttons";



const Options = ({user, meta}) => {
	return (
		<div>
			{/* <SchemaDropdown/> */}
			<ViewButtons/>
			<SilentFilters user={user} meta={meta}/>
		</div>
	);
};

export default Options;
