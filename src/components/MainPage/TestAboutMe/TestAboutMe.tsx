"use client";
import React, { useEffect, useRef } from "react";
import s from "./TestAboutMe.module.css";
import SwiperAboutLeft from "./SwiperAboutLeft/SwiperAboutLeft";
import SwiperAboutRight from "./SwiperAboutRight/SwiperAboutRight";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllAboutMe } from "@/redux/aboutMe/operations";
import { selectAboutMe } from "@/redux/aboutMe/selectors";
import type { Swiper as SwiperType } from "swiper";

const TestAboutMe = () => {
	const dispatch = useDispatch<AppDispatch>();
	const aboutMe = useSelector(selectAboutMe);

	const leftSwiperRef = useRef<SwiperType | null>(null);
	const rightSwiperRef = useRef<SwiperType | null>(null);

	useEffect(() => {
		dispatch(getAllAboutMe());
	}, [dispatch]);

	// ❗ Коли обидва swiper-и готові — з'єднуємо їх
	useEffect(() => {
		if (leftSwiperRef.current && rightSwiperRef.current) {
			leftSwiperRef.current.controller.control = rightSwiperRef.current;
			rightSwiperRef.current.controller.control = leftSwiperRef.current;
		}
	}, [aboutMe]);

	return (
		<div id="AboutMe" className={s.wrapperSwiperAbout}>
			<div className={s.leftSwiper}>
				<SwiperAboutLeft aboutMe={aboutMe} swiperRef={leftSwiperRef} />
			</div>
			<div className={s.rightSwiper}>
				<SwiperAboutRight aboutMe={aboutMe} swiperRef={rightSwiperRef} />
			</div>
		</div>
	);
};

export default TestAboutMe;
