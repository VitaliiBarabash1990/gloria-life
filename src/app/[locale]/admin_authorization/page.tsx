"use client";
import React from "react";
import WrapperForComponents from "@/components/UI/WrapperForComponents/WrapperForComponents";
import s from "./page.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AuthorizationProps } from "@/types/types";
import * as Yup from "yup";
import { useRouter } from "@/i18n/routing";
import { toast } from "react-toastify";
import { adminLogIn } from "@/redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { selectIsError, selectIsSuccess } from "@/redux/auth/selectors";
import ErrorAuthPopup from "@/components/UI/ErrorPopups/ErrorAuthPopup/ErrorAuthPopup";

const Page = () => {
	const dispatch = useDispatch<AppDispatch>();

	const router = useRouter();

	const isError = useSelector(selectIsError);
	const isSuccess = useSelector(selectIsSuccess);
	console.log("isSuccess", isSuccess);
	console.log("Error", isError);

	const passwordRules = /^[a-zA-Z0-9]+$/;
	const validationSchema = () => {
		return Yup.object({
			email: Yup.string()
				.email("Не коректний Email!")
				.required("Введіть коректну email-адресу!"),
			password: Yup.string()
				.matches(passwordRules, "Лише латинські літери та цифри!")
				.min(5, "Мінімум 5 символів")
				.required("Обов'язково"),
		});
	};

	const initialValues = {
		email: "",
		password: "",
	};

	const handlerSubmit = async (values: AuthorizationProps) => {
		const formValue = {
			email: values.email,
			password: values.password,
		};
		console.log("FORM_DATA", formValue);

		try {
			// Якщо логін успішний — unwrap поверне дані
			await dispatch(adminLogIn(formValue)).unwrap();

			toast.success("Ви успішно увійшли в адмін-панель ✅");
			router.push("/admin");
		} catch (err) {
			// Якщо логін неуспішний — unwrap кине помилку
			toast.error("Помилка входу ❌");
			console.error("Login error:", err);
		}
	};

	return (
		<>
			<WrapperForComponents>
				<div className={s.authWrapper}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handlerSubmit}
					>
						<Form className={s.formAuth}>
							<div className={s.labelWraper}>
								<label className={s.label}>
									<div className={s.labelName}>Email</div>
									<Field
										type="email"
										name="email"
										placeholder="Логін"
										autoComplete="username"
										className={s.input}
									/>
								</label>
								<ErrorMessage name="email" component="p" className={s.error} />
							</div>
							<div className={s.labelWraper}>
								<label className={s.label}>
									<div className={s.labelName}>Пароль</div>
									<Field
										type="password"
										name="password"
										placeholder="Пароль"
										autoComplete="new-password"
										className={s.input}
									/>
								</label>
								<ErrorMessage
									name="password"
									component="p"
									className={s.error}
								/>
							</div>

							<button type="submit" className={s.btnAuth}>
								Увійти в режим адміністратора
							</button>
						</Form>
					</Formik>
				</div>
			</WrapperForComponents>
			{isError && (
				<ErrorAuthPopup color="red">
					Ведіть вірні логін або пароль адміністратора!
				</ErrorAuthPopup>
			)}
		</>
	);
};

export default Page;
