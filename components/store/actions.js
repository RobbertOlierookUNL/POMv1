// export const addToCounterA = (store, amount) => {
// 	const counterA = store.state.counterA + amount;
// 	store.setState({ counterA });
// };
//
// export const addToCounterB = (store, amount) => {
// 	const counterB = store.state.counterB + amount;
// 	store.setState({ counterB });
// };

import { colorSchematic } from "../../config/colors";

//Theme
export const setSchema = (store, schema) => {
	store.setState({...colorSchematic(schema)});
};

//Refs
export const setMenuButton = (store, ref) => {
	store.setState({menuButton: ref});
};
export const setUserButton = (store, ref) => {
	store.setState({userButton: ref});
};
export const setShadowRef = (store, ref) => {
	store.setState({shadowRef: ref});
};
export const setHeaderRef = (store, ref) => {
	store.setState({headerRef: ref});
};

//Specifics
export const expandOptions = (store, shouldExpand) => {
	store.setState({options: shouldExpand});
};
export const expandUserMenu = (store, shouldExpand) => {
	store.setState({userMenu: shouldExpand});
};
export const openFilterModal = (store, shouldOpen) => {
	store.setState({filterModal: shouldOpen});
};

export const setTopInView = (store, isInView) => {
	store.setState({topInView: isInView});
};
export const setActive = (store, activeRow) => {
	store.setState({active: activeRow});
};
export const toggleSelectMode = (store) => {
	store.setState({selectMode: !store.state.selectMode});
};

//Filters
export const addToFilters = (store, filter) => {
	store.setState({arrayOfFilters: [...store.state.arrayOfFilters, filter]});
};
export const clearFilters = (store) => {
	store.setState({arrayOfFilters: []});
};
export const removeFromFilters = (store, filter) => {
	store.setState({arrayOfFilters: [...store.state.arrayOfFilters.filter(item => item != filter)]});
};
