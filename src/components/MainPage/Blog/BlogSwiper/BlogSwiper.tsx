"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import s from "./BlogSwiper.module.css";
import Image from "next/image";
import CastomPagination from "./CastomPagination/CastomPagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n/routing";
import {
	selectBarberArticles,
	selectBlog,
	selectPsychologyArticles,
} from "@/redux/blog/selectors";
import { getAllArticle } from "@/redux/blog/operations";

const BlogSwiper = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [activeBtn, setActiveBtn] = useState(0);
	const [activeSlide, setActiveSlide] = useState(0);

	const locale = useLocale() as Locale;

	const t = useTranslations("Blog");

	// масив ref для кнопок кожного слайда
	const nextRefs = useRef<(HTMLButtonElement | null)[]>([]);

	useEffect(() => {
		dispatch(getAllArticle());
	}, [dispatch]);

	// let carrentArticle;

	// switch (activeBtn) {
	// 	case 0:
	// 		carrentArticle = selectBlog;
	// 		break;
	// 	case 1:
	// 		carrentArticle = selectPsychologyArticles;
	// 		break;
	// 	case 2:
	// 		carrentArticle = selectBarberArticles;
	// 		break;
	// 	default:
	// 		carrentArticle = selectBlog;
	// 		break;
	// }

	//Верх те саме що й нижче

	const selectors: Record<number, typeof selectBlog> = {
		0: selectBlog,
		1: selectPsychologyArticles,
		2: selectBarberArticles,
	};

	const carrentArticle = selectors[activeBtn] ?? selectBlog;

	const article = useSelector(carrentArticle);
	console.log("article", article);

	return (
		<div id="BlogSwiper" className={s.heroSwiper}>
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
					{article?.map((item, index) => (
						<SwiperSlide key={index} className={s.slide}>
							<div className={s.slideArticle}>
								<ul className={s.selectList}>
									<li
										className={`${s.selectItem} ${
											activeBtn === 0 ? s.active : ""
										}`}
										onClick={() => setActiveBtn(0)}
									>
										{t("select_list.0")}
									</li>
									<li
										className={`${s.selectItem} ${
											activeBtn === 1 ? s.active : ""
										}`}
										onClick={() => setActiveBtn(1)}
									>
										{t("select_list.1")}
									</li>
									<li
										className={`${s.selectItem} ${
											activeBtn === 2 ? s.active : ""
										}`}
										onClick={() => setActiveBtn(2)}
									>
										{t("select_list.2")}
									</li>
								</ul>
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
									<p
										className={s.articleText}
										dangerouslySetInnerHTML={{
											__html: item[locale].article || "",
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
									<CastomPagination
										article={article}
										activeSlide={activeSlide}
									/>
									<button className={s.navButton}>
										<svg className={s.navButton_icon}>
											<use href="/sprite.svg#icon-arrow-swiper-right"></use>
										</svg>
									</button>
								</div>
							</div>
							<ul className={s.slideImage}>
								{item.imgs.map((item, index) => (
									<li key={index} className={s.slideImageItem}>
										<div className={s.imgWrapper}>
											<Image
												src={item}
												alt={`photo ${index}`}
												fill // замість width/height
												style={{ objectFit: "cover", objectPosition: "center" }} // замощення
												sizes="100vw" // опційно для адаптивності
											/>
										</div>
									</li>
								))}
							</ul>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default BlogSwiper;
