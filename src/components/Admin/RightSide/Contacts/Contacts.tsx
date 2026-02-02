"use client";
import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import s from "./Contacts.module.css";
import { ContactsMenuFormProps } from "@/types/types";
import ContactField from "./ContactField/ContactField";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllContacts, updateContacts } from "@/redux/contacts/operations";
import { selectContacts } from "@/redux/contacts/selectors";

const Contacts = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [successMessage, setSuccessMessage] = useState(""); // <-- повідомлення про успіх
	useEffect(() => {
		dispatch(getAllContacts());
	}, [dispatch]);

	const uploadContacts = useSelector(selectContacts);
	// console.log("UploadContacts", uploadContacts?._id);

	const initialValues: ContactsMenuFormProps = {
		number: uploadContacts?.number ? uploadContacts?.number : "",
		telegram: uploadContacts?.telegram ? uploadContacts?.telegram : "",
		instagram: uploadContacts?.instagram ? uploadContacts?.instagram : "",
		facebook: uploadContacts?.facebook ? uploadContacts?.facebook : "",
	};

	const handleSubmit = (values: ContactsMenuFormProps) => {
		const formData = {
			number: values.number,
			telegram: values.telegram,
			instagram: values.instagram,
			facebook: values.facebook,
		};

		// console.log("formData", formData);
		// console.log("UploadContacts", uploadContacts?._id);
		dispatch(updateContacts({ id: uploadContacts?._id, formData })).then(() => {
			setSuccessMessage("Данні успішно збережено!");
			setTimeout(() => setSuccessMessage(""), 3000);
		});
	};

	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize
			onSubmit={handleSubmit}
		>
			<Form className={s.form}>
				<ul className={s.fieldList}>
					<ContactField title="Номер телефону" fieldName="number" />
					<ContactField title="Телеграм" fieldName="telegram" />
					<ContactField title="Інстаграм" fieldName="instagram" />
					<ContactField title="Фейсбук" fieldName="facebook" />
				</ul>
				{successMessage && <p className={s.successMessage}>{successMessage}</p>}
				<button type="submit" className={s.addSocial}>
					Зберегти
				</button>
			</Form>
		</Formik>
	);
};

export default Contacts;
