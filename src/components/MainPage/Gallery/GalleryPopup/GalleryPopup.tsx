"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import s from "./GalleryPopupSwiper.module.css";
import Image from "next/image";
import { GalleryImage } from "@/types/types";

interface GalleryPopupProps {
	photoList: GalleryImage[];
	initialIndex: number;
}

const GalleryPopup: React.FC<GalleryPopupProps> = ({
	photoList,
	initialIndex,
}) => {
	// console.log("PhotoList", photoList);
	return (
		<div className={s.sliderContainer}>
			<Swiper
				className={s.swiper}
				loop={true}
				initialSlide={initialIndex}
				navigation={{
					nextEl: ".gallery-next",
					prevEl: ".gallery-prev",
				}}
				modules={[Navigation, Pagination]}
				breakpoints={{
					320: { slidesPerView: 1, spaceBetween: 0 },
					768: { slidesPerView: 1, spaceBetween: 0 },
					1280: { slidesPerView: 1, spaceBetween: 0 },
				}}
			>
				{photoList?.map((img, index) => (
					<SwiperSlide key={index} className={s.slide}>
						<div key={index} className={s.itemSlide}>
							<Image
								src={typeof img === "string" ? img : img.url}
								width={1312}
								height={800}
								alt={`img_` + (index + 1)}
								className={s.image}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<div className={s.arrows}>
				<button className={`gallery-prev ${s.navButton} ${s.prevButton}`}>
					<svg className={`${s.navButton_icon} ${s.left}`}>
						<use href="/sprite.svg#icon-arrow-swiper-gallery"></use>
					</svg>
				</button>
				<button className={`gallery-next ${s.navButton} ${s.nextButton}`}>
					<svg className={`${s.navButton_icon} ${s.right}`}>
						<use href="/sprite.svg#icon-arrow-swiper-gallery"></use>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default GalleryPopup;
