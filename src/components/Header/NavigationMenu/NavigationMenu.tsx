"use client";

import { useLocale, useTranslations } from "next-intl";
import s from "./NavigationMenu.module.css";
import { LocalizedScrollLink } from "../LocalizedScrollLink/LocalizedScrollLink";
import { SetStateAction, useEffect, useTransition } from "react";
import WrapperForComponents from "@/components/UI/WrapperForComponents/WrapperForComponents";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllContacts } from "@/redux/contacts/operations";
import { selectContacts } from "@/redux/contacts/selectors";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/routing"; // 🔹 без useParams

type MyComponentProps = {
	setOpenMenu: React.Dispatch<SetStateAction<boolean>>;
};

type LinkData = {
	id: number;
	link: string;
	text: string;
};

export const NavigationMenu = ({ setOpenMenu }: MyComponentProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	const t = useTranslations("Navigation");
	const locale = useLocale();

	useEffect(() => {
		dispatch(getAllContacts());
	}, [dispatch]);

	const contacts = useSelector(selectContacts);

	const linkDatas: LinkData[] = [
		{ id: 0, link: "AboutMe", text: t("about_me") },
		{ id: 1, link: "Blog", text: t("blog") },
		{ id: 2, link: "Barber", text: t("barber") },
		{ id: 3, link: "Psychology", text: t("psychology") },
		{ id: 4, link: "Gallery", text: t("gallery") },
		{ id: 5, link: "Contacts", text: t("contacts") },
	];

	const socIconList = [
		{ id: 0, link: contacts?.instagram, icon: "/sprite.svg#icon-instagram" },
		{ id: 1, link: contacts?.facebook, icon: "/sprite.svg#icon-facebook" },
		{ id: 2, link: contacts?.telegram, icon: "/sprite.svg#icon-telegram" },
	];

	const handlerSubmit = () => setOpenMenu(false);

	// 🔥 Перемикач локалі
	const handleLocaleChange = (nextLocale: string) => {
		if (nextLocale === locale) return;

		startTransition(() => {
			router.replace(pathname, { locale: nextLocale }); // 🔹 без params
		});
	};

	return (
		<WrapperForComponents>
			<div className={s.navMenuWrapper}>
				<ul className={s.navMenuList}>
					{linkDatas.map((linkData) => (
						<li key={linkData.id} className={s.navMenuItem}>
							<LocalizedScrollLink
								href="/"
								scrollId={linkData.link}
								className={s.navMenuLink}
								onClick={handlerSubmit}
							>
								{linkData.text}
							</LocalizedScrollLink>
							<div className={s.fadingLine}></div>
						</li>
					))}
				</ul>

				<div className={s.menuFooter}>
					{/* 🔽 Перемикач мов */}
					<ul className={s.menuLanguageList}>
						{routing.locales.map((item) => (
							<li
								key={item}
								className={`${s.menuLanguageItem} ${
									item === locale ? s.activeLang : ""
								}`}
								onClick={() => handleLocaleChange(item)}
							>
								{item.toUpperCase()}
							</li>
						))}
					</ul>

					<ul className={s.menuSocialList}>
						{socIconList.map((item) => (
							<li key={item.id} className={s.menuSocialItem}>
								<a href={item.link} target="_blank" rel="noopener noreferrer">
									<svg className={s.socIcon}>
										<use href={item.icon}></use>
									</svg>
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</WrapperForComponents>
	);
};

{
	/* <NavigationLink
				className={s.navMenu__link}
				href={linkData.link}
				onClick={handlerSubmit}
			>
				{linkData.text}
			</NavigationLink> */
}
