"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import s from "./AboutMeSwiper.module.css";
import imgs from "./imgs.json";
import Image from "next/image";
import CastomPagination from "./CastomPagination/CastomPagination";
import { selectImgs } from "@/redux/main/selectors";
import { useSelector } from "react-redux";

const AboutMeSwiper = () => {
	const [activeSlide, setActiveSlide] = useState<number | null>(null);
	// const imgs = useSelector(selectImgs);
	// console.log("IMG", imgs);
	// console.log("ActiveSlide", activeSlide);

	return (
		<div id="AboutMeSwiper" className={s.heroSwiper}>
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
				>
					{imgs?.map((img, index) => (
						<SwiperSlide key={index} className={s.slide}>
							<div className={s.slideArticle}>
								<div className={s.slideArticleDescription}>
									<h3 className={s.articleTitle}>крок за кроком - вперед</h3>
									<p className={s.articleText}>
										Моє нове життя почалося з валізи і дитини за руку <br />Я не
										планувала переїзду. Моє життя почалося зовсім несподівано —
										з війни. Одного дня я взяла валізу в одну руку, а в іншу —
										руку свого сина. Ми сіли в потяг, залишили Україну і
										приїхали в Польщу, у місто Свіноустя. Без грошей, без
										знайомих, без знання мови. Просто почали з нуля. Але
										найголовніше — я все життя вчуся.
										<br />
										Це моя філософія: ніколи не зупинятися.
										<br />
										Тому вже за три тижні в Польщі я почала працювати
										вчителькою. Перекладала дітям із польської на українську. І
										хоча офіційно польську мову я не знала, вона, наче, сама в
										мені жила. Ця робота дала мені перший ковток впевненості.
										<br />
										Тому вже за три тижні в Польщі я почала працювати
										вчителькою. Перекладала дітям із польської на українську. І
										хоча офіційно польську мову я не знала, вона, наче, сама в
										мені жила. Ця робота дала мені перший ковток впевненості.
										Моє нове життя почалося з валізи і дитини за руку <br />Я не
										планувала переїзду. Моє життя почалося зовсім несподівано —
										з війни. Одного дня я взяла валізу в одну руку, а в іншу —
										руку свого сина. Ми сіли в потяг, залишили Україну і
										приїхали в Польщу, у місто Свіноустя. Без грошей, без
										знайомих, без знання мови. Просто почали з нуля. Але
										найголовніше — я все життя вчуся.
										<br />
										Це моя філософія: ніколи не зупинятися.
										<br />
										Тому вже за три тижні в Польщі я почала працювати
										вчителькою. Перекладала дітям із польської на українську. І
										хоча офіційно польську мову я не знала, вона, наче, сама в
										мені жила. Ця робота дала мені перший ковток впевненості.
										<br />
										Тому вже за три тижні в Польщі я почала працювати
										вчителькою. Перекладала дітям із польської на українську. І
										хоча офіційно польську мову я не знала, вона, наче, сама в
										мені жила. Ця робота дала мені перший ковток впевненості.
										Моє нове життя почалося з валізи і дитини за руку <br />Я не
										планувала переїзду. Моє життя почалося зовсім несподівано —
										з війни. Одного дня я взяла валізу в одну руку, а в іншу —
										руку свого сина. Ми сіли в потяг, залишили Україну і
										приїхали в Польщу, у місто Свіноустя. Без грошей, без
										знайомих, без знання мови. Просто почали з нуля. Але
										найголовніше — я все життя вчуся.
										<br />
										Це моя філософія: ніколи не зупинятися.
										<br />
										Тому вже за три тижні в Польщі я почала працювати
										вчителькою. Перекладала дітям із польської на українську. І
										хоча офіційно польську мову я не знала, вона, наче, сама в
										мені жила. Ця робота дала мені перший ковток впевненості.
										<br />
										Тому вже за три тижні в Польщі я почала працювати
										вчителькою. Перекладала дітям із польської на українську. І
										хоча офіційно польську мову я не знала, вона, наче, сама в
										мені жила. Ця робота дала мені перший ковток впевненості.
									</p>
								</div>
								<div className={s.paginationBlock}>
									<CastomPagination imgs={imgs} activeSlide={activeSlide} />
									<button className={`custom-next ${s.navButton}`}>
										<svg className={s.navButton_icon}>
											<use href="/sprite.svg#icon-arrow-swiper-right"></use>
										</svg>
									</button>
								</div>
							</div>
							<Image
								src={img}
								width={382}
								height={480}
								alt={`photo ${index}`}
								className={s.slideImage}
							></Image>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default AboutMeSwiper;
