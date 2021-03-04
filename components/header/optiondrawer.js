import React from "react";

import { useHandleClickOutstide } from "../../lib/custom-hooks";
import useGlobal from "../store";





const OptionDrawer = ({children}) => {
	// const [{menubutton, options}, dispatch] = useContext(Context);
	const [options, expandOptions] = useGlobal(
		state => state.options,
		actions => actions.expandOptions
	);
	useHandleClickOutstide(options, () => expandOptions(false));
	return (

		<>
			<div className="drawer">{children}</div>
			<style jsx>{`
        .drawer {
          z-index: 10;
          position: fixed;
          width: 250px;
          left: -270px;
          height: 100vh;
          background-color: white;
          box-shadow: 10px 0px 10px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease-in-out;
          transform: translateX(${options ? "270px": "0"});

        }
      `}
			</style>

		</>

	);
};

export default OptionDrawer;
