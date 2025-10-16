"use client";
import React from "react";
import s from "./SwiperBlogRight.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Controller } from "swiper/modules";
import Image from "next/image";
import { BlogPayload } from "@/types/types";
import type { Swiper as SwiperType } from "swiper";

interface SwiperBlogRightProps {
	article: BlogPayload[];
	swiperArticleRef: React.MutableRefObject<SwiperType | null>;
}

const SwiperBlogRight: React.FC<SwiperBlogRightProps> = ({
	article,
	swiperArticleRef,
}) => {
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
				breakpoints={{
					320: { slidesPerView: 1, spaceBetween: 4 },
				}}
			>
				{article.map((item, index) => (
					<SwiperSlide key={index} className={s.slide}>
						<ul className={s.slideImage}>
							{item.imgs.map((item, index) => (
								<li key={index} className={s.slideImageItem}>
									<div className={s.imgWrapper}>
										<Image
											src={item}
											alt={`photo_` + index}
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
	);
};

export default SwiperBlogRight;
