import React, {useContext} from "react";
import {Context} from "./globalstate/store";


const OptionDrawer = ({children}) => {
	const [state,] = useContext(Context);
	// useEffect(() => {}, [state.options]);
	return (
		<>
			<div className="drawer">{children}</div>
			<div className="shadow"></div>
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
          transform: translateX(${state.options ? "calc(140px + 30vw)": "0"});

        }
        .shadow {
          z-index: 1;
          position: absolute;
          pointer-events: none;
          top: 0;
          width: 100vw;
          height: 100vh;
          transition: background-color 0.3s ease-in-out;
          background-color: rgba(0, 0, 0, ${state.options ? 0.05 : 0});
        }
      `}
			</style>
		</>
	);
};

export default OptionDrawer;
