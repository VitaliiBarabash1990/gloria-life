"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import s from "./AboutMeSwiper.module.css";
import Image from "next/image";
import CastomPagination from "./CastomPagination/CastomPagination";
import { useDispatch, useSelector } from "react-redux";
import { selectAboutMe } from "@/redux/aboutMe/selectors";
import { AppDispatch } from "@/redux/store";
import { getAllAboutMe } from "@/redux/aboutMe/operations";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";

const AboutMeSwiper = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [activeSlide, setActiveSlide] = useState(0);
	const about = useSelector(selectAboutMe);
	const locale = useLocale() as Locale;

	// масив ref для кнопок кожного слайда
	const nextRefs = useRef<(HTMLButtonElement | null)[]>([]);

	useEffect(() => {
		dispatch(getAllAboutMe());
	}, [dispatch]);

	return (
		<div id="AboutMeSwiper" className={s.heroSwiper}>
			<div className={s.sliderContainer}>
				<Swiper
					className={s.swiper}
					modules={[Pagination, Navigation]}
					loop={true}
					onActiveIndexChange={(swiper) => {
						setActiveSlide(swiper.realIndex ?? 0);
					}}
					// navigation={{}}
					onBeforeInit={(swiper) => {
						// встановлюємо навігацію на поточні кнопки
						if (
							swiper.params.navigation &&
							typeof swiper.params.navigation !== "boolean"
						) {
							swiper.params.navigation.nextEl =
								nextRefs.current[swiper.realIndex || 0];
						}
					}}
					onSlideChange={(swiper) => {
						// оновлюємо nextEl при зміні слайда
						if (
							swiper.params.navigation &&
							typeof swiper.params.navigation !== "boolean" &&
							nextRefs.current[swiper.realIndex ?? 0]
						) {
							swiper.params.navigation.nextEl =
								nextRefs.current[swiper.realIndex ?? 0];
							swiper.navigation.destroy();
							swiper.navigation.init();
							swiper.navigation.update();
						}
					}}
				>
					{about?.map((item, index) => (
						<SwiperSlide key={index} className={s.slide}>
							<div className={s.slideArticle}>
								<div className={s.slideArticleDescription}>
									<h3
										className={s.articleTitle}
										dangerouslySetInnerHTML={{
											__html: item[locale].title || "",
										}}
									>
										{/* {item[locale].title} */}
									</h3>
									<p
										className={s.articleText}
										dangerouslySetInnerHTML={{
											__html: item[locale].subTitle || "",
										}}
									>
										{/* {item[locale].subTitle} */}
									</p>
								</div>

								{/* paginationBlock фізично між article і image */}
								<div
									className={s.paginationBlock}
									ref={(el) => {
										nextRefs.current[index] =
											el?.querySelector("button") || null;
									}}
								>
									<CastomPagination about={about} activeSlide={activeSlide} />
									<button className={s.navButton}>
										<svg className={s.navButton_icon}>
											<use href="/sprite.svg#icon-arrow-swiper-right"></use>
										</svg>
									</button>
								</div>
							</div>

							<Image
								src={item.img}
								width={382}
								height={480}
								alt={`photo ${index}`}
								className={s.slideImage}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default AboutMeSwiper;
