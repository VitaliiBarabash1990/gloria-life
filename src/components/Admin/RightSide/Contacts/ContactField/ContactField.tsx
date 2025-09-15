// ContentItem.tsx
"use client";
import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { ContactsMenuFormProps, MainMenuFormProps } from "@/types/types";
import s from "./ContactField.module.css";
import useIsMobile from "@/lib/hooks/IsMobile";

type ContentItemProps = {
	title: string; // наприклад: "Заголовок сторінки"
	fieldName: string; // якщо це підзаголовок
};

const ContactField = ({ title, fieldName }: ContentItemProps) => {
	const { setFieldValue } = useFormikContext<MainMenuFormProps>();
	const isMobile = useIsMobile();
	// console.log("IsMobile", isMobile);

	return (
		<li className={s.mainContentItem}>
			<label className={s.label}>
				<div className={s.labelName}>{title}</div>
				<Field
					as={fieldName !== "number" ? "textarea" : "input"}
					name={fieldName}
					placeholder={
						fieldName === "number" ? "+38 (077) 777 77 77" : "*посилання*"
					}
					className={isMobile ? s.textarea : s.input}
				/>
				<div className={s.btnGroup}>
					<button
						type="button"
						className={s.btnEdit}
						onClick={() => {
							const key = fieldName as keyof ContactsMenuFormProps;

							// НЕ очищаємо (якщо треба редагувати існуюче значення)
							// setFieldValue(key, "");

							// знайдемо input / textarea
							const input = document.querySelector<
								HTMLInputElement | HTMLTextAreaElement
							>(`input[name="${key}"], textarea[name="${key}"]`);

							if (input) {
								input.focus();

								// ставимо курсор у кінець значення
								const length = input.value.length;
								input.setSelectionRange(length, length);
							}
						}}
					>
						<svg className={s.iconEdit}>
							<use href="/sprite.svg#icon-tabler-edit"></use>
						</svg>
					</button>
					<button
						type="button"
						className={s.btnEdit}
						onClick={() => {
							const key = fieldName as keyof ContactsMenuFormProps;
							setFieldValue(key, ""); // очищаємо

							// ставимо фокус на input / textarea
							const input = document.querySelector<
								HTMLInputElement | HTMLTextAreaElement
							>(`input[name="${key}"], textarea[name="${key}"]`);
							input?.focus();
						}}
					>
						<svg className={s.iconDelete}>
							<use href="/sprite.svg#icon-delete"></use>
						</svg>
					</button>
				</div>
			</label>
			<ErrorMessage name={fieldName} component="p" className={s.error} />
		</li>
	);
};

export default ContactField;
