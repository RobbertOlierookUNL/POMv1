import React from "react";
import useGlobalHook from "use-global-hook";

import { colorSchematic, staticColors } from "../../config/colors";
import * as actions from "./actions";


const initialState = {
	options: false,
	userMenu: false,
	filterModal: false,
	menuButton: {current: null},
	userButton: {current: null},
	setShadowRef: {current: null},
	headerRef: {current: null},
	// formRefs: {
	// 	rollRef: {current: null},
	// 	categoryRef: {current: null},
	// 	chainRef: {current: null}},
	active: false,
	topInView: true,
	selectMode: false,
	arrayOfFilters: [],
	...staticColors,
	...colorSchematic(10)
};

export const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
