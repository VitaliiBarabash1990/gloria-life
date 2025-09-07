import { useEffect, useState } from "react";

function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false); // =SSR‑значення
	useEffect(() => {
		const mq = window.matchMedia("(max-width: 767px)");
		setIsMobile(mq.matches);
		const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
		mq.addEventListener("change", listener);
		return () => mq.removeEventListener("change", listener);
	}, []);
	return isMobile;
}

export default useIsMobile;
