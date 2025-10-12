"use client";
import React, { useEffect } from "react";
import s from "./SectionBarber.module.css";
import { Locale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllServices } from "@/redux/services/operations";
import { selectBarberServices } from "@/redux/services/selectors";
import { LocalizedScrollLink } from "../../Hero/LocalizedScrollLink/LocalizedScrollLink";

const SectionBarber = () => {
	const dispatch = useDispatch<AppDispatch>();
	const local = useLocale() as Locale;
	useEffect(() => {
		dispatch(getAllServices());
	}, [dispatch]);
	const barbers = useSelector(selectBarberServices);
	const t = useTranslations("Services");
	return (
		<div className={`${s.sericesWrapper} ${s.paddingBarber}`}>
			<div className={s.servicesBarbers}>
				<h3 className={s.servicesTitle}>{t("title_block")}</h3>
				{/* <Link href="/barber" className={s.servicesLink}>
					{t("link")}
					<div className={s.sericesWrapperIcon}>
						<svg className={s.servicesIcon}>
							<use href="/sprite.svg#icon-arrow-swiper-right"></use>
						</svg>
					</div>
				</Link> */}
				<LocalizedScrollLink
					href="/"
					scrollId="BlogSwiper"
					className={s.servicesLink}
				>
					{t("link")}
					<div className={s.sericesWrapperIcon}>
						<svg className={s.servicesIcon}>
							<use href="/sprite.svg#icon-arrow-swiper-right"></use>
						</svg>
					</div>
				</LocalizedScrollLink>
			</div>

			<ul className={s.sericesList}>
				{barbers.map((item, index) => (
					<li key={index} className={s.sevicesItem}>
						<h4 className={s.servicesItemTitle}>{item[local].name}</h4>
						<p className={s.sericesItemText}>{item[local].description}</p>
						<span className={s.sericesItemPrice}>{item.price}</span>
					</li>
				))}
				<li className={s.sevicesItem}>
					<h4 className={s.servicesItemTitle}>{t("text")}</h4>
					<p className={s.sericesItemText}>{t("description")}</p>
					<svg className={s.servicesItemIcon}>
						<use href="/sprite.svg#icon-present"></use>
					</svg>
				</li>
			</ul>

			<div className={s.servicesInfo}>
				<ul className={s.servicesInfoList}>
					<li className={s.servicesInfoItem}>
						<svg className={s.servicesInfoIcon}>
							<use href="/sprite.svg#icon-lacation"></use>
						</svg>
						Świnoujście, Польща
					</li>
					<li className={s.servicesInfoItem}>
						<svg className={s.servicesInfoIcon}>
							<use href="/sprite.svg#icon-reservation"></use>
						</svg>
						{t("app_info")}
					</li>
				</ul>
				<button type="button" className={s.servicesBtn}>
					{t("button")}
				</button>
			</div>
		</div>
	);
};

export default SectionBarber;
