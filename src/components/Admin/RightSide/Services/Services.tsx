import React, { useEffect, useState } from "react";
import s from "./Services.module.css";
import lang from "./servicesLang.json";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Form, Formik } from "formik";
import { ServicesFormProps } from "@/types/types";
import ServicesField from "./ServicesField/ServicesField";
import {
	createServices,
	getAllServices,
	updateServices,
} from "@/redux/services/operations";
import {
	selectBarberServices,
	selectPsychologyServices,
} from "@/redux/services/selectors";
import VisualField from "./VisualField/VisualField";
import CleanValues from "@/components/UI/CleanValues/CleanValues";

type EditProps = {
	index: number;
	id: string | undefined;
};

const Services = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [isType, setIsType] = useState(0);
	const [selectLang, setSelectLang] = useState(0);
	const [edit, setIsEdit] = useState(false);
	const [itemHiden, setItemHiden] = useState<number | null>(null);
	const [idItem, setIdItem] = useState<string | undefined>("");

	useEffect(() => {
		dispatch(getAllServices());
	}, [dispatch]);

	const currentServices =
		isType === 0 ? selectBarberServices : selectPsychologyServices;

	const Services = useSelector(currentServices);
	const idxel = Services.findIndex((s) => s._id === idItem);

	const initialValues = {
		nameUa: edit ? Services[idxel]?.ua.name ?? "" : "",
		nameEn: edit ? Services[idxel]?.en.name ?? "" : "",
		namePl: edit ? Services[idxel]?.pl.name ?? "" : "",
		nameDe: edit ? Services[idxel]?.de.name ?? "" : "",
		descriptionUa: edit ? Services[idxel]?.ua.description ?? "" : "",
		descriptionEn: edit ? Services[idxel]?.en.description ?? "" : "",
		descriptionPl: edit ? Services[idxel]?.pl.description ?? "" : "",
		descriptionDe: edit ? Services[idxel]?.de.description ?? "" : "",
		howclasesUa: edit ? Services[idxel]?.ua.howclases ?? "" : "",
		howclasesEn: edit ? Services[idxel]?.en.howclases ?? "" : "",
		howclasesPl: edit ? Services[idxel]?.pl.howclases ?? "" : "",
		howclasesDe: edit ? Services[idxel]?.de.howclases ?? "" : "",
		forwhomUa: edit ? Services[idxel]?.ua.forwhom ?? "" : "",
		forwhomEn: edit ? Services[idxel]?.en.forwhom ?? "" : "",
		forwhomPl: edit ? Services[idxel]?.pl.forwhom ?? "" : "",
		forwhomDe: edit ? Services[idxel]?.de.forwhom ?? "" : "",
		price: edit ? Services[idxel]?.price : "",
		type: "",
		location: Services?.[0]?.location || "",
		link: Services?.[0]?.link || "",
	};

	const hundlerEdit = ({ index, id }: EditProps) => {
		console.log("ID", index);
		setIsEdit(true);
		setItemHiden(index);
		setIdItem(id);
		console.log("Index", index);
	};
	const hundlerDelete = () => {
		console.log("Delete");
	};

	const hundlerSumbit = (values: ServicesFormProps) => {
		const formData = {
			nameUa: values.nameUa,
			nameEn: values.nameEn,
			namePl: values.namePl,
			nameDe: values.nameDe,
			descriptionUa: values.descriptionUa,
			descriptionEn: values.descriptionEn,
			descriptionPl: values.descriptionPl,
			descriptionDe: values.descriptionDe,
			howclasesUa: values.howclasesUa,
			howclasesEn: values.howclasesEn,
			howclasesPl: values.howclasesPl,
			howclasesDe: values.howclasesDe,
			forwhomUa: values.forwhomUa,
			forwhomEn: values.forwhomEn,
			forwhomPl: values.forwhomPl,
			forwhomDe: values.forwhomDe,
			price: values.price,
			type: isType === 0 ? "barber" : "psychology",
			location: values.location,
			link: values.link,
		};
		const clearvalues = CleanValues(formData);
		console.log("clearvalues", clearvalues);
		console.log("formData", formData);
		if (edit && idItem) {
			dispatch(updateServices({ id: idItem, formData: clearvalues }));
		} else {
			dispatch(createServices(clearvalues));
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize
			onSubmit={hundlerSumbit}
		>
			{({ errors, values }) => (
				<Form className={s.form}>
					<div className={s.switcher}>
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
						<ul className={s.langList}>
							{lang.map((item) => {
								const hasError =
									(item.id === 0 && (errors.nameUa || errors.descriptionUa)) ||
									(item.id === 1 && (errors.nameEn || errors.descriptionEn)) ||
									(item.id === 2 && (errors.namePl || errors.descriptionPl)) ||
									(item.id === 3 && (errors.nameDe || errors.descriptionDe));
								return (
									<li
										key={item.id}
										onClick={() => setSelectLang(item.id)}
										className={`${s.langItem} ${
											selectLang === item.id ? s.active : ""
										} ${hasError ? s.errorLang : ""}`}
									>
										{item.lang}
									</li>
								);
							})}
						</ul>
					</div>

					<ul className={s.aboutServicesEditList}>
						{Services.map((item, index) => (
							<li key={index} className={s.aboutServicesEditItem}>
								{selectLang === 0 && (
									<>
										{index !== itemHiden ? (
											<>
												<VisualField
													field={item.ua.name}
													nameField="Назва послуги"
													type="input"
												/>
												<VisualField
													field={item.ua.description}
													nameField="Опис"
												/>
												{isType !== 1 && (
													<VisualField
														field={item.price}
														nameField="Вартість"
														type="input"
													/>
												)}
												{isType === 1 && (
													<>
														<VisualField
															field={item.ua.howclases}
															nameField="Як проходить заняття:"
														/>
														<VisualField
															field={item.ua.forwhom}
															nameField="Для кого підійде:"
														/>
													</>
												)}
											</>
										) : (
											<>
												<ServicesField title="Назва послуги" lang="Ua" />
												<ServicesField
													title="Опис"
													subTitleIndex="description"
													lang="Ua"
												/>
												{isType !== 1 && (
													<ServicesField
														title="Вартість"
														subTitleIndex="price"
														lang="Ua"
													/>
												)}
												{isType === 1 && (
													<>
														<ServicesField
															title="Як проходить заняття:"
															subTitleIndex="howclases"
															lang="Ua"
														/>
														<ServicesField
															title="Для кого підійде:"
															subTitleIndex="forwhom"
															lang="Ua"
														/>
													</>
												)}
											</>
										)}

										<div className={s.editItemBtnGroup}>
											{index !== itemHiden ? (
												<button
													type="button"
													className={`${s.editBtn} ${
														index === itemHiden ? s.green : s.grey
													}`}
													onClick={() => hundlerEdit({ index, id: item._id })}
												>
													Редагувати
												</button>
											) : (
												<button
													type="button"
													className={`${s.editBtn} ${
														index === itemHiden ? s.green : s.grey
													}`}
													onClick={() => hundlerSumbit(values)}
												>
													Зберегти
												</button>
											)}

											<button
												type="button"
												className={s.deleteBtn}
												onClick={hundlerDelete}
											>
												Видалити
											</button>
										</div>
									</>
								)}

								{selectLang === 1 && (
									<>
										{index !== itemHiden ? (
											<>
												<VisualField
													field={item.en.name}
													nameField="Name of the service"
													type="input"
												/>
												<VisualField
													field={item.en.description}
													nameField="Description"
												/>
												{isType !== 1 && (
													<VisualField
														field={item.price}
														nameField="Вартість"
														type="input"
													/>
												)}
												{isType === 1 && (
													<>
														<VisualField
															field={item.en.howclases}
															nameField="How the class goes:"
														/>
														<VisualField
															field={item.en.forwhom}
															nameField="For whom it is suitable:"
														/>
													</>
												)}
											</>
										) : (
											<>
												<ServicesField title="Name of the service" lang="En" />
												<ServicesField
													title="Description"
													subTitleIndex="description"
													lang="En"
												/>
												{isType !== 1 && (
													<ServicesField
														title="Purchase"
														subTitleIndex="price"
														lang="En"
													/>
												)}
												{isType === 1 && (
													<>
														<ServicesField
															title="How the class goes:"
															subTitleIndex="howclases"
															lang="En"
														/>
														<ServicesField
															title="For whom it is suitable:"
															subTitleIndex="forwhom"
															lang="En"
														/>
													</>
												)}
											</>
										)}

										<div className={s.editItemBtnGroup}>
											{index !== itemHiden ? (
												<button
													type="button"
													className={`${s.editBtn} ${
														index === itemHiden ? s.green : s.grey
													}`}
													onClick={() => hundlerEdit({ index, id: item._id })}
												>
													Редагувати
												</button>
											) : (
												<button
													type="button"
													className={`${s.editBtn} ${
														index === itemHiden ? s.green : s.grey
													}`}
													onClick={() => hundlerSumbit(values)}
												>
													Зберегти
												</button>
											)}

											<button
												type="button"
												className={s.deleteBtn}
												onClick={hundlerDelete}
											>
												Видалити
											</button>
										</div>
									</>
								)}

								{selectLang === 2 && (
									<>
										{index !== itemHiden ? (
											<>
												<VisualField
													field={item.pl.name}
													nameField="Nazwa usługi"
													type="input"
												/>
												<VisualField
													field={item.pl.description}
													nameField="Opis"
												/>
												{isType !== 1 && (
													<VisualField
														field={item.price}
														nameField="Вартість"
														type="input"
													/>
												)}
												{isType === 1 && (
													<>
														<VisualField
															field={item.pl.howclases}
															nameField="Jak przebiegają zajęcia:"
														/>
														<VisualField
															field={item.pl.forwhom}
															nameField="Dla kogo jest odpowiedni:"
														/>
													</>
												)}
											</>
										) : (
											<>
												<ServicesField title="Nazwa usługi" lang="Pl" />
												<ServicesField
													title="Opis"
													subTitleIndex="description"
													lang="Pl"
												/>
												{isType !== 1 && (
													<ServicesField
														title="Koszt"
														subTitleIndex="price"
														lang="Pl"
													/>
												)}
												{isType === 1 && (
													<>
														<ServicesField
															title="Jak przebiegają zajęcia:"
															subTitleIndex="howclases"
															lang="Pl"
														/>
														<ServicesField
															title="Dla kogo jest odpowiedni:"
															subTitleIndex="forwhom"
															lang="Pl"
														/>
													</>
												)}
											</>
										)}

										<div className={s.editItemBtnGroup}>
											{index !== itemHiden ? (
												<button
													type="button"
													className={`${s.editBtn} ${
														index === itemHiden ? s.green : s.grey
													}`}
													onClick={() => hundlerEdit({ index, id: item._id })}
												>
													Редагувати
												</button>
											) : (
												<button
													type="button"
													className={`${s.editBtn} ${
														index === itemHiden ? s.green : s.grey
													}`}
													onClick={() => hundlerSumbit(values)}
												>
													Зберегти
												</button>
											)}

											<button
												type="button"
												className={s.deleteBtn}
												onClick={hundlerDelete}
											>
												Видалити
											</button>
										</div>
									</>
								)}

								{selectLang === 3 && (
									<>
										{index !== itemHiden ? (
											<>
												<VisualField
													field={item.de.name}
													nameField="Name des Dienstes"
													type="input"
												/>
												<VisualField
													field={item.de.description}
													nameField="Beschreibung"
												/>
												{isType !== 1 && (
													<VisualField
														field={item.price}
														nameField="Вартість"
														type="input"
													/>
												)}
												{isType === 1 && (
													<>
														<VisualField
															field={item.de.howclases}
															nameField="So läuft der Unterricht ab:"
														/>
														<VisualField
															field={item.de.forwhom}
															nameField="Für wen es geeignet ist:"
														/>
													</>
												)}
											</>
										) : (
											<>
												<ServicesField title="Name des Dienstes" lang="De" />
												<ServicesField
													title="Beschreibung"
													subTitleIndex="description"
													lang="De"
												/>
												{isType !== 1 && (
													<ServicesField
														title="Kosten"
														subTitleIndex="price"
														lang="De"
													/>
												)}
												{isType === 1 && (
													<>
														<ServicesField
															title="So führen Sie Kurse durch:"
															subTitleIndex="howclases"
															lang="De"
														/>
														<ServicesField
															title="Für wen ist es geeignet:"
															subTitleIndex="forwhom"
															lang="De"
														/>
													</>
												)}
											</>
										)}

										<div className={s.editItemBtnGroup}>
											{index !== itemHiden ? (
												<button
													type="button"
													className={`${s.editBtn} ${
														index === itemHiden ? s.green : s.grey
													}`}
													onClick={() => hundlerEdit({ index, id: item._id })}
												>
													Редагувати
												</button>
											) : (
												<button
													type="button"
													className={`${s.editBtn} ${
														index === itemHiden ? s.green : s.grey
													}`}
													onClick={() => hundlerSumbit(values)}
												>
													Зберегти
												</button>
											)}

											<button
												type="button"
												className={s.deleteBtn}
												onClick={hundlerDelete}
											>
												Видалити
											</button>
										</div>
									</>
								)}
							</li>
						))}
					</ul>

					<ul className={s.aboutContentAddList}>
						{selectLang === 0 && (
							<>
								{itemHiden === null ? (
									<>
										<ServicesField title="Назва послуги" lang="Ua" />
										<ServicesField
											title="Опис"
											subTitleIndex="description"
											lang="Ua"
										/>
										{isType !== 0 && (
											<>
												<ServicesField
													title="Як проходить заняття:"
													subTitleIndex="howclases"
													lang="Ua"
												/>
												<ServicesField
													title="Для кого підійде:"
													subTitleIndex="forwhom"
													lang="Ua"
												/>
											</>
										)}
									</>
								) : (
									<>
										<VisualField
											field="*Назва*"
											nameField="Назва послуги"
											type="input"
										/>
										<VisualField field="*Опис*" nameField="Опис" />
										{isType !== 0 && (
											<>
												<VisualField
													field="Як проходить заняття:"
													nameField="Як проходить заняття:"
												/>
												<VisualField
													field="Для кого підійде:"
													nameField="Для кого підійде:"
												/>
											</>
										)}
									</>
								)}
							</>
						)}
						{selectLang === 1 && (
							<>
								{itemHiden === null ? (
									<>
										<ServicesField title="Name of the service" lang="En" />
										<ServicesField
											title="Description"
											subTitleIndex="description"
											lang="En"
										/>
										{isType !== 0 && (
											<>
												<ServicesField
													title="How the class goes:"
													subTitleIndex="howclases"
													lang="En"
												/>
												<ServicesField
													title="For whom it is suitable:"
													subTitleIndex="forwhom"
													lang="En"
												/>
											</>
										)}
									</>
								) : (
									<>
										<VisualField
											field="*Назва*"
											nameField="Назва послуги"
											type="input"
										/>
										<VisualField field="*Опис*" nameField="Опис" />
										{isType !== 0 && (
											<>
												<VisualField
													field="How the class goes:"
													nameField="How the class goes:"
												/>
												<VisualField
													field="For whom it is suitable:"
													nameField="For whom it is suitable:"
												/>
											</>
										)}
									</>
								)}
							</>
						)}
						{selectLang === 2 && (
							<>
								{itemHiden === null ? (
									<>
										<ServicesField title="Nazwa usługi" lang="Pl" />
										<ServicesField
											title="Opis"
											subTitleIndex="description"
											lang="Pl"
										/>
										{isType !== 0 && (
											<>
												<ServicesField
													title="Jak przebiegają zajęcia:"
													subTitleIndex="howclases"
													lang="Pl"
												/>
												<ServicesField
													title="Dla kogo jest odpowiedni:"
													subTitleIndex="forwhom"
													lang="Pl"
												/>
											</>
										)}
									</>
								) : (
									<>
										<VisualField
											field="*Nazwa*"
											nameField="Nazwa usługi"
											type="input"
										/>
										<VisualField field="*Opis*" nameField="Опис" />
										{isType !== 0 && (
											<>
												<VisualField
													field="Jak przebiegają zajęcia:"
													nameField="Jak przebiegają zajęcia:"
												/>
												<VisualField
													field="Dla kogo jest odpowiedni:"
													nameField="Dla kogo jest odpowiedni:"
												/>
											</>
										)}
									</>
								)}
							</>
						)}
						{selectLang === 3 && (
							<>
								{itemHiden === null ? (
									<>
										<ServicesField title="Name des Dienstes" lang="De" />
										<ServicesField
											title="Beschreibung"
											subTitleIndex="description"
											lang="De"
										/>
										{isType !== 0 && (
											<>
												<ServicesField
													title="Wie die Kurse durchgeführt werden:"
													subTitleIndex="howclases"
													lang="De"
												/>
												<ServicesField
													title="Für wen ist es geeignet:"
													subTitleIndex="forwhom"
													lang="De"
												/>
											</>
										)}
									</>
								) : (
									<>
										<VisualField
											field="*Назва*"
											nameField="Назва послуги"
											type="input"
										/>
										<VisualField field="*Опис*" nameField="Опис" />
										{isType !== 0 && (
											<>
												<VisualField
													field="Wie die Kurse durchgeführt werden:"
													nameField="Wie die Kurse durchgeführt werden:"
												/>
												<VisualField
													field="Für wen ist es geeignet:"
													nameField="Für wen ist es geeignet:"
												/>
											</>
										)}
									</>
								)}
							</>
						)}
						{isType === 0 &&
							(itemHiden === null ? (
								<ServicesField
									title="Вартість"
									subTitleIndex="price"
									lang="Ua"
								/>
							) : (
								<VisualField
									field="*Вартість*"
									nameField="Вартість"
									type="input"
								/>
							))}

						<button className={s.aboutAddServices}>Додати послугу</button>
						{isType === 0 && (
							<>
								<ServicesField
									title="Локація"
									subTitleIndex="location"
									lang="Ua"
								/>
								<ServicesField
									title="Посилання для запису"
									subTitleIndex="link"
									lang="Ua"
								/>
							</>
						)}
					</ul>
				</Form>
			)}
		</Formik>
	);
};

export default Services;
