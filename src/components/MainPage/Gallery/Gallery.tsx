"use client";
import React, { useEffect, useState } from "react";
import s from "./Gallery.module.css";
import WrapperForComponents from "@/components/UI/WrapperForComponents/WrapperForComponents";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getGallery } from "@/redux/gallery/operations";
import { selectGalleryList } from "@/redux/gallery/selectors";
import GalleryPopupSwiper from "./GalleryPopup/GalleryPopup";

const Gallery = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [activeBtn, setActiveBtn] = useState(0);
	const [visibleCount, setVisibleCount] = useState(6);
	const [openPopup, setOpenPopup] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);

	useEffect(() => {
		dispatch(getGallery());
	}, [dispatch]);

	const gallery = useSelector(selectGalleryList);

	const photoList =
		gallery.length > 0 && activeBtn === 0
			? [...gallery[0]?.imgs, ...gallery[1]?.imgs]
			: activeBtn === 1
			? gallery[1]?.imgs
			: gallery[0]?.imgs;

	// console.log("PhotoList", photoList);

	const t = useTranslations("Gallery");
	const btn = [
		{ id: 0, btn: t("btn.0") },
		{ id: 1, btn: t("btn.1") },
		{ id: 2, btn: t("btn.2") },
	];

	const hundlerMore = () => {
		setVisibleCount((prev) => prev + 6);
	};

	const hundlerOpenPopup = (index: number) => {
		// console.log("Index", index);
		setSelectedIndex(index);
		setOpenPopup(true);
	};
	const hundlerClosePopup = () => {
		setOpenPopup(false);
	};

	return (
		<WrapperForComponents paddingTop={40} paddingBottom={40}>
			<div id="Gallery" className={s.galleryWrapper}>
				<div className={s.galleryHead}>
					<div className={s.galleryHeadBtn}>
						<div className={s.galleryHeadTitle}>
							<svg
								className={`${s.galleryPopupIcon} ${s.iconRight} ${
									!openPopup && s.displayNone
								}`}
							>
								<use href="sprite.svg#icon-arrow-bottom-left"></use>
							</svg>
							<h2 className={s.galleryTitle}>{t("title")}</h2>
						</div>

						<button
							className={s.galleryPoppupBtn}
							onClick={
								openPopup ? hundlerClosePopup : () => hundlerOpenPopup(0)
							}
						>
							<svg
								className={`${s.galleryPopupIcon} ${
									openPopup && s.displayNone
								}`}
							>
								<use href="sprite.svg#icon-arrow-bottom-left"></use>
							</svg>
							<svg
								className={`${s.galleryClosePopupIcon} ${
									!openPopup && s.displayNone
								}`}
							>
								<use href="sprite.svg#icon-burger-menu-close"></use>
							</svg>
						</button>
					</div>
					<ul className={s.galleryBtnList}>
						{btn.map((item) => (
							<li
								key={item.id}
								className={`${s.galeryBtnItem} ${
									activeBtn === item.id ? s.active : ""
								}`}
								onClick={() => setActiveBtn(item.id)}
							>
								{item.btn}
							</li>
						))}
					</ul>
				</div>

				{!openPopup && (
					<>
						<ul className={s.galleryList}>
							{photoList?.slice(0, visibleCount).map((img, index) => (
								<li
									key={index}
									className={s.imgItem}
									onClick={() => hundlerOpenPopup(index)}
								>
									<Image
										src={typeof img === "string" ? img : img.url}
										alt={`gallery-img-${index}`}
										width={200}
										height={150}
										className={s.imgPreview}
										unoptimized
									/>
								</li>
							))}
						</ul>
						{photoList && visibleCount < photoList.length && (
							<button
								type="button"
								className={s.btnSeeMoreMob}
								onClick={hundlerMore}
							>
								{t("btn_more")}
							</button>
						)}
					</>
				)}

				{openPopup && (
					<GalleryPopupSwiper
						photoList={photoList}
						initialIndex={selectedIndex}
					/>
				)}
			</div>
		</WrapperForComponents>
	);
};

export default Gallery;
