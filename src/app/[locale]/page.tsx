import { Locale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

type Props = {
	params: Promise<{ locale: Locale }>;
};

export default async function IndexPage({ params }: Props) {
	const { locale } = await params;
	// Enable static rendering
	setRequestLocale(locale);
	console.log("LOCKALE", locale);

	return <>HEad</>;
}
