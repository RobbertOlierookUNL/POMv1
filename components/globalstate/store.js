import React, {createContext, useReducer} from "react";
import Reducer from "./Reducer";


const initialState = {
	options: false,
	usermenu: false,
	menubutton: {current: null},
	userbutton: {current: null},
	active: false,
	topInView: true,
};
// const {options, usermenu, menubutton, userbutton, active, topInView } = initialState;
// const headerSubset = {options, usermenu, menubutton, userbutton};
// const rowSubset = {active, topInView};

const Store = ({children}) => {
	const [state, dispatch] = useReducer(Reducer, initialState);
	return (
		<Context.Provider value={[state, dispatch]}>
			{children}
		</Context.Provider>
	);
};

export const Context = createContext(initialState);
// export const HeaderContext = createContext(headerSubset);
// export const RowContext = createContext(rowSubset);
export default Store;
