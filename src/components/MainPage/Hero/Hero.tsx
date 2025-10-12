"use client";
import React, { useEffect } from "react";
import WrapperForComponents from "../../UI/WrapperForComponents/WrapperForComponents";
import s from "./Hero.module.css";
import Image from "next/image";
import HeroSwiper from "./HeroSwiper/HeroSwiper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllMain } from "@/redux/main/operations";
import { useTranslations } from "next-intl";
import { LocalizedScrollLink } from "./LocalizedScrollLink/LocalizedScrollLink";
import { selectImgs } from "@/redux/main/selectors";

const Hero = () => {
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getAllMain());
	}, [dispatch]);
	const imgs = useSelector(selectImgs);
	// console.log("Img", imgs);

	const t = useTranslations("main");
	const p = useTranslations("Hero");

	return (
		<>
			<WrapperForComponents>
				<div className={s.heroHeading}>
					<ul className={s.heroHeadList}>
						<li className={s.heroHeadItem}>
							<h1 className={s.heroHeadTitle}>
								{t?.("title")}
								{/* Вітаю, я Глорія моє життя - це пошук та розкриття себе */}
							</h1>
							<div className={s.fadingLine}></div>
						</li>
						<li className={s.heroSubHeading}>
							<h3 className={s.heroSubHeadingText}>
								{t?.("subTitleOne")}
								{/* Духовний наставник, психолог, мама сина, барберка */}
							</h3>
							<h3 className={`${s.heroSubHeadingText} ${s.textRight}`}>
								{t?.("subTitleTwo")}
								{/* Енергія любові і світла змінила моє життя */}
							</h3>
						</li>
						<li className={s.heroBtnSocial}>
							<div className={s.heroBtnBlock}>
								<LocalizedScrollLink
									href="/"
									scrollId="BlogSwiper"
									className={s.socialBtn}
								>
									{p("button_1")}
									<svg className={s.socialIcon}>
										<use href="/sprite.svg#icon-arrow-right"></use>
									</svg>
								</LocalizedScrollLink>
								<LocalizedScrollLink
									href="/"
									scrollId="BlogSwiper"
									className={s.socialBtn}
								>
									{p("button_2")}
									<svg className={s.socialIcon}>
										<use href="/sprite.svg#icon-arrow-right"></use>
									</svg>
								</LocalizedScrollLink>
							</div>
							<ul className={s.heroSocialList}>
								<li className={s.heroSocialItem}>
									<a
										href="http://instagram.com"
										target="_blank"
										className={s.heroSocialBlock}
									>
										<svg className={s.iconSoc}>
											<use href="/sprite.svg#icon-social-instagram"></use>
										</svg>
									</a>
								</li>
								<li className={s.heroSocialItem}>
									<a
										href="http://facebook.com"
										target="_blank"
										className={s.heroSocialBlock}
									>
										<svg className={s.iconSoc}>
											<use href="/sprite.svg#icon-social-facebook"></use>
										</svg>
									</a>
								</li>
								<li className={s.heroSocialItem}>
									<a
										href="http://telegram.com"
										target="_blank"
										className={s.heroSocialBlock}
									>
										<svg className={s.iconSoc}>
											<use href="/sprite.svg#icon-social-telegram"></use>
										</svg>
									</a>
								</li>
							</ul>
						</li>
						<li className={s.heroSmallBtnBlock}>
							<LocalizedScrollLink
								href="/"
								scrollId="BlogSwiper"
								className={s.socialBtn}
							>
								{p("button_1")}
							</LocalizedScrollLink>
							<LocalizedScrollLink
								href="/"
								scrollId="BlogSwiper"
								className={s.socialBtn}
							>
								{p("button_2")}
							</LocalizedScrollLink>
						</li>
					</ul>
				</div>
			</WrapperForComponents>
			<ul className={s.heroPhotoList}>
				<li className={s.heroPhotoItem}>
					<Image
						src={imgs ? imgs[0] : "/img/hero/PHOTO 1.png"}
						width={300}
						height={320}
						alt="photo_1"
					></Image>
				</li>
				<li className={s.heroPhotoItem}>
					<Image
						src={imgs ? imgs[1] : "/img/hero/PHOTO 2.png"}
						width={300}
						height={320}
						alt="photo_1"
					></Image>
				</li>
				<li className={s.heroPhotoItem}>
					<Image
						src={imgs ? imgs[2] : "/img/hero/PHOTO 3.png"}
						width={300}
						height={320}
						alt="photo_1"
					></Image>
				</li>
				<li className={`${s.heroPhotoItem} ${s.heroInBlog}`}>
					<div className={s.inBlog}>
						<LocalizedScrollLink
							href="/"
							scrollId="BlogSwiper"
							className={s.inBlogLink}
						>
							<svg className={s.iconInBlog}>
								<use href="/sprite.svg#icon-arrow-right"></use>
							</svg>
							{p("to_blog")}
						</LocalizedScrollLink>
						{/* <Link href="/blog" className={s.inBlogLink}>
							<svg className={s.iconInBlog}>
								<use href="/sprite.svg#icon-arrow-right"></use>
							</svg>
							До блогу
						</Link> */}
					</div>
				</li>
				<li className={s.heroPhotoItem}>
					<Image
						src={imgs ? imgs[3] : "/img/hero/PHOTO 5.png"}
						width={300}
						height={320}
						alt="photo_1"
					></Image>
				</li>
			</ul>
			<HeroSwiper />
		</>
	);
};

export default Hero;
