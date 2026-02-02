import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import Image from "next/image";
import s from "./Galery.module.css";
import { GalleryFormProps } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { selectGalleryList } from "@/redux/gallery/selectors";
import {
	deleteGalleryImage,
	getGallery,
	uploadGalleryImages,
} from "@/redux/gallery/operations";

const categories = ["Всі фото", "Психологія", "Барберство"];

export const Galery: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [activeTab, setActiveTab] = useState<number>(0);
	const [successMessage, setSuccessMessage] = useState(""); // <-- повідомлення про успіх

	useEffect(() => {
		dispatch(getGallery());
	}, [dispatch]);

	const gallery = useSelector(selectGalleryList);

	if (gallery.length === 0) {
		return <p>Завантаження...</p>; // або loader
	}

	// console.log("Gallery", gallery);

	const initialValues: GalleryFormProps = {
		categories: [
			{
				type: "psyhology",
				imgs: gallery.find((g) => g.type === "psyhology")?.imgs || [],
			},
			{
				type: "barber",
				imgs: gallery.find((g) => g.type === "barber")?.imgs || [],
			},
		],
	};

	const handleImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setFieldValue: FormikHelpers<GalleryFormProps>["setFieldValue"],
		categoryIndex: number,
		values: GalleryFormProps
	) => {
		const files = e.target.files;
		if (!files) return;

		const fileArray = Array.from(files);
		const updated = [...values.categories];
		updated[categoryIndex].imgs = [
			...updated[categoryIndex].imgs,
			...fileArray,
		].slice(0, 100);

		setFieldValue("categories", updated);
	};

	const handleImageDelete = async (
		setFieldValue: FormikHelpers<GalleryFormProps>["setFieldValue"],
		categoryIndex: number,
		imgIndex: number,
		values: GalleryFormProps
	) => {
		const updatedCategories = structuredClone(values.categories); // або JSON.parse(JSON.stringify(...))
		const category = updatedCategories[categoryIndex];
		const targetImg = category.imgs[imgIndex];

		// Якщо це вже завантажене фото — видаляємо з бекенду
		if (typeof targetImg === "string") {
			await dispatch(
				deleteGalleryImage({
					type: category.type,
					imageUrl: targetImg,
				})
			);
		}

		category.imgs = category.imgs.filter((_, index) => index !== imgIndex);
		setFieldValue("categories", updatedCategories);
	};

	// 📤 Зберегти зміни (відправка на бекенд)
	const handleSubmit = async (values: GalleryFormProps) => {
		for (const cat of values.categories) {
			const newFiles = cat.imgs.filter((i) => i instanceof File) as File[];
			if (newFiles.length > 0) {
				await dispatch(
					uploadGalleryImages({ type: cat.type, files: newFiles })
				);
			}
		}
		dispatch(getGallery()).then(() => {
			setSuccessMessage("Фото успішно збережено!");
			setTimeout(() => setSuccessMessage(""), 3000);
		}); // оновити після збереження
	};

	const getFilteredImages = (values: GalleryFormProps) => {
		if (activeTab === 0)
			return [...values.categories[0].imgs, ...values.categories[1].imgs];
		return values.categories[activeTab - 1].imgs;
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			enableReinitialize
		>
			{({ values, setFieldValue, resetForm }) => (
				<Form className={s.mainForm}>
					<ul className={s.galleryList}>
						{categories.map((cat, idx) => (
							<li
								key={idx}
								onClick={() => setActiveTab(idx)}
								className={`${s.galleryItem} ${
									activeTab === idx ? s.active : ""
								}`}
							>
								{cat}
							</li>
						))}
					</ul>

					<div className={s.imgGalleryList}>
						{activeTab !== 0 && (
							<li className={s.imgItem}>
								<label className={s.uploadBox}>
									<input
										type="file"
										accept="image/*"
										multiple
										onChange={(e) =>
											handleImageChange(e, setFieldValue, activeTab - 1, values)
										}
										style={{ display: "none" }}
									/>
									<svg className={s.uploadIcon}>
										<use href="/sprite.svg#icon-upload"></use>
									</svg>
									<span className={s.labelTitle}>Завантажити</span>
								</label>
							</li>
						)}

						{getFilteredImages(values).map((img, i) => {
							let previewSrc: string | null = null;

							if (typeof img === "string") {
								previewSrc = img; // вже URL з бекенду
							} else if (img instanceof File) {
								previewSrc = URL.createObjectURL(img); // локальний файл
							}
							if (!previewSrc) return null;
							return (
								<li key={i} className={s.imgItem}>
									<Image
										src={previewSrc}
										alt={`gallery-img-${i}`}
										width={200}
										height={150}
										className={s.imgPreview}
									/>
									<button
										type="button"
										className={s.deleteBtn}
										onClick={() =>
											handleImageDelete(setFieldValue, activeTab - 1, i, values)
										}
									>
										<svg className={s.deleteIcon}>
											<use href="/sprite.svg#icon-delete"></use>
										</svg>
									</button>
								</li>
							);
						})}
					</div>

					<ErrorMessage name="imgs" component="p" className={s.error} />

					{successMessage && (
						<p className={s.successMessage}>{successMessage}</p>
					)}
					<div className={s.btnGroup}>
						<button type="submit" className={s.saveBtn}>
							Зберегти зміни
						</button>
						<button
							type="button"
							className={s.cancelBtn}
							onClick={async () => {
								await dispatch(getGallery());
								resetForm();
							}}
						>
							Відхилити зміни
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};
