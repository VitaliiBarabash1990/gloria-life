"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import s from "./SwiperBlogLeft.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Controller } from "swiper/modules";
import { Locale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import CastomPagination from "../CastomPagination/CastomPagination";
import { BlogPayload } from "@/types/types";
import type { Swiper as SwiperType } from "swiper";

interface SwiperBlogLeftProps {
	article: BlogPayload[];
	swiperArticleRef: React.MutableRefObject<SwiperType | null>;
	setActiveBtn: Dispatch<SetStateAction<number>>;
	activeBtn: number;
}

const SwiperBlogtLeft: React.FC<SwiperBlogLeftProps> = ({
	article,
	swiperArticleRef,
	setActiveBtn,
	activeBtn,
}) => {
	const [activeSlide, setActiveSlide] = useState<number | null>(null);
	const locale = useLocale() as Locale;
	// console.log("ActiveSlide", activeSlide);
	// console.log("Article", article);

	const t = useTranslations("Blog");

	return (
		<div className={s.sliderContainer}>
			<Swiper
				onSwiper={(swiper) => (swiperArticleRef.current = swiper)}
				modules={[Navigation, Controller]}
				className={s.swiper}
				navigation={{
					nextEl: ".articleLeft-next",
					prevEl: ".articleLeft-prev",
				}}
				loop
				onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
				breakpoints={{
					320: { slidesPerView: 1, spaceBetween: 4 },
				}}
			>
				{article.map((item, index) => (
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
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<div className={s.paginationBlock}>
				<CastomPagination article={article} activeSlide={activeSlide} />

				<button className={`articleLeft-next ${s.navButton}`}>
					<svg className={s.navButton_icon}>
						<use href="/sprite.svg#icon-arrow-swiper-right"></use>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default SwiperBlogtLeft;
