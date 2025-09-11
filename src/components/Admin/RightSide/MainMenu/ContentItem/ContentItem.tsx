// ContentItem.tsx
"use client";
import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { MainMenuFormProps } from "@/types/types";
import s from "./ContentItem.module.css";
import useIsMobile from "@/lib/hooks/IsMobile";

type ContentItemProps = {
	title: string; // наприклад: "Заголовок сторінки"
	subTitleIndex?: "One" | "Two"; // якщо це підзаголовок
	lang: "Ua" | "En" | "Pl" | "De"; // мова
};

const ContentItem = ({ title, subTitleIndex, lang }: ContentItemProps) => {
	const { setFieldValue } = useFormikContext<MainMenuFormProps>();
	const isMobile = useIsMobile();
	console.log("IsMobile", isMobile);

	// визначаємо ім'я поля у Formik
	let fieldName = "";
	if (!subTitleIndex) {
		fieldName = `title${lang}`; // titleUa / titleEn / ...
	} else {
		fieldName = `subTitle${subTitleIndex}${lang}`; // subTitleOneUa / subTitleTwoEn / ...
	}

	return (
		<li className={s.mainContentItem}>
			<label className={s.label}>
				<div className={s.labelName}>{title}</div>
				<Field
					as={subTitleIndex || isMobile ? "textarea" : "input"}
					name={fieldName}
					placeholder={`Введіть ${title.toLowerCase()} ${lang.toLowerCase()}...`}
					className={subTitleIndex || isMobile ? s.textarea : s.input}
				/>
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
			</label>
			<ErrorMessage name={fieldName} component="p" className={s.error} />
		</li>
	);
};

export default ContentItem;
