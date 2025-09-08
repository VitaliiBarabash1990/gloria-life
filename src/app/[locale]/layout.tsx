import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import { isLocale, routing } from "@/i18n/routing";

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">) {
	const resolvedParams = (await params) as { locale: string };
	const { locale } = resolvedParams;

	if (!isLocale(locale)) {
		notFound();
	}

	const t = await getTranslations({
		locale: locale,
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
	const resolvedParams = (await params) as { locale: string };
	const { locale } = resolvedParams;
	// Ensure that the incoming `locale` is valid
	if (!isLocale(locale)) {
		notFound();
	}

	// Enable static rendering
	setRequestLocale(locale);

	return (
		<BaseLayout locale={locale as (typeof routing.locales)[number]}>
			{children}
		</BaseLayout>
	);
}
