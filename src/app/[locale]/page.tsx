import AboutMe from "@/components/MainPage/AboutMe/AboutMe";
import Blog from "@/components/MainPage/Blog/Blog";
import Contacts from "@/components/MainPage/Contacts/Contacts";
import Gallery from "@/components/MainPage/Gallery/Gallery";
import Hero from "@/components/MainPage/Hero/Hero";
import Services from "@/components/MainPage/Services/Services";
import TestAboutMe from "@/components/MainPage/TestAboutMe/TestAboutMe";
import TestBlog from "@/components/MainPage/TestBlog/TestBlog";
import { Locale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

type Props = {
	params: Promise<{ locale: Locale }>;
};

export default async function IndexPage({ params }: Props) {
	const { locale } = await params;
	// Enable static rendering
	setRequestLocale(locale);
	// console.log("LOCKALE", locale);

	return (
		<>
			<Hero />
			{/* <AboutMe /> */}
			<TestAboutMe />
			<Services />
			{/* <Blog /> */}
			<TestBlog />
			<Gallery />
			<Contacts />
		</>
	);
}
