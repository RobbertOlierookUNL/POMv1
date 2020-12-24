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

export const expandOptions = (store, amount) => {
	store.setState({options: amount});
};
export const setMenuButton = (store, amount) => {
	store.setState({menuButton: amount});
};
export const expandUserMenu = (store, amount) => {
	store.setState({userMenu: amount});
};
export const setUserButton = (store, amount) => {
	store.setState({userButton: amount});
};
export const setTopInView = (store, amount) => {
	store.setState({topInView: amount});
};
export const setActive = (store, amount) => {
	store.setState({active: amount});
};
export const setSchema = (store, amount) => {
	const schema = amount;
	store.setState({...colorSchematic(schema)});
};
export const setSelectMode = (store, amount) => {
	store.setState({selectMode: amount});
};
