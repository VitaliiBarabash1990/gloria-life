// /lib/utils/validationSchema.ts
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
		.of(Yup.mixed().nullable())
		.test(
			"four-images-required",
			"Необхідно завантажити всі чотири фото",
			function (value) {
				const existingImg = this.parent?.existingImg || [];

				// Перевірка наявності 4 фото (або нові файли, або існуючі урли)
				const total = [
					...(Array.isArray(existingImg) ? existingImg : []),
					...(Array.isArray(value)
						? value.filter((v) => v instanceof File || v instanceof Blob)
						: []),
				];

				return total.length >= 4;
			}
		),
});
