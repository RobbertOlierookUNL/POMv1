import React, {useState, useEffect, useRef} from "react";
import useGlobal from "./store";

const Shadow = ({zIndex = 1, thickness =0.1, trigger = true, softTrigger = false, clickthrough = true, selfAnimate = false}) => {
	const [triggerState, setTriggerState] = useState(trigger);
	const shadowRef = useRef(null);
	const [, setShadowRef] = useGlobal(
		() => null,
		actions => actions.setShadowRef
	);
	useEffect(() => {
		if (selfAnimate) {
			setTriggerState(false);
			setTimeout(() => {setTriggerState(true);}, 10);
		}
		setShadowRef(shadowRef);
	}, []);
	useEffect(() => {
		setTriggerState(trigger);
	}, [trigger]);

	return (
		<div ref={shadowRef} className="shadow">
			<style jsx>{`
        .shadow {
          z-index: ${zIndex};
          position: absolute;
          pointer-events: ${!clickthrough && trigger ? "auto" : "none"};
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          transition: background-color 0.3s ease-in-out;
          background-color: rgba(0, 0, 0, ${triggerState && !softTrigger ? thickness : 0 });
        }
      `}
			</style>
		</div>
	);
};


export default Shadow;
