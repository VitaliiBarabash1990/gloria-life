"use client";
import React, { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import s from "./Header.module.css";
import WrapperForComponents from "../UI/WrapperForComponents/WrapperForComponents";
import BurgerButton from "./BurgerButton/BurgerButton";
import useWindowWidth from "@/lib/hooks/useWindowWidth";
import { NavigationMenu } from "./NavigationMenu/NavigationMenu";

const Header = () => {
	const [openMenu, setOpenMenu] = useState(true);

	// const path = usePathname().split("/");

	useEffect(() => {
		if (openMenu) {
			document.body.classList.add("no-scroll");
			document.documentElement.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
			document.documentElement.classList.remove("no-scroll");
		}
		return () => {
			document.body.classList.remove("no-scroll");
			document.documentElement.classList.remove("no-scroll");
		};
	}, [openMenu]);
	const width = useWindowWidth();

	// console.log("Path", path[1]);

	let paddingTop = 40;
	let paddingBottom = 40;

	if (width < 768) {
		paddingTop = 16;
		paddingBottom = 16;
	} else if (width < 1280) {
		paddingTop = 24;
		paddingBottom = 24;
	}

	return (
		<WrapperForComponents paddingTop={paddingTop} paddingBottom={paddingBottom}>
			<div className={s.headerWrapper}>
				<Link href="/" className={s.logoTitle}>
					GLORIA.LIFE
				</Link>
				<BurgerButton openMenu={openMenu} setOpenMenu={setOpenMenu} />
			</div>
			<div className={`${s.menuHead} ${openMenu ? s.open : ""}`}>
				<NavigationMenu setOpenMenu={setOpenMenu} />
			</div>
		</WrapperForComponents>
	);
};

export default Header;
