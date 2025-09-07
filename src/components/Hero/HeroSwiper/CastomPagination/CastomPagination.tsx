import React from "react";
import s from "./CastomPagination.module.css";

type ImgProp = {
	img: string;
};

type PaginationProps = {
	imgs: ImgProp[];
	activeSlide: number | null;
};

const CastomPagination = ({ imgs, activeSlide }: PaginationProps) => {
	return (
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
	);
};

export default CastomPagination;
