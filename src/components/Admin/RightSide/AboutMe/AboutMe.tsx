import React, { useEffect, useState } from "react";
import s from "./AboutMe.module.css";
import { ErrorMessage, Form, Formik, FormikProps } from "formik";
import language from "../MainMenu/LanguageSelector.json";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import AboutMeField from "./AboutMeField/AboutMeField";
import { ValidationSchemaAboutMe } from "@/lib/utils/validationSchema";
import Image from "next/image";
import { AboutMeFormProps } from "@/types/types";
import { selectAboutMe } from "@/redux/aboutMe/selectors";
import {
	createAboutMe,
	deleteAboutMe,
	getAllAboutMe,
	updateAboutMe,
} from "@/redux/aboutMe/operations";

const AboutMe = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [selectItem, setSelectItem] = useState(0);
	const [addArticle, setAddArticle] = useState(false);
	const [indexItem, setIndexItem] = useState(0);
	const [editArticle, setEditArticle] = useState(false);

	const aboutMe = useSelector(selectAboutMe);

	const currentItem = aboutMe[indexItem];
	console.log("aboutMe", aboutMe);
	console.log("currentItem", currentItem);

	const langKeys = ["ua", "en", "pl", "de"] as const;
	type LangKey = (typeof langKeys)[number];

	const currentLang: LangKey = langKeys[selectItem];

	const [previewImage, setPreviewImage] = useState<string | null>(null);

	useEffect(() => {
		dispatch(getAllAboutMe());
	}, [dispatch]);

	useEffect(() => {
		if (currentItem?.img) {
			setPreviewImage(currentItem.img);
		} else {
			setPreviewImage(null);
		}
	}, [currentItem]);

	if (!currentItem) return <p>Loading...</p>;

	const initialValues: AboutMeFormProps = {
		titleUa: addArticle ? "" : currentItem?.ua.title || "",
		titlePl: addArticle ? "" : currentItem?.pl.title || "",
		titleEn: addArticle ? "" : currentItem?.en.title || "",
		titleDe: addArticle ? "" : currentItem?.de.title || "",
		subTitleUa: addArticle ? "" : currentItem?.ua.subTitle || "",
		subTitlePl: addArticle ? "" : currentItem?.pl.subTitle || "",
		subTitleEn: addArticle ? "" : currentItem?.en.subTitle || "",
		subTitleDe: addArticle ? "" : currentItem?.de.subTitle || "",
		img: addArticle ? null : null,
		existingImg: addArticle ? "" : currentItem?.img || null,
	};

	// коли користувач вибирає файл:
	const handleImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setFieldValue: FormikProps<AboutMeFormProps>["setFieldValue"]
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setFieldValue("img", file);

		const objectUrl = URL.createObjectURL(file);
		// звільняємо старий blob
		if (previewImage && previewImage.startsWith("blob:")) {
			URL.revokeObjectURL(previewImage);
		}

		setPreviewImage(objectUrl);

		// якщо було серверне зображення — видаляємо його з existingImg
		setFieldValue("existingImg", null);
	};

	const handleImageDelete = (
		setFieldValue: FormikProps<AboutMeFormProps>["setFieldValue"]
	) => {
		if (previewImage && previewImage.startsWith("blob:")) {
			URL.revokeObjectURL(previewImage);
		}
		setPreviewImage(null);

		setFieldValue("img", null);
		setFieldValue("existingImg", null);
	};

	const hundlerDelete = (id?: string) => {
		if (!id) return;
		dispatch(deleteAboutMe(id));
	};

	const hundlerSubmit = (values: AboutMeFormProps) => {
		if (!currentItem?._id) return;

		const formData = new FormData();

		if (values.img) {
			formData.append("img", values.img);
		}

		if (values.existingImg) {
			formData.append("existingImg", values.existingImg);
		}

		Object.entries(values).forEach(([key, value]) => {
			if (key === "img" || key === "existingImg") return;
			if (value !== "" && value !== null && value !== undefined) {
				formData.append(key, value as string | Blob);
			}
		});

		console.log("DATAFORM", formData);
		if (addArticle) {
			dispatch(createAboutMe(formData));
		} else dispatch(updateAboutMe({ id: currentItem._id, formData }));
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={ValidationSchemaAboutMe}
			onSubmit={hundlerSubmit}
			enableReinitialize
		>
			{({ errors, setFieldValue, resetForm }) => (
				<Form className={s.mainForm}>
					<div className={s.blockSwitchers}>
						<ul className={s.articleList}>
							{aboutMe.map((_, index) => (
								<li
									key={index}
									className={`${s.articleItem} ${
										indexItem === index ? s.active : ""
									}`}
									onClick={() => {
										setIndexItem(index);
									}}
								>
									Стаття {index + 1}
								</li>
							))}
							<li
								className={s.articleItem}
								onClick={() => {
									setAddArticle(true);
									setPreviewImage(null);
								}}
							>
								<svg className={s.articleAddIcon}>
									<use href="/sprite.svg#icon-plus"></use>
								</svg>
							</li>
						</ul>

						<ul className={s.languageSelector}>
							{language.map((item) => {
								const hasError =
									(item.id === 0 && (errors.titleUa || errors.subTitleUa)) ||
									(item.id === 1 && (errors.titleEn || errors.subTitleEn)) ||
									(item.id === 2 && (errors.titlePl || errors.subTitlePl)) ||
									(item.id === 3 && (errors.titleDe || errors.subTitleDe));

								return (
									<li
										key={item.id}
										className={`${s.languageItem} ${
											selectItem === item.id ? s.active : ""
										} ${hasError ? s.errorLang : ""}`}
										onClick={() => setSelectItem(item.id)}
									>
										{item.language}
									</li>
								);
							})}
						</ul>
					</div>

					{!editArticle && (
						<>
							<div className={s.articleContent}>
								<h3
									className={s.articleContentTitle}
									dangerouslySetInnerHTML={{
										__html: currentItem[currentLang].title || "",
									}}
								></h3>
								<p
									className={s.articleContentText}
									dangerouslySetInnerHTML={{
										__html: currentItem[currentLang].subTitle || "",
									}}
								></p>
							</div>
							<div className={s.btnEditGroup}>
								<button
									type="button"
									className={s.btnEdit}
									onClick={() => {
										setEditArticle(true);
									}}
								>
									Редагувати статтю
								</button>
								<button
									type="button"
									className={s.btnDelete}
									onClick={() => {
										hundlerDelete(currentItem?._id);
									}}
								>
									Видалити
								</button>
							</div>
						</>
					)}

					{editArticle && (
						<>
							<ul className={s.mainContentList}>
								{selectItem === 0 && (
									<>
										<AboutMeField title="Заголовок статті *" lang="Ua" />
										<AboutMeField
											title="Текст *"
											subTitleIndex="Title"
											lang="Ua"
										/>
									</>
								)}
								{selectItem === 1 && (
									<>
										<AboutMeField title="Page title" lang="En" />
										<AboutMeField
											title="Subtitle 1"
											subTitleIndex="Title"
											lang="En"
										/>
									</>
								)}
								{selectItem === 2 && (
									<>
										<AboutMeField title="Tytuł strony" lang="Pl" />
										<AboutMeField
											title="Podtytuł 1"
											subTitleIndex="Title"
											lang="Pl"
										/>
									</>
								)}
								{selectItem === 3 && (
									<>
										<AboutMeField title="Seitentitel" lang="De" />
										<AboutMeField
											title="Unterüberschrift 1"
											subTitleIndex="Title"
											lang="De"
										/>
									</>
								)}
							</ul>

							<div className={s.photoLabel}>
								<div className={`${s.imgItem} ${previewImage ? s.upLoad : ""}`}>
									{/* показ картинки */}
									{previewImage && (
										<Image
											src={previewImage}
											width={120}
											height={150}
											alt="about-me-img"
											className={s.imgMain}
										/>
									)}

									{/* input */}
									<input
										type="file"
										accept="image/*"
										id="img-upload"
										style={{ display: "none" }}
										onChange={(e) => handleImageChange(e, setFieldValue)}
									/>

									{/* кнопки */}
									{previewImage && (
										<div className={s.btnBlock}>
											{/* Replace */}
											<label htmlFor="img-upload" className={s.replaceBlock}>
												<svg className={s.deleteIcon}>
													<use href="/sprite.svg#icon-replace"></use>
												</svg>
											</label>

											{/* Delete */}
											<button
												className={s.deleteBlock}
												type="button"
												onClick={() => handleImageDelete(setFieldValue)}
											>
												<svg className={s.deleteIcon}>
													<use href="/sprite.svg#icon-delete"></use>
												</svg>
											</button>
										</div>
									)}

									{/* аплоад */}
									{!previewImage && (
										<label htmlFor="img-upload" className={s.imgUploadLabel}>
											<svg className={s.upLoadIcon}>
												<use href="/sprite.svg#icon-upload"></use>
											</svg>
										</label>
									)}
								</div>

								<ErrorMessage name="img" component="p" className={s.error} />
							</div>

							<div className={s.btnAbout}>
								<button type="submit" className={s.sendBtn}>
									Зберегти зміни
								</button>
								<button
									type="button"
									className={s.resetBtn}
									onClick={() => {
										resetForm();
										setPreviewImage(currentItem?.img || null);
									}}
								>
									відхилити зміни
								</button>
							</div>
						</>
					)}
				</Form>
			)}
		</Formik>
	);
};

export default AboutMe;
