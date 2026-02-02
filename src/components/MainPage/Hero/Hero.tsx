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
import { getAllContacts } from "@/redux/contacts/operations";
import { selectContacts } from "@/redux/contacts/selectors";

const Hero = () => {
	const dispatch = useDispatch<AppDispatch>();

	// Дані для Hero
	useEffect(() => {
		dispatch(getAllMain());
		dispatch(getAllContacts());
	}, [dispatch]);

	const imgs = useSelector(selectImgs);
	const contacts = useSelector(selectContacts);

	const t = useTranslations("main");
	const p = useTranslations("Hero");

	return (
		<>
			<WrapperForComponents>
				<div id="Hero" className={s.heroHeading}>
					<ul className={s.heroHeadList}>
						<li className={s.heroHeadItem}>
							<h1 className={s.heroHeadTitle}>{t?.("title")}</h1>
							<div className={s.fadingLine}></div>
						</li>

						<li className={s.heroSubHeading}>
							<h3 className={s.heroSubHeadingText}>{t?.("subTitleOne")}</h3>
							<h3 className={`${s.heroSubHeadingText} ${s.textRight}`}>
								{t?.("subTitleTwo")}
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
								{contacts?.instagram && (
									<li className={s.heroSocialItem}>
										<a
											href={contacts.instagram}
											target="_blank"
											className={s.heroSocialBlock}
										>
											<svg className={s.iconSoc}>
												<use href="/sprite.svg#icon-social-instagram"></use>
											</svg>
										</a>
									</li>
								)}
								{contacts?.facebook && (
									<li className={s.heroSocialItem}>
										<a
											href={contacts.facebook}
											target="_blank"
											className={s.heroSocialBlock}
										>
											<svg className={s.iconSoc}>
												<use href="/sprite.svg#icon-social-facebook"></use>
											</svg>
										</a>
									</li>
								)}
								{contacts?.telegram && (
									<li className={s.heroSocialItem}>
										<a
											href={contacts.telegram}
											target="_blank"
											className={s.heroSocialBlock}
										>
											<svg className={s.iconSoc}>
												<use href="/sprite.svg#icon-social-telegram"></use>
											</svg>
										</a>
									</li>
								)}
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
					/>
				</li>
				<li className={s.heroPhotoItem}>
					<Image
						src={imgs ? imgs[1] : "/img/hero/PHOTO 2.png"}
						width={300}
						height={320}
						alt="photo_2"
					/>
				</li>
				<li className={s.heroPhotoItem}>
					<Image
						src={imgs ? imgs[2] : "/img/hero/PHOTO 3.png"}
						width={300}
						height={320}
						alt="photo_3"
					/>
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
					</div>
				</li>
				<li className={s.heroPhotoItem}>
					<Image
						src={imgs ? imgs[3] : "/img/hero/PHOTO 5.png"}
						width={300}
						height={320}
						alt="photo_4"
					/>
				</li>
			</ul>

			<HeroSwiper />
		</>
	);
};

export default Hero;
