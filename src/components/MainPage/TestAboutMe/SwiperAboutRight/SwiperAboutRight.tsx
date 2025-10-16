"use client";
import React from "react";
import s from "./SwiperAboutRight.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Controller } from "swiper/modules";
import Image from "next/image";
import { AboutMePayload } from "@/types/types";
import type { Swiper as SwiperType } from "swiper";

interface SwiperAboutRightProps {
	aboutMe: AboutMePayload[];
	swiperRef: React.MutableRefObject<SwiperType | null>;
}

const SwiperAboutRight: React.FC<SwiperAboutRightProps> = ({
	aboutMe,
	swiperRef,
}) => {
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
				breakpoints={{
					320: { slidesPerView: 1, spaceBetween: 4 },
				}}
			>
				{aboutMe.map((item, index) => (
					<SwiperSlide key={index} className={s.slide}>
						<div className={s.slideImage}>
							<Image
								src={item.img}
								width={382}
								height={480}
								alt={`photo_` + index}
								className={s.image}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default SwiperAboutRight;
