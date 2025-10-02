"use client";
import { useEffect, useState } from "react";

type Padding = {
	paddingTop: number;
	paddingBottom: number;
};

export const useResponsivePadding = (): Padding => {
	const [padding, setPadding] = useState<Padding>({
		paddingTop: 20,
		paddingBottom: 20,
	});

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;

			if (width <= 375) {
				setPadding({ paddingTop: 20, paddingBottom: 20 });
			} else if (width <= 768) {
				setPadding({ paddingTop: 40, paddingBottom: 40 });
			} else if (width <= 1280) {
				setPadding({ paddingTop: 40, paddingBottom: 40 });
			} else {
				setPadding({ paddingTop: 60, paddingBottom: 60 });
			}
		};

		handleResize(); // викликати одразу при маунті
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return padding;
};
