"use client";
import React, { useState } from "react";
import s from "./SwiperAboutLeft.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Controller } from "swiper/modules";
import { Locale } from "@/i18n/routing";
import { useLocale } from "next-intl";
import CastomPagination from "../CastomPagination/CastomPagination";
import { AboutMePayload } from "@/types/types";
import type { Swiper as SwiperType } from "swiper";

interface SwiperAboutLeftProps {
	aboutMe: AboutMePayload[];
	swiperRef: React.MutableRefObject<SwiperType | null>;
}

const SwiperAboutLeft: React.FC<SwiperAboutLeftProps> = ({
	aboutMe,
	swiperRef,
}) => {
	const [activeSlide, setActiveSlide] = useState<number | null>(null);
	const locale = useLocale() as Locale;

	return (
		<div className={s.sliderContainer}>
			<Swiper
				onSwiper={(swiper) => (swiperRef.current = swiper)}
				modules={[Navigation, Controller]}
				className={s.swiper}
				navigation={{
					nextEl: ".aboutLeft-next",
					prevEl: ".aboutLeft-prev",
				}}
				loop
				onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
				breakpoints={{
					320: { slidesPerView: 1, spaceBetween: 4 },
				}}
			>
				{aboutMe.map((item, index) => (
					<SwiperSlide key={index} className={s.slide}>
						<div className={s.slideArticle}>
							<div className={s.slideArticleDescription}>
								<h3
									className={s.articleTitle}
									dangerouslySetInnerHTML={{
										__html: item[locale].title || "",
									}}
								/>
								<p
									className={s.articleText}
									dangerouslySetInnerHTML={{
										__html: item[locale].subTitle || "",
									}}
								/>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<div className={s.paginationBlock}>
				<CastomPagination aboutMe={aboutMe} activeSlide={activeSlide} />
				{/* <button className={`aboutLeft-prev ${s.navButton}`}>
					<svg className={`${s.navButton_icon} ${s.left}`}>
						<use href="/sprite.svg#icon-arrow-swiper-right"></use>
					</svg>
				</button> */}
				<button className={`aboutLeft-next ${s.navButton}`}>
					<svg className={s.navButton_icon}>
						<use href="/sprite.svg#icon-arrow-swiper-right"></use>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default SwiperAboutLeft;
