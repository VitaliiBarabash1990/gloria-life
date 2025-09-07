"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import s from "./HeroSwiper.module.css";
import imgs from "./imgs.json";
import Image from "next/image";
import CastomPagination from "./CastomPagination/CastomPagination";

const HeroSwiper = () => {
	const [activeSlide, setActiveSlide] = useState<number | null>(null);
	console.log("ActiveSlide", activeSlide);

	return (
		<div id="HeroSwiper" className={s.heroSwiper}>
			<div className={s.sliderContainer}>
				<Swiper
					className={s.swiper}
					// spaceBetween={20}
					// slidesPerView={1}
					// pagination={{ clickable: true }}
					navigation={{
						nextEl: ".custom-next",
						prevEl: ".custom-prev",
					}}
					modules={[Pagination, Navigation]}
					loop={true}
					onSlideChange={(swiper) => {
						setActiveSlide(swiper.realIndex);
					}}
					breakpoints={{
						320: { slidesPerView: 1, spaceBetween: 4 },
						768: { slidesPerView: 2, spaceBetween: 4 },
					}}
				>
					{imgs.map((img, index) => (
						<SwiperSlide key={index} className={s.slide}>
							<div key={index} className={s.heroItem}>
								<Image
									src={img.img}
									width={382}
									height={480}
									alt={`photo ${index}`}
								></Image>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				<div className={s.paginationBlock}>
					<CastomPagination imgs={imgs} activeSlide={activeSlide} />
					<button className={`custom-next ${s.navButton}`}>
						<svg className={s.navButton_icon}>
							<use href="/sprite.svg#icon-arrow-swiper-right"></use>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default HeroSwiper;
