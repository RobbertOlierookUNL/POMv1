
const Reducer = (state, action) => {
	switch (action.type) {
	case "EXPAND_OPTIONS":
		return {
			...state,
			options: action.payload
		};
	case "SET_MENUBUTTON":
		return {
			...state,
			menubutton: action.payload
		};
	case "EXPAND_USERMENU":
		return {
			...state,
			usermenu: action.payload
		};
	case "SET_USERBUTTON":
		return {
			...state,
			userbutton: action.payload
		};
	default:
		return state;
	}
};

export default Reducer;
