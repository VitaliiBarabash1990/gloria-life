"use client";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ReduxProvider from "@/ReduxProvider/ReduxProvider";
import { useSelector } from "react-redux";
import { LocaleKey } from "@/types/types";
import { selectMainLang } from "@/redux/main/selectors";
// import { mapBlocksToMessages } from "@/lib/utils/mapBlocksToMessages";
import { getMessages } from "@/lib/utils/getMessages";

type Props = {
	children: ReactNode;
	locale: LocaleKey;
};

function Content({ children, locale }: Props) {
	const mainLang = useSelector(selectMainLang);
	// const aboutLang = useSelector(selectAboutLang);

	// const messages = mapBlocksToMessages({ main: mainLang }, locale);
	const messages = getMessages(locale, { main: mainLang });
	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<Header />
			<main>{children}</main>
			<Footer />
		</NextIntlClientProvider>
	);
}

export default function BaseLayout({ children, locale }: Props) {
	return (
		<html lang={locale}>
			<body>
				<ReduxProvider>
					<Content locale={locale}>{children}</Content>
				</ReduxProvider>
			</body>
		</html>
	);
}
