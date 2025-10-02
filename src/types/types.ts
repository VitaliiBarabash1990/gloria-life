import { Locale } from "@/i18n/routing";
import { Dispatch, SetStateAction } from "react";

export type Project = {
	id: number;
	name: string;
};

export interface HeaderProps {
	locale: Locale;
}

export interface AuthorizationProps {
	email: string;
	password: string;
}

export interface AuthResponse {
	name: string;
	email: string;
	role?: string;
	accessToken: string;
}
// Для редакса sendOrderEmail
export interface OrderItem {
	id: string;
	article: string;
	img: string[];
	brand: string;
	country: string;
	description: string;
	description_title: string;
	price: number;
	qty: number;
	text: string;
	wage: number;
}

export interface SendOrderPayload {
	email?: string;
	name?: string;
	phone?: string;
	city?: string;
	method?: string;
	street?: string;
	house?: string;
	department?: string;
	post?: string;
	address?: string;
	payment?: string;
	comment?: string;
	call?: string;
	items?: OrderItem[];
}
export interface AuthState {
	user: {
		name: string | null;
		email: string | null;
	};
	role?: string | null;
	token: string | null;
	isLoggedIn: boolean;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
}
// Для редакса sendOrderEmail

export interface LeftSideProps {
	setIdMenuItem: Dispatch<SetStateAction<number>>;
	idMenuItem: number;
}

export interface RightSideProps {
	idMenuItem: number;
}

//forMain
export interface MainMenuFormProps {
	titleUa: string;
	titleEn: string;
	titlePl: string;
	titleDe: string;
	subTitleOneUa: string;
	subTitleOneEn: string;
	subTitleOnePl: string;
	subTitleOneDe: string;
	subTitleTwoUa: string;
	subTitleTwoPl: string;
	subTitleTwoEn: string;
	subTitleTwoDe: string;
	img: (File | null)[];
	existingImg?: string[];
}

//forAboutMe
export interface AboutMeFormProps {
	titleUa: string;
	titleEn: string;
	titlePl: string;
	titleDe: string;
	subTitleUa: string;
	subTitleEn: string;
	subTitlePl: string;
	subTitleDe: string;
	img: File | null;
	existingImg?: string | null;
}

//forArticle
export interface ArticleFormProps {
	titleUa: string;
	titleEn: string;
	titlePl: string;
	titleDe: string;
	subTitleUa: string;
	subTitleEn: string;
	subTitlePl: string;
	subTitleDe: string;
	type: string;
	img: File | null;
	existingImg?: string | null;
}

//forServices
export interface ServicesFormProps {
	nameUa: string;
	nameEn: string;
	namePl: string;
	nameDe: string;
	descriptionUa: string;
	descriptionEn: string;
	descriptionPl: string;
	descriptionDe: string;
	howclasesUa?: string;
	howclasesEn?: string;
	howclasesPl?: string;
	howclasesDe?: string;
	forwhomUa?: string;
	forwhomEn?: string;
	forwhomPl?: string;
	forwhomDe?: string;
	price?: string;
	type: string;
	location?: string;
	link?: string;
}

//forContacts
export interface ContactsMenuFormProps {
	number: string;
	telegram: string;
	instagram: string;
	facebook: string;
	_id?: string;
}

export interface MainPayload {
	ua: { title: string; subTitleOne?: string; subTitleTwo?: string };
	en: { title: string; subTitleOne?: string; subTitleTwo?: string };
	pl: { title: string; subTitleOne?: string; subTitleTwo?: string };
	de: { title: string; subTitleOne?: string; subTitleTwo?: string };
	img: string[];
	_id?: undefined | string;
}

export interface AboutMePayload {
	ua: { title: string; subTitle?: string };
	en: { title: string; subTitle?: string };
	pl: { title: string; subTitle?: string };
	de: { title: string; subTitle?: string };
	img: string;
	_id?: undefined | string;
}

export interface BlogPayload {
	ua: { title: string; subTitle?: string };
	en: { title: string; subTitle?: string };
	pl: { title: string; subTitle?: string };
	de: { title: string; subTitle?: string };
	type: string;
	img: string;
	_id?: undefined | string;
}

export interface ServicesPayload {
	ua: {
		name: string;
		description?: string;
		howclases?: string;
		forwhom?: string;
	};
	en: {
		name: string;
		description?: string;
		howclases?: string;
		forwhom?: string;
	};
	pl: {
		name: string;
		description?: string;
		howclases?: string;
		forwhom?: string;
	};
	de: {
		name: string;
		description?: string;
		howclases?: string;
		forwhom?: string;
	};
	price: string;
	type: string;
	location: string;
	link: string;
	_id?: undefined | string;
}

export interface MainLangPayload {
	ua: { title: string; subTitleOne?: string; subTitleTwo?: string };
	en: { title: string; subTitleOne?: string; subTitleTwo?: string };
	pl: { title: string; subTitleOne?: string; subTitleTwo?: string };
	de: { title: string; subTitleOne?: string; subTitleTwo?: string };
}
export interface AboutMeLangPayload {
	ua: { title: string; subTitle?: string };
	en: { title: string; subTitle?: string };
	pl: { title: string; subTitle?: string };
	de: { title: string; subTitle?: string };
}
export interface BlogLangPayload {
	ua: { title: string; subTitle?: string };
	en: { title: string; subTitle?: string };
	pl: { title: string; subTitle?: string };
	de: { title: string; subTitle?: string };
}
export interface ServicesLangPayload {
	ua: {
		name: string;
		description?: string;
		howclases?: string;
		forwhom?: string;
	};
	en: {
		name: string;
		description?: string;
		howclases?: string;
		forwhom?: string;
	};
	pl: {
		name: string;
		description?: string;
		howclases?: string;
		forwhom?: string;
	};
	de: {
		name: string;
		description?: string;
		howclases?: string;
		forwhom?: string;
	};
}
export const emptyMain: MainLang = {
	ua: { title: "", subTitleOne: "", subTitleTwo: "" },
	en: { title: "", subTitleOne: "", subTitleTwo: "" },
	pl: { title: "", subTitleOne: "", subTitleTwo: "" },
	de: { title: "", subTitleOne: "", subTitleTwo: "" },
};
export const emptyAboutMe: AboutMeLang = {
	ua: { title: "", subTitle: "" },
	en: { title: "", subTitle: "" },
	pl: { title: "", subTitle: "" },
	de: { title: "", subTitle: "" },
};

//state Main
export interface MainState {
	main: MainPayload | null;
	mainLang: MainLangPayload | null;
	isLoading: boolean;
	isError: boolean;
}

//state AboutMe
export interface AboutMeState {
	aboutMeList: AboutMePayload[];
	aboutMeLangList: AboutMeLangPayload[];
	isLoading: boolean;
	isError: boolean;
}

//state Services
export interface ServicesState {
	servicesList: ServicesPayload[];
	servicesLangList: ServicesLangPayload[];
	isLoading: boolean;
	isError: boolean;
}

//state Blog
export interface BlogState {
	blogList: BlogPayload[];
	blogLangList: BlogLangPayload[];
	isLoading: boolean;
	isError: boolean;
}

//state Contact
export interface ContactsState {
	contacts: ContactsMenuFormProps | null;
	isLoading: boolean;
	isError: boolean;
}

export interface LocaleContent {
	title: string;
	subTitleOne?: string;
	subTitleTwo?: string;
}
export interface LocaleContentAbout {
	title: string;
	subTitle?: string;
}

export interface MainLang {
	ua: LocaleContent;
	en: LocaleContent;
	pl: LocaleContent;
	de: LocaleContent;
}
export interface AboutMeLang {
	ua: LocaleContentAbout;
	en: LocaleContentAbout;
	pl: LocaleContentAbout;
	de: LocaleContentAbout;
}
export type BlocksLang = {
	main?: MainLang | null;
	about?: AboutMeLang | null;
	// інші блоки...
};

export type LocaleKey = "ua" | "en" | "pl" | "de";

export type BlockKey = "main";

export type Messages = {
	[key: string]: string | Messages | string[];
};

export type CallBackFormProps = {
	name: string;
	phone: string;
};
