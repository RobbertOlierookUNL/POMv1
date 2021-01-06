import React, {useState, useEffect} from "react";

import useGlobal from "../store";
import Shadow from "../shadow";




const OptionDrawer = ({children}) => {
	// const [{menubutton, options}, dispatch] = useContext(Context);
	const [options, expandOptions] = useGlobal(
		state => state.options,
		actions => actions.expandOptions
	);
	const [userMenu] = useGlobal(
		state => state.userMenu,
		() => null
	);
	const [shadowRef] = useGlobal(
		state => state.shadowRef,
		() => null
	);
	const [handleClickOutside, setHandleClickOutside] = useState(false);
	useEffect(() => {
		if (handleClickOutside) {
			document.removeEventListener("click", handleClickOutside, true);
			setHandleClickOutside(false);
		}

		if(options) {
			setHandleClickOutside(() => function (event) {
				if (event.target === shadowRef.current
				){
					expandOptions(false);
				}
			});
		}

		return () => {
			if(handleClickOutside) {
				document.removeEventListener("click", handleClickOutside, true);
			}
		};
	}, [shadowRef, options]);

	useEffect(() => {
		if (handleClickOutside) {
			document.addEventListener("click", handleClickOutside, true);
		}
	}, [handleClickOutside]);
	return (

		<>
			<div className="drawer">{children}</div>
			<Shadow zIndex={8} trigger={options || userMenu} clickthrough={false}/>
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
