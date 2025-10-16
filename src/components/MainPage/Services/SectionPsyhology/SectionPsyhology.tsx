"use state";
import React, { useEffect, useState } from "react";
import s from "./SectionPsyhology.module.css";
import a from "../SectionBarber/SectionBarber.module.css";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n/routing";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { selectPsychologyServices } from "@/redux/services/selectors";
import { getAllServices } from "@/redux/services/operations";
import FormCallBack from "./FormCallBack/FormCallBack";
import { LocalizedScrollLink } from "../../Hero/LocalizedScrollLink/LocalizedScrollLink";

const SectionPsyhology = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [itemClick, setItemClick] = useState<number | null>(null);

	// console.log("itemClick", itemClick);
	const local = useLocale() as Locale;
	useEffect(() => {
		dispatch(getAllServices());
	}, [dispatch]);
	const psyhology = useSelector(selectPsychologyServices);
	// console.log("Psyh", psyhology);

	const t = useTranslations("Services");

	const hundlerClick = (value: number) => {
		setItemClick((prev) => (prev === value ? null : value));
	};

	return (
		<div className={`${a.sericesWrapper} ${s.paddingPsyhology}`}>
			<div className={a.servicesBarbers}>
				<h3 className={a.servicesTitle}>{t("title_block_psyh")}</h3>
				{/* <Link href="/barber" className={a.servicesLink}>
					{t("link_psyh")}
					<div className={a.sericesWrapperIcon}>
						<svg className={a.servicesIcon}>
							<use href="/sprite.svg#icon-arrow-swiper-right"></use>
						</svg>
					</div>
				</Link> */}
				<LocalizedScrollLink
					href="/"
					scrollId="BlogSwiper"
					className={a.servicesLink}
				>
					{t("link_psyh")}
					<div className={a.sericesWrapperIcon}>
						<svg className={a.servicesIcon}>
							<use href="/sprite.svg#icon-arrow-swiper-right"></use>
						</svg>
					</div>
				</LocalizedScrollLink>
			</div>

			<div className={s.psyhologyDescription}>{t("description_psyh")}</div>

			<ul className={s.servicesAcordionList}>
				{psyhology.map((item, index) => (
					<li key={index} className={s.servicesItem}>
						<div
							className={s.serviceAcordionBtn}
							onClick={() => hundlerClick(index)}
						>
							<h4 className={s.btnAcordionTitle}>{item[local].name}</h4>
							<div className={s.arrowIconBlock}>
								<svg
									className={`${s.arrowIcon} ${
										itemClick === null ? s.backArrow : ""
									}`}
								>
									<use href="/sprite.svg#icon-arrow-bottom-left"></use>
								</svg>
							</div>
						</div>
						{index === itemClick && (
							<div className={s.descrWrap}>
								<div className={s.psyhologyDescription}>
									{item[local].description}
								</div>
								<div className={s.descrInfo}>
									<div className={s.descrLeft}>
										<h5 className={s.infoTitle}>{t("info_left")}</h5>
										<div className={s.infoList}>{item[local].howclases}</div>
									</div>
									<div className={s.descrRight}>
										<h5 className={s.infoTitle}>{t("info_right")}</h5>
										<div className={s.infoList}>{item[local].forwhom}</div>
									</div>
								</div>
							</div>
						)}
					</li>
				))}
			</ul>

			<div className={a.servicesInfo}>
				<ul className={a.servicesInfoList}>
					<li className={a.servicesInfoItem}>
						<svg className={a.servicesInfoIcon}>
							<use href="/sprite.svg#icon-lacation"></use>
						</svg>
						Świnoujście, Польща
					</li>
					<li className={a.servicesInfoItem}>
						<svg className={a.servicesInfoIcon}>
							<use href="/sprite.svg#icon-phone"></use>
						</svg>
						{t("app_info")}
					</li>
					<li className={a.servicesInfoItem}>
						<svg className={a.servicesInfoIcon}>
							<use href="/sprite.svg#icon-reservation"></use>
						</svg>
						{t("app_info")}
					</li>
				</ul>
			</div>

			<FormCallBack />
		</div>
	);
};

export default SectionPsyhology;
