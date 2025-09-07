import * as Yup from "yup";

export const ValidationSchema = Yup.object().shape({
	titleUa: Yup.string().required(
		"Введіть заголовок на Українській. Це обовязково!"
	),
	titleEn: Yup.string().required(
		"Введіть заголовок на Англійській. Це обовязково!"
	),
	titlePl: Yup.string().required(
		"Введіть заголовок на Польській. Це обовязково!"
	),
	titleDe: Yup.string().required(
		"Введіть заголовок на Німецькій. Це обовязково!"
	),

	subTitleOneUa: Yup.string().required(
		"Введіть перший підзаголовок на Українській. Це обовязково!"
	),
	subTitleOneEn: Yup.string().required(
		"Введіть перший підзаголовок на Англійській. Це обовязково!"
	),
	subTitleOnePl: Yup.string().required(
		"Введіть перший підзаголовок на Польській. Це обовязково!"
	),
	subTitleOneDe: Yup.string().required(
		"Введіть перший підзаголовок на Німецькій. Це обовязково!"
	),

	subTitleTwoUa: Yup.string().required(
		"Введіть другий підзаголовок на Українській. Це обовязково!"
	),
	subTitleTwoEn: Yup.string().required(
		"Введіть другий підзаголовок на Англійській. Це обовязково!"
	),
	subTitleTwoPl: Yup.string().required(
		"Введіть другий підзаголовок на Польській. Це обовязково!"
	),
	subTitleTwoDe: Yup.string().required(
		"Введіть другий підзаголовок на Німецькій. Це обовязково!"
	),

	img: Yup.array()
		.of(Yup.mixed<File>().nullable())
		.compact() // прибере null
		.min(1, "Необхідно завантажити хоча б одне фото")
		.required("Завантажте хоча б одне фото"),
});
