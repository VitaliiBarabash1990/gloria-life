"use client";
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import s from "./FormCallBack.module.css";
import { useTranslations } from "next-intl";
// import { sendOrderEmail } from "@/redux/auth/operations";
import toast from "react-hot-toast";
import { CallBackFormProps } from "@/types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { sendOrderTelegram } from "@/redux/auth/operations";

const FormCallBack = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [isLoading, setIsLoading] = useState(false);
	const initialValues: CallBackFormProps = {
		name: "",
		phone: "",
	};
	const succsessContact = () => toast.success("Contact successfully added!");

	const hundlerSumbitEmail = async (
		values: CallBackFormProps,
		options: FormikHelpers<CallBackFormProps>,
	) => {
		const newContact = {
			name: values.name,
			phone: values.phone,
		};
		// console.log("FormData", newContact);
		// dispatch(sendOrderEmail(newContact));
		try {
			setIsLoading(true);
			const response = await fetch("/api/send-email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newContact),
			});

			dispatch(sendOrderTelegram(newContact));

			if (response.ok) {
				succsessContact();
				options.resetForm();
			}
		} catch (error) {
			console.error("Error sending email:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const t = useTranslations("Services");

	return (
		<div className={s.callBackForm}>
			<div className={s.titleGroup}>
				<h4 className={s.titleForm}>{t("title_form")}</h4>
				<h5 className={s.textForm}>{t("text_form")}</h5>
			</div>
			<Formik initialValues={initialValues} onSubmit={hundlerSumbitEmail}>
				<Form className={s.form}>
					<div className={s.formItem}>
						<label className={s.labelInput}>
							<Field
								as="input"
								name="name"
								placeholder={t("input_name")}
								className={s.input}
							/>
						</label>
						<ErrorMessage name="name" component="p" className={s.error} />
					</div>

					<div className={s.formItem}>
						<label className={s.labelInput}>
							<Field
								as="input"
								name="phone"
								placeholder={t("input_phone")}
								className={s.input}
							/>
						</label>
						<ErrorMessage name="phone" component="p" className={s.error} />
					</div>
					<div className={s.formItem}>
						<button type="submit" className={s.formBtn}>
							{isLoading ? "Send..." : t("btn")}
							<div className={s.btnWrap}>
								<svg className={s.btnIcon}>
									<use href="/sprite.svg#icon-heart"></use>
								</svg>
							</div>
						</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

export default FormCallBack;
