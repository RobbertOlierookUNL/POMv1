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
          width: calc(120px + 30vw);
          left: calc(-140px - 30vw);
          height: 100vh;
          background-color: white;
          box-shadow: 10px 0px 10px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease-in-out;
          transform: translateX(${options ? "calc(140px + 30vw)": "0"});

        }
      `}
			</style>

		</>

	);
};

export default OptionDrawer;
