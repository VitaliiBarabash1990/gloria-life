"use client";
import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { MainMenuFormProps } from "@/types/types";
import s from "./ServicesField.module.css";
import useIsMobile from "@/lib/hooks/IsMobile";
import AutoResizeTextarea from "./AutoResizeTextarea/AutoResizeTextarea";

type ContentItemProps = {
	title: string; // наприклад: "Заголовок сторінки"
	subTitleIndex?: string; // якщо це підзаголовок
	lang: "Ua" | "En" | "Pl" | "De"; // мова
	placeholderLang?: string;
};

const ServicesField = ({
	title,
	subTitleIndex,
	lang,
	placeholderLang,
}: ContentItemProps) => {
	const { setFieldValue } = useFormikContext<MainMenuFormProps>();
	const isMobile = useIsMobile();

	const placeholder = title.split(" ");
	// console.log("Placeholder", placeholder[0]);

	// визначаємо ім'я поля у Formik
	let fieldName = "";
	if (!subTitleIndex) {
		fieldName = `name${lang}`;
	} else if (subTitleIndex === "description") {
		fieldName = `description${lang}`;
	} else if (subTitleIndex === "price") {
		fieldName = `price`;
	} else if (subTitleIndex === "location") {
		fieldName = `location`;
	} else if (subTitleIndex === "howclases") {
		fieldName = `howclases${lang}`;
	} else if (subTitleIndex === "forwhom") {
		fieldName = `forwhom${lang}`;
	} else {
		fieldName = `link`;
	}

	// чи це textarea?
	const isTextarea = Boolean(
		subTitleIndex === "description" ||
			subTitleIndex === "howclases" ||
			subTitleIndex === "forwhom" ||
			isMobile
	);

	return (
		<div className={s.mainContentItem}>
			<label className={s.label}>
				<div className={s.labelName}>{title}</div>

				{isTextarea ? (
					<Field
						name={fieldName}
						component={AutoResizeTextarea}
						placeholder={
							placeholderLang ? placeholderLang : `*${placeholder[0]}*`
						}
					/>
				) : (
					<Field
						as="input"
						type="text"
						name={fieldName}
						placeholder={
							placeholderLang ? placeholderLang : `*${placeholder[0]}*`
						}
						className={s.input}
					/>
				)}
				{(title === "Локація" || title === "Посилання для запису") && (
					<button
						type="button"
						className={s.btnEdit}
						onClick={() => {
							const key = fieldName as keyof MainMenuFormProps;
							setFieldValue(key, ""); // очищаємо

							// ставимо фокус на input / textarea
							const input = document.querySelector<
								HTMLInputElement | HTMLTextAreaElement
							>(`input[name="${key}"], textarea[name="${key}"]`);
							input?.focus();
						}}
					>
						<svg className={s.iconEdit}>
							<use href="/sprite.svg#icon-tabler-edit"></use>
						</svg>
					</button>
				)}
			</label>
			<ErrorMessage name={fieldName} component="p" className={s.error} />
		</div>
	);
};

export default ServicesField;
