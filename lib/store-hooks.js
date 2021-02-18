import React from "react";
import useGlobal from "../components/store";

const useGlobalThingTemplate = (value, type) => {
	const [returnedValue, storeSomething] = useGlobal(state => state[type], actions => actions.storeSomething);
	React.useEffect(() => {
		if (value) {
			storeSomething(value, type);
		}
	}, [value]);
	return returnedValue;
};


export const useGlobalUser = user => useGlobalThingTemplate(user, "user");
