import { useEffect, useRef, useState, useCallback } from "react";

const useInViewport = (props, options, config = { disconnectOnLeave: false }, hasViewportListener) => {
	const node = useRef();
	const getNode = useCallback(myNode => {
		if (myNode !== null && hasViewportListener) {
			node.current = myNode;
		}
	}, []);
	const { onEnterViewport, onLeaveViewport } = props;
	const [, forceUpdate] = useState();

	const observer = useRef();

	const inViewportRef = useRef(false);
	const intersected = useRef(false);

	const enterCountRef = useRef(0);
	const leaveCountRef = useRef(0);

	function startObserver() {
		if (node.current && observer.current) {
			observer.current.observe(node.current);
		}
	}

	function stopObserver() {
		if (node.current && observer.current) {
			observer.current.unobserve(node.current);
			observer.current.disconnect();
			observer.current = null;
		}
	}

	function handleIntersection(entries) {
		const entry = entries[0] || {};
		const { isIntersecting, intersectionRatio } = entry;
		const isInViewport = typeof isIntersecting !== "undefined" ? isIntersecting : intersectionRatio > 0;

		// enter
		if (!intersected.current && isInViewport) {
			intersected.current = true;
			onEnterViewport && onEnterViewport();
			enterCountRef.current += 1;
			inViewportRef.current = isInViewport;
			forceUpdate(isInViewport);
			return;
		}

		// leave
		if (intersected.current && !isInViewport) {
			intersected.current = false;
			onLeaveViewport && onLeaveViewport();
			if (config.disconnectOnLeave && observer.current) {
				// disconnect obsever on leave
				observer.current.disconnect();
			}
			leaveCountRef.current += 1;
			inViewportRef.current = isInViewport;
			forceUpdate(isInViewport);
		}
	}

	function initIntersectionObserver() {
		if (!observer.current) {
			// $FlowFixMe
			observer.current = new IntersectionObserver(handleIntersection, options);
		}
	}

	useEffect(
		() => {
			if (node.current && hasViewportListener) {
				// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
				initIntersectionObserver();
				startObserver();

				return () => {
					stopObserver();
				};
			}
		},
		[node.current, options, config, onEnterViewport, onLeaveViewport, hasViewportListener]
	);

	return {
		inViewport: inViewportRef.current,
		enterCount: enterCountRef.current,
		leaveCount: leaveCountRef.current,
		getNode
	};
};

export default useInViewport;
