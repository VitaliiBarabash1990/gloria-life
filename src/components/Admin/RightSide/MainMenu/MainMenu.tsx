"use client";
import React, { useState, useEffect } from "react";
import s from "./MainMenu.module.css";
import language from "./LanguageSelector.json";
import { ErrorMessage, Form, Formik, FormikProps } from "formik";
import { MainMenuFormProps } from "@/types/types";
import { ValidationSchema } from "@/lib/utils/validationSchema";
import ContentItem from "./ContentItem/ContentItem";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { selectMain } from "@/redux/main/selectors";
import { AppDispatch } from "@/redux/store";
import { getAllMain, updateMain } from "@/redux/main/operations";

const MainMenu = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [selectItem, setSelectItem] = useState(0);

	const main = useSelector(selectMain);

	const [previewImages, setPreviewImages] = useState<(string | null)[]>(() => {
		if (main?.img?.length)
			return [...main.img, null, null, null, null].slice(0, 5);
		return [null, null, null, null, null];
	});

	useEffect(() => {
		dispatch(getAllMain());
	}, [dispatch]);

	useEffect(() => {
		if (main?.img)
			setPreviewImages([...main.img, null, null, null, null].slice(0, 5));
	}, [main]);

	if (!main) return <p>Loading...</p>;

	const initialValues: MainMenuFormProps = {
		titleUa: main?.ua.title || "",
		titleEn: main?.en.title || "",
		titlePl: main?.pl.title || "",
		titleDe: main?.de.title || "",
		subTitleOneUa: main?.ua.subTitleOne || "",
		subTitleOneEn: main?.en.subTitleOne || "",
		subTitleOnePl: main?.pl.subTitleOne || "",
		subTitleOneDe: main?.de.subTitleOne || "",
		subTitleTwoUa: main?.ua.subTitleTwo || "",
		subTitleTwoPl: main?.pl.subTitleTwo || "",
		subTitleTwoEn: main?.en.subTitleTwo || "",
		subTitleTwoDe: main?.de.subTitleTwo || "",
		img: [null, null, null, null] as (File | null)[],
	};

	const handleImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
		setFieldValue: FormikProps<MainMenuFormProps>["setFieldValue"]
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Оновлюємо Formik (File | null)
		setFieldValue(`img[${index}]`, file);

		// Оновлюємо previewImages (string | null)
		const objectUrl = URL.createObjectURL(file);
		setPreviewImages((prev) => {
			const updated = [...prev];
			if (prev[index]) URL.revokeObjectURL(prev[index]!);
			updated[index] = objectUrl;
			return updated;
		});
	};

	const handleImageDelete = (
		index: number,
		setFieldValue: FormikProps<MainMenuFormProps>["setFieldValue"]
	) => {
		setPreviewImages((prev) => {
			const updated = [...prev];
			updated[index] = null;
			return updated;
		});
		setFieldValue(`img[${index}]`, null);
	};

	const hundlerSubmit = (values: MainMenuFormProps) => {
		if (!main?._id) return;

		const formData = new FormData();

		Object.entries(values).forEach(([key, value]) => {
			if (key === "img") {
				(value as (File | null)[]).forEach((file) => {
					if (file) formData.append("img", file);
				});
			} else if (value !== "" && value !== null && value !== undefined) {
				formData.append(key, value as string | Blob);
			}
		});

		console.log("FORMDATA", formData);

		dispatch(updateMain({ id: main._id, formData }));
		// dispatch(createMain(formData));
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={ValidationSchema}
			onSubmit={hundlerSubmit}
			enableReinitialize
		>
			{({ setFieldValue, errors }) => (
				<Form className={s.mainForm}>
					<ul className={s.languageSelector}>
						{language.map((item) => {
							const hasError =
								(item.id === 0 &&
									(errors.titleUa ||
										errors.subTitleOneUa ||
										errors.subTitleTwoUa)) ||
								(item.id === 1 &&
									(errors.titleEn ||
										errors.subTitleOneEn ||
										errors.subTitleTwoEn)) ||
								(item.id === 2 &&
									(errors.titlePl ||
										errors.subTitleOnePl ||
										errors.subTitleTwoPl)) ||
								(item.id === 3 &&
									(errors.titleDe ||
										errors.subTitleOneDe ||
										errors.subTitleTwoDe));

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

					<ul className={s.mainContentList}>
						{selectItem === 0 && (
							<>
								<ContentItem title="Заголовок сторінки" lang="Ua" />
								<ContentItem
									title="Підзаголовок 1"
									subTitleIndex="One"
									lang="Ua"
								/>
								<ContentItem
									title="Підзаголовок 2"
									subTitleIndex="Two"
									lang="Ua"
								/>
							</>
						)}
						{selectItem === 1 && (
							<>
								<ContentItem title="Page title" lang="En" />
								<ContentItem title="Subtitle 1" subTitleIndex="One" lang="En" />
								<ContentItem title="Subtitle 2" subTitleIndex="Two" lang="En" />
							</>
						)}
						{selectItem === 2 && (
							<>
								<ContentItem title="Tytuł strony" lang="Pl" />
								<ContentItem title="Podtytuł 1" subTitleIndex="One" lang="Pl" />
								<ContentItem title="Podtytuł 2" subTitleIndex="Two" lang="Pl" />
							</>
						)}
						{selectItem === 3 && (
							<>
								<ContentItem title="Seitentitel" lang="De" />
								<ContentItem
									title="Unterüberschrift 1"
									subTitleIndex="One"
									lang="De"
								/>
								<ContentItem
									title="Unterüberschrift 2"
									subTitleIndex="Two"
									lang="De"
								/>
							</>
						)}
					</ul>

					<div className={s.photoLabel}>
						<ul className={s.imgList}>
							{previewImages.map((img, i) => (
								<li key={i} className={`${s.imgItem} ${img ? s.upLoad : ""}`}>
									{img ? (
										<Image
											src={img}
											width={60}
											height={72}
											alt={`img_${i + 1}`}
											className={s.imgMain}
										/>
									) : (
										<label className={s.imgUploadLabel}>
											<svg className={s.upLoadIcon}>
												<use href="/sprite.svg#icon-upload"></use>
											</svg>
											<input
												type="file"
												name={`img[${i}]`}
												accept="image/*"
												onChange={(e) => handleImageChange(e, i, setFieldValue)}
												className={s.imgInputHidden}
											/>
										</label>
									)}
									{img && (
										<div className={s.btnBlock}>
											<button
												className={s.replaceBlock}
												type="button"
												onClick={() => handleImageDelete(i, setFieldValue)}
											>
												<svg className={s.deleteIcon}>
													<use href="/sprite.svg#icon-replace"></use>
												</svg>
											</button>
											<button
												className={s.deleteBlock}
												type="button"
												onClick={() => handleImageDelete(i, setFieldValue)}
											>
												<svg className={s.deleteIcon}>
													<use href="/sprite.svg#icon-delete"></use>
												</svg>
											</button>
										</div>
									)}
								</li>
							))}
						</ul>
						<ErrorMessage name="img" component="p" className={s.error} />
					</div>
					<button type="submit" className={s.sendBtn}>
						Відправити Данні!
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default MainMenu;
