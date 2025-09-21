"use client";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ReduxProvider from "@/ReduxProvider/ReduxProvider";
import { useSelector } from "react-redux";
import { emptyAboutMe, emptyMain, LocaleKey } from "@/types/types";
import { selectMainLang } from "@/redux/main/selectors";
// import { mapBlocksToMessages } from "@/lib/utils/mapBlocksToMessages";
import { getMessages } from "@/lib/utils/getMessages";
import { selectAboutMeLang } from "@/redux/aboutMe/selectors";

type Props = {
	children: ReactNode;
	locale: LocaleKey;
};

function Content({ children, locale }: Props) {
	const mainLang = useSelector(selectMainLang);
	const aboutMeLangList = useSelector(selectAboutMeLang);
	const aboutMeLang = aboutMeLangList?.[0] || null;
	console.log("AboutMe", aboutMeLang);

	// const messages = mapBlocksToMessages({ main: mainLang }, locale);

	const messages = getMessages(locale, {
		main: mainLang || emptyMain,
		about: aboutMeLang || emptyAboutMe,
	});
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
