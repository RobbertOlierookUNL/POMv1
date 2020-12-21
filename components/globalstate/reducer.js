
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
	case "SET_TOP_IN_VIEW":
		return {
			...state,
			topInView: action.payload
		};
	case "SET_ACTIVE":
		return {
			...state,
			active: action.payload
		};
	default:
		return state;
	}
};

// const Reducer = (state, action) => {
// 	switch (action.type) {
// 	case "EXPAND_OPTIONS":
// 		state.options = action.payload;
// 		return state;
// 	case "SET_MENUBUTTON":
// 		state.menubutton = action.payload;
// 		return state;
// 	case "EXPAND_USERMENU":
// 		state.usermenu = action.payload;
// 		return state;
// 	case "SET_USERBUTTON":
// 		state.userbutton = action.payload;
// 		return state;
// 	case "SET_TOP_IN_VIEW":
// 		state.topInView = action.payload;
// 		return state;
// 	case "SET_ACTIVE":
// 		state.active = action.payload;
// 		return state;
// 	default:
// 		return state;
// 	}
// };

export default Reducer;
