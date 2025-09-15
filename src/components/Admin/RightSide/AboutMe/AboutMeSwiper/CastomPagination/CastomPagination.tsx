import React from "react";
import s from "./CastomPagination.module.css";

type PaginationProps = {
	imgs: string[] | undefined;
	activeSlide: number | null;
};

const CastomPagination = ({ imgs = [], activeSlide }: PaginationProps) => {
	const safeActiveSlide = activeSlide ?? 0;
	return (
		<>
			<div className={s.countPagination}>{safeActiveSlide + 1} / 3</div>
			<div className={s.paginationWraper}>
				{imgs.map((step, index) => (
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
