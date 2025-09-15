"use client";
import React, { useEffect } from "react";
import WrapperForComponents from "../UI/WrapperForComponents/WrapperForComponents";
import s from "./Hero.module.css";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import HeroSwiper from "./HeroSwiper/HeroSwiper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllMain } from "@/redux/main/operations";
import { useTranslations } from "next-intl";

const Hero = () => {
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getAllMain());
	}, [dispatch]);

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
								<Link
									href="/psyhology"
									className={`${s.socialBtn} ${s.active}`}
								>
									{p("button_1")}
									{/* Пcихолог{" "} */}
									<svg className={`${s.socialIcon} ${s.active}`}>
										<use href="/sprite.svg#icon-arrow-right"></use>
									</svg>
								</Link>
								<Link href="/barber" className={s.socialBtn}>
									{p("button_2")}
									{/* Барбер{" "} */}
									<svg className={s.socialIcon}>
										<use href="/sprite.svg#icon-arrow-right"></use>
									</svg>
								</Link>
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
							<Link href="/psyhology" className={`${s.socialBtn} ${s.active}`}>
								Пcихолог
							</Link>
							<Link href="/barber" className={s.socialBtn}>
								Барбер
							</Link>
						</li>
					</ul>
				</div>
			</WrapperForComponents>
			<ul className={s.heroPhotoList}>
				<li className={s.heroPhotoItem}>
					<Image
						src="/img/hero/PHOTO 1.png"
						width={300}
						height={320}
						alt="photo_1"
					></Image>
				</li>
				<li className={s.heroPhotoItem}>
					<Image
						src="/img/hero/PHOTO 2.png"
						width={300}
						height={320}
						alt="photo_1"
					></Image>
				</li>
				<li className={s.heroPhotoItem}>
					<Image
						src="/img/hero/PHOTO 3.png"
						width={300}
						height={320}
						alt="photo_1"
					></Image>
				</li>
				<li className={`${s.heroPhotoItem} ${s.heroInBlog}`}>
					<div className={s.inBlog}>
						<Link href="/blog" className={s.inBlogLink}>
							<svg className={s.iconInBlog}>
								<use href="/sprite.svg#icon-arrow-right"></use>
							</svg>
							До блогу
						</Link>
					</div>
				</li>
				<li className={s.heroPhotoItem}>
					<Image
						src="/img/hero/PHOTO 5.png"
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
