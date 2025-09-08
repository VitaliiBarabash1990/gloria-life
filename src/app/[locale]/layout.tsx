import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import { isLocale, Locale, routing } from "@/i18n/routing";

type Props = {
	children: ReactNode;
	params: { locale: string };
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">) {
	const { locale } = params;

	if (!isLocale(locale)) {
		notFound();
	}

	const t = await getTranslations({
		locale: locale as Locale,
		namespace: "LocaleLayout",
	});

	return {
		title: t("title"),
		description: t("description"),
		icons: {
			icon: "/icon.png",
		},
	};
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = params;
	// Ensure that the incoming `locale` is valid
	if (!isLocale(locale)) {
		notFound();
	}

	// Enable static rendering
	setRequestLocale(locale);

	return <BaseLayout locale={locale as Locale}>{children}</BaseLayout>;
}
