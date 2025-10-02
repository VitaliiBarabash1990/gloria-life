"use client";
import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { MainMenuFormProps } from "@/types/types";
import s from "./BlogField.module.css";
import useIsMobile from "@/lib/hooks/IsMobile";
import AutoResizeTextarea from "./AutoResizeTextarea/AutoResizeTextarea";

type ContentItemProps = {
	title: string; // наприклад: "Заголовок сторінки"
	subTitleIndex?: "Title"; // якщо це підзаголовок
	lang: "Ua" | "En" | "Pl" | "De"; // мова
};

const AboutMeField = ({ title, subTitleIndex, lang }: ContentItemProps) => {
	const { setFieldValue } = useFormikContext<MainMenuFormProps>();
	const isMobile = useIsMobile();

	// визначаємо ім'я поля у Formik
	let fieldName = "";
	if (!subTitleIndex) {
		fieldName = `title${lang}`; // titleUa / titleEn / ...
	} else {
		fieldName = `sub${subTitleIndex}${lang}`; // subTitleUa / ...
	}

	// чи це textarea?
	const isTextarea = Boolean(subTitleIndex || isMobile);

	return (
		<li className={s.mainContentItem}>
			<label className={s.label}>
				<div className={s.labelName}>{title}</div>

				{isTextarea ? (
					<Field
						name={fieldName}
						component={AutoResizeTextarea}
						placeholder={`Введіть ${title.toLowerCase()} ${lang.toLowerCase()}...`}
					/>
				) : (
					<Field
						as="input"
						type="text"
						name={fieldName}
						placeholder={`Введіть ${title.toLowerCase()} ${lang.toLowerCase()}...`}
						className={s.input}
					/>
				)}

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

export default AboutMeField;
