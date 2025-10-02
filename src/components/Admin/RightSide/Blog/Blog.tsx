import React, { useEffect, useState } from "react";
import s from "./Blog.module.css";
import { ErrorMessage, Form, Formik, FormikProps } from "formik";
import language from "../MainMenu/LanguageSelector.json";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import BlogField from "./BlogField/BlogField";
import { ValidationSchemaAboutMe } from "@/lib/utils/validationSchema";
import Image from "next/image";
import { ArticleFormProps } from "@/types/types";
import {
	createArticle,
	deleteArticle,
	getAllArticle,
	updateArticle,
} from "@/redux/blog/operations";
import {
	selectBarberArticles,
	selectPsychologyArticles,
} from "@/redux/blog/selectors";

const Blog = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [isType, setIsType] = useState(0);
	const [selectItem, setSelectItem] = useState(0);
	const [addArticle, setAddArticle] = useState(false);
	const [indexItem, setIndexItem] = useState(0);
	const [editArticle, setEditArticle] = useState(false);

	const carrentVariant =
		isType === 0 ? selectBarberArticles : selectPsychologyArticles;

	const article = useSelector(carrentVariant);

	useEffect(() => {
		dispatch(getAllArticle());
	}, [dispatch]);

	const currentItem = article[indexItem];

	const langKeys = ["ua", "en", "pl", "de"] as const;
	type LangKey = (typeof langKeys)[number];
	const currentLang: LangKey = langKeys[selectItem];

	const [previewImage, setPreviewImage] = useState<string | null>(null);

	useEffect(() => {
		if (currentItem?.img && !addArticle) {
			setPreviewImage(currentItem.img);
		} else {
			setPreviewImage(null);
		}
	}, [currentItem, addArticle]);

	const initialValues: ArticleFormProps = {
		titleUa: addArticle ? "" : currentItem?.ua?.title || "",
		titlePl: addArticle ? "" : currentItem?.pl?.title || "",
		titleEn: addArticle ? "" : currentItem?.en?.title || "",
		titleDe: addArticle ? "" : currentItem?.de?.title || "",
		subTitleUa: addArticle ? "" : currentItem?.ua?.subTitle || "",
		subTitlePl: addArticle ? "" : currentItem?.pl?.subTitle || "",
		subTitleEn: addArticle ? "" : currentItem?.en?.subTitle || "",
		subTitleDe: addArticle ? "" : currentItem?.de?.subTitle || "",
		articleUa: addArticle ? "" : currentItem?.ua?.article || "",
		articlePl: addArticle ? "" : currentItem?.pl?.article || "",
		articleEn: addArticle ? "" : currentItem?.en?.article || "",
		articleDe: addArticle ? "" : currentItem?.de?.article || "",
		type: isType === 0 ? "barber" : "psychology",
		img: null,
		existingImg: addArticle ? "" : currentItem?.img || null,
	};

	const handleImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setFieldValue: FormikProps<ArticleFormProps>["setFieldValue"]
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setFieldValue("img", file);

		const objectUrl = URL.createObjectURL(file);
		if (previewImage && previewImage.startsWith("blob:")) {
			URL.revokeObjectURL(previewImage);
		}

		setPreviewImage(objectUrl);
		setFieldValue("existingImg", null);
	};

	const handleImageDelete = (
		setFieldValue: FormikProps<ArticleFormProps>["setFieldValue"]
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
		dispatch(deleteArticle(id));
	};

	const hundlerSubmit = (values: ArticleFormProps) => {
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

		if (addArticle) {
			dispatch(createArticle(formData));
		} else if (currentItem?._id) {
			dispatch(updateArticle({ id: currentItem._id, formData }));
		}
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
						<ul className={s.typeList}>
							<li
								onClick={() => setIsType(0)}
								className={`${s.typeItem} ${isType === 0 ? s.active : ""}`}
							>
								Барберство
							</li>
							<li
								onClick={() => setIsType(1)}
								className={`${s.typeItem} ${isType === 1 ? s.active : ""}`}
							>
								Психологія
							</li>
						</ul>
						<ul className={s.articleList}>
							{article.length > 0 ? (
								article.map((_, index) => (
									<li
										key={index}
										className={`${s.articleItem} ${
											indexItem === index ? s.active : ""
										}`}
										onClick={() => {
											setIndexItem(index);
											setAddArticle(false);
											setEditArticle(false);
										}}
									>
										Стаття {index + 1}
									</li>
								))
							) : (
								<li className={s.noArticles}>Немає статей</li>
							)}
							<li
								className={s.articleItem}
								onClick={() => {
									setAddArticle(true);
									setEditArticle(true);
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
									(item.id === 0 &&
										(errors.titleUa ||
											errors.subTitleUa ||
											errors.articleUa)) ||
									(item.id === 1 &&
										(errors.titleEn ||
											errors.subTitleEn ||
											errors.articleEn)) ||
									(item.id === 2 &&
										(errors.titlePl ||
											errors.subTitlePl ||
											errors.articlePl)) ||
									(item.id === 3 &&
										(errors.titleDe || errors.subTitleDe || errors.articleDe));

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

					{(currentItem || addArticle) && (
						<>
							{!editArticle ? (
								currentItem && (
									<>
										<div className={s.articleContent}>
											<h3
												className={s.articleContentTitle}
												dangerouslySetInnerHTML={{
													__html: currentItem[currentLang]?.title || "",
												}}
											/>
											<p
												className={s.articleContentText}
												dangerouslySetInnerHTML={{
													__html: currentItem[currentLang]?.subTitle || "",
												}}
											/>
											<p
												className={s.articleContentText}
												dangerouslySetInnerHTML={{
													__html: currentItem[currentLang]?.article || "",
												}}
											/>
										</div>
										<div className={s.btnEditGroup}>
											<button
												type="button"
												className={s.btnEdit}
												onClick={() => setEditArticle(true)}
											>
												Редагувати статтю
											</button>
											<button
												type="button"
												className={s.btnDelete}
												onClick={() => hundlerDelete(currentItem?._id)}
											>
												Видалити
											</button>
										</div>
									</>
								)
							) : (
								<>
									<ul className={s.mainContentList}>
										{selectItem === 0 && (
											<>
												<BlogField title="Заголовок статті *" lang="Ua" />
												<BlogField
													title="Підзаголовок / цитата"
													subTitleIndex="Title"
													lang="Ua"
												/>
												<BlogField
													title="Стаття *"
													subTitleIndex="Article"
													lang="Ua"
												/>
											</>
										)}
										{selectItem === 1 && (
											<>
												<BlogField title="Title of the article *" lang="En" />
												<BlogField
													title="Subtitle / quote"
													subTitleIndex="Title"
													lang="En"
												/>
												<BlogField
													title="Article *"
													subTitleIndex="Article"
													lang="En"
												/>
											</>
										)}
										{selectItem === 2 && (
											<>
												<BlogField title="Tytuł artykułu *" lang="Pl" />
												<BlogField
													title="Podtytuł / cytat"
													subTitleIndex="Title"
													lang="Pl"
												/>
												<BlogField
													title="Artykuł *"
													subTitleIndex="Article"
													lang="Pl"
												/>
											</>
										)}
										{selectItem === 3 && (
											<>
												<BlogField title="Titel des Artikels *" lang="De" />
												<BlogField
													title="Untertitel/Zitat"
													subTitleIndex="Title"
													lang="De"
												/>
												<BlogField
													title="Artikel *"
													subTitleIndex="Article"
													lang="De"
												/>
											</>
										)}
									</ul>

									<div className={s.photoLabel}>
										<div
											className={`${s.imgItem} ${previewImage ? s.upLoad : ""}`}
										>
											{previewImage && (
												<Image
													src={previewImage}
													width={120}
													height={150}
													alt="blog-img"
													className={s.imgMain}
												/>
											)}

											<input
												type="file"
												accept="image/*"
												id="img-upload"
												style={{ display: "none" }}
												onChange={(e) => handleImageChange(e, setFieldValue)}
											/>

											{previewImage ? (
												<div className={s.btnBlock}>
													<label
														htmlFor="img-upload"
														className={s.replaceBlock}
													>
														<svg className={s.deleteIcon}>
															<use href="/sprite.svg#icon-replace"></use>
														</svg>
													</label>
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
											) : (
												<label
													htmlFor="img-upload"
													className={s.imgUploadLabel}
												>
													<svg className={s.upLoadIcon}>
														<use href="/sprite.svg#icon-upload"></use>
													</svg>
												</label>
											)}
										</div>

										<ErrorMessage
											name="img"
											component="p"
											className={s.error}
										/>
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
						</>
					)}
				</Form>
			)}
		</Formik>
	);
};

export default Blog;
