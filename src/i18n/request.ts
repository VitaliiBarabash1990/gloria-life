import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

type Locale = (typeof routing.locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = (await requestLocale) as string;

	if (!locale || !routing.locales.includes(locale as Locale)) {
		locale = routing.defaultLocale;
	}

	return {
		locale,
		messages: (
			await (locale === "pl"
				? import("../../messages/pl.json")
				: import(`../../messages/${locale}.json`))
		).default,
	};
});
