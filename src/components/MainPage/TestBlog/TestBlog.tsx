"use client";
import React, { useEffect, useRef, useState } from "react";
import s from "./TestBlog.module.css";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import type { Swiper as SwiperType } from "swiper";
import SwiperBlogtLeft from "./SwiperBlogLeft/SwiperBlogLeft";
import SwiperBlogRight from "./SwiperBlogRight/SwiperBlogRight";
import {
	selectBarberArticles,
	selectBlog,
	selectPsychologyArticles,
} from "@/redux/blog/selectors";
import { getAllArticle } from "@/redux/blog/operations";

const TestBlog = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [activeBtn, setActiveBtn] = useState(0);

	useEffect(() => {
		dispatch(getAllArticle());
	}, [dispatch]);

	const leftArticleSwiperRef = useRef<SwiperType | null>(null);
	const rightArticleSwiperRef = useRef<SwiperType | null>(null);

	const selectors: Record<number, typeof selectBlog> = {
		0: selectBlog,
		1: selectPsychologyArticles,
		2: selectBarberArticles,
	};

	const carrentArticle = selectors[activeBtn] ?? selectBlog;

	const article = useSelector(carrentArticle);

	// ❗ Коли обидва swiper-и готові — з'єднуємо їх
	useEffect(() => {
		if (leftArticleSwiperRef.current && rightArticleSwiperRef.current) {
			leftArticleSwiperRef.current.controller.control =
				rightArticleSwiperRef.current;
			rightArticleSwiperRef.current.controller.control =
				leftArticleSwiperRef.current;
		}
	}, [article]);

	return (
		<div id="BlogSwiper" className={s.wrapperSwiperBlog}>
			<div className={s.leftSwiper}>
				<SwiperBlogtLeft
					article={article}
					swiperArticleRef={leftArticleSwiperRef}
					setActiveBtn={setActiveBtn}
					activeBtn={activeBtn}
				/>
			</div>
			<div className={s.rightSwiper}>
				<SwiperBlogRight
					article={article}
					swiperArticleRef={rightArticleSwiperRef}
				/>
			</div>
		</div>
	);
};

export default TestBlog;
