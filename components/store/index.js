import React from "react";
import useGlobalHook from "use-global-hook";

import { colorSchematic, staticColors } from "../../config/colors";
import * as actions from "./actions";


const initialState = {
	options: false,
	userMenu: false,
	menuButton: {current: null},
	userButton: {current: null},
	active: false,
	topInView: true,
	...staticColors,
	...colorSchematic(10)
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
