
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
	case "REMOVE_POST":
		return {
			...state,
			posts: state.posts.filter(post => post.id !== action.payload)
		};
	case "SET_ERROR":
		return {
			...state,
			error: action.payload
		};
	default:
		return state;
	}
};

export default Reducer;
