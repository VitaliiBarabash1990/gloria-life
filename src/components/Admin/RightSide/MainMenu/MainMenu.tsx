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

const PLACEHOLDER = "/img/hero/Blog_button.png";

const MainMenu = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [selectItem, setSelectItem] = useState(0);
	const [successMessage, setSuccessMessage] = useState(""); // <-- повідомлення про успіх

	const main = useSelector(selectMain);

	// previewImages завжди має 5 слотів; якщо main ще не підвантажено — 4-й слот = плейсхолдер
	const [previewImages, setPreviewImages] = useState<(string | null)[]>(() => {
		if (main?.img?.length) {
			const imgs = [...main.img];
			const firstThree = [imgs[0] || null, imgs[1] || null, imgs[2] || null];
			const lastImg = imgs.length > 3 ? imgs[imgs.length - 1] : null;
			return [...firstThree, PLACEHOLDER, lastImg];
		}
		return [null, null, null, PLACEHOLDER, null];
	});

	useEffect(() => {
		dispatch(getAllMain());
	}, [dispatch]);

	// коли main оновився — формуємо previewImages так, щоб 4-й завжди був плейсхолдер
	useEffect(() => {
		if (main?.img) {
			const imgs = [...main.img];
			const firstThree = [imgs[0] || null, imgs[1] || null, imgs[2] || null];
			const lastImg = imgs.length > 3 ? imgs[imgs.length - 1] : null;
			setPreviewImages([...firstThree, PLACEHOLDER, lastImg]);
		} else {
			setPreviewImages([null, null, null, PLACEHOLDER, null]);
		}
	}, [main]);

	if (!main) return <p>Loading...</p>;

	// initialValues: img має 5 слотів, existingImg з бекенду
	const initialValues: MainMenuFormProps & { existingImg?: string[] } = {
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
		// 5 слотів: вони відповідають previewImages
		img: [null, null, null, null, null] as (File | null)[],
		// existingImg — масив URL-ів, що вже є в БД
		existingImg: main?.img || [],
	};

	// коли користувач вибирає файл:
	const handleImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
		setFieldValue: FormikProps<
			MainMenuFormProps & { existingImg?: string[] }
		>["setFieldValue"],
		values: MainMenuFormProps & { existingImg?: string[] }
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// зберігаємо файл у Formik
		setFieldValue(`img[${index}]`, file);

		const objectUrl = URL.createObjectURL(file);
		setPreviewImages((prev) => {
			const updated = [...prev];
			const prevVal = prev[index];

			// якщо попереднє значення було blob -> звільняємо
			if (
				prevVal &&
				typeof prevVal === "string" &&
				prevVal.startsWith("blob:")
			) {
				URL.revokeObjectURL(prevVal);
			}

			// якщо попереднє значення було server-url (тобто в existingImg) — видаляємо його з existingImg
			if (
				prevVal &&
				typeof prevVal === "string" &&
				prevVal !== PLACEHOLDER &&
				!prevVal.startsWith("blob:")
			) {
				const newExisting = (values?.existingImg || []).filter(
					(u: string) => u !== prevVal
				);
				setFieldValue("existingImg", newExisting);
			}

			updated[index] = objectUrl;
			return updated;
		});
	};

	// видалення фото з певного слота
	const handleImageDelete = (
		index: number,
		setFieldValue: FormikProps<
			MainMenuFormProps & { existingImg?: string[] }
		>["setFieldValue"],
		values: MainMenuFormProps & { existingImg?: string[] }
	) => {
		setPreviewImages((prev) => {
			const updated = [...prev];
			const prevVal = prev[index];

			if (prevVal && typeof prevVal === "string") {
				// якщо це blob — звільняємо
				if (prevVal.startsWith("blob:")) {
					URL.revokeObjectURL(prevVal);
				} else if (prevVal !== PLACEHOLDER) {
					// якщо це server url — видаляємо з existingImg
					const newExisting = (values?.existingImg || []).filter(
						(u: string) => u !== prevVal
					);
					setFieldValue("existingImg", newExisting);
				}
			}

			updated[index] = null;
			return updated;
		});

		// очищуємо файл у Formik
		setFieldValue(`img[${index}]`, null);
	};

	// сабміт: додаємо нові файли + existingImg (JSON), інші поля додаємо по ключах
	const hundlerSubmit = (
		values: MainMenuFormProps & { existingImg?: string[] }
	) => {
		if (!main?._id) return;

		const formData = new FormData();

		// додаємо нові файли
		(values.img || []).forEach((file) => {
			if (file) formData.append("img", file);
		});

		// відправляємо existingImg як JSON (бекенд повинен розуміти цей формат)
		formData.append("existingImg", JSON.stringify(values.existingImg || []));

		// додаємо решту полів
		Object.entries(values).forEach(([key, value]) => {
			if (key === "img" || key === "existingImg") return;
			if (value !== "" && value !== null && value !== undefined) {
				formData.append(key, value as string | Blob);
			}
		});

		// для дебагу (між іншим)
		// console.log("FORMDATA entries:", formData);

		dispatch(updateMain({ id: main._id, formData })).then(() => {
			setSuccessMessage("Змінні оновленно!");
			setTimeout(() => setSuccessMessage(""), 3000);
		});
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={ValidationSchema}
			onSubmit={hundlerSubmit}
			enableReinitialize
		>
			{({ setFieldValue, errors, values }) => (
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
									{/* показ картинки */}
									{img && (
										<Image
											src={img}
											width={60}
											height={72}
											alt={`img_${i + 1}`}
											className={s.imgMain}
										/>
									)}

									{/* схований input завжди */}
									<input
										key={img ? "replace" : "new"} // пересоздає інпут після видалення
										type="file"
										accept="image/*"
										id={`img-upload-${i}`}
										style={{ display: "none" }}
										onChange={(e) =>
											handleImageChange(e, i, setFieldValue, values)
										}
									/>

									{/* кнопки для картинки */}
									{img && img !== PLACEHOLDER && (
										<div className={s.btnBlock}>
											{/* Replace */}
											<label
												htmlFor={`img-upload-${i}`}
												className={s.replaceBlock}
											>
												<svg className={s.deleteIcon}>
													<use href="/sprite.svg#icon-replace"></use>
												</svg>
											</label>

											{/* Delete */}
											<button
												className={s.deleteBlock}
												type="button"
												onClick={() =>
													handleImageDelete(i, setFieldValue, values)
												}
											>
												<svg className={s.deleteIcon}>
													<use href="/sprite.svg#icon-delete"></use>
												</svg>
											</button>
										</div>
									)}

									{/* аплоад для пустого слоту */}
									{!img && (
										<label
											htmlFor={`img-upload-${i}`}
											className={s.imgUploadLabel}
										>
											<svg className={s.upLoadIcon}>
												<use href="/sprite.svg#icon-upload"></use>
											</svg>
										</label>
									)}
								</li>
							))}
						</ul>

						<ErrorMessage name="img" component="p" className={s.error} />
					</div>

					{successMessage && (
						<p className={s.successMessage}>{successMessage}</p>
					)}

					<button type="submit" className={s.sendBtn}>
						Відправити Данні!
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default MainMenu;
