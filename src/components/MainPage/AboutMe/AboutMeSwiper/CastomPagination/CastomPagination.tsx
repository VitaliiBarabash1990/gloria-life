import React from "react";
import s from "./CastomPagination.module.css";
import { AboutMePayload } from "@/types/types";

type PaginationProps = {
	about: AboutMePayload[];
	activeSlide: number | null;
};

const CastomPagination = ({ about = [], activeSlide = 0 }: PaginationProps) => {
	const safeActiveSlide =
		typeof activeSlide === "number" && !isNaN(activeSlide) ? activeSlide : 0;

	// console.log("activeSlide", activeSlide);
	// console.log("SafeActiveSlide", safeActiveSlide);
	return (
		<>
			<div className={s.countPagination}>
				{safeActiveSlide + 1} / {about.length}
			</div>
			<div className={s.paginationWraper}>
				{about.map((step, index) => (
					<div key={index} className={s.paginationItem}>
						{index === activeSlide ? (
							<svg className={s.boolitActiveIcon}>
								<use href="/sprite.svg#icon-boolit"></use>
							</svg>
						) : (
							<svg className={s.boolitIcon}>
								<use href="/sprite.svg#icon-boolit"></use>
							</svg>
						)}
					</div>
				))}
			</div>
		</>
	);
};

export default CastomPagination;
