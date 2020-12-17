import React, {useState, useEffect} from "react";

const Shadow = ({zIndex = 1, thickness =0.05, trigger = true, clickthrough = true, selfAnimate = false}) => {
	const [triggerState, setTriggerState] = useState(trigger);
	useEffect(() => {
		if (selfAnimate) {
			setTriggerState(false);
			setTimeout(() => {setTriggerState(true);}, 10);
		}
	}, []);

	return (
		<div className="shadow">
			<style jsx>{`
        .shadow {
          z-index: ${zIndex};
          position: absolute;
          pointer-events: ${clickthrough ? "none" : "auto"};
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          transition: background-color 0.3s ease-in-out;
          background-color: rgba(0, 0, 0, ${triggerState ? thickness : 0});
        }
      `}
			</style>
		</div>
	);
};


export default Shadow;
