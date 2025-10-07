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

export const ValidationSchemaAboutMe = Yup.object().shape({
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

	subTitleUa: Yup.string().required(
		"Введіть текст на Українській. Це обовязково!"
	),
	subTitleEn: Yup.string().required(
		"Введіть текст на Англійській. Це обовязково!"
	),
	subTitlePl: Yup.string().required(
		"Введіть текст на Польській. Це обовязково!"
	),
	subTitleDe: Yup.string().required(
		"Введіть текст на Німецькій. Це обовязково!"
	),

	img: Yup.mixed()
		.nullable()
		.test("img-required", "Необхідно завантажити картинку", function (value) {
			const { existingImg } = this.parent;

			// ✅ якщо є завантажене зображення з сервера — валідація проходить
			if (existingImg) return true;

			// ✅ якщо користувач вибрав файл
			if (value instanceof File) return true;

			return false;
		})
		.test(
			"fileType",
			"Файл повинен бути зображенням (jpg, png, jpeg, webp)",
			(value) => {
				if (!value || !(value instanceof File)) return true; // пропускаємо, якщо не новий файл
				return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
			}
		),
});

export const ValidationSchemaBlogs = Yup.object().shape({
	titleUa: Yup.string().required(
		"Введіть заголовок на Українській. Це обов’язково!"
	),
	titleEn: Yup.string().required(
		"Введіть заголовок на Англійській. Це обов’язково!"
	),
	titlePl: Yup.string().required(
		"Введіть заголовок на Польській. Це обов’язково!"
	),
	titleDe: Yup.string().required(
		"Введіть заголовок на Німецькій. Це обов’язково!"
	),

	subTitleUa: Yup.string().required(
		"Введіть текст на Українській. Це обов’язково!"
	),
	subTitleEn: Yup.string().required(
		"Введіть текст на Англійській. Це обов’язково!"
	),
	subTitlePl: Yup.string().required(
		"Введіть текст на Польській. Це обов’язково!"
	),
	subTitleDe: Yup.string().required(
		"Введіть текст на Німецькій. Це обов’язково!"
	),

	articleUa: Yup.string().required(
		"Введіть текст на Українській. Це обов’язково!"
	),
	articleEn: Yup.string().required(
		"Введіть текст на Англійській. Це обов’язково!"
	),
	articlePl: Yup.string().required(
		"Введіть текст на Польській. Це обов’язково!"
	),
	articleDe: Yup.string().required(
		"Введіть текст на Німецькій. Це обов’язково!"
	),

	imgs: Yup.array()
		.of(Yup.mixed().nullable())
		.test(
			"four-images-required",
			"Необхідно завантажити всі чотири фото",
			function (value) {
				const existingImgs = this.parent?.existingImgs || [];

				// Підрахунок усіх фото (нові файли + існуючі)
				const total = [
					...(Array.isArray(existingImgs) ? existingImgs.filter((v) => v) : []),
					...(Array.isArray(value)
						? value.filter((v) => v instanceof File || v instanceof Blob)
						: []),
				];

				return total.length >= 4;
			}
		)
		.test(
			"file-type-check",
			"Файл повинен бути зображенням (jpg, png, jpeg, webp)",
			(value) => {
				if (!Array.isArray(value)) return true;
				return value.every((file) => {
					if (!file) return true;
					if (!(file instanceof File)) return true;
					return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
				});
			}
		),
});
