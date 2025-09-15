"use client";
import React, { useState } from "react";
import { Link } from "@/i18n/routing";
import s from "./Header.module.css";
import WrapperForComponents from "../UI/WrapperForComponents/WrapperForComponents";
import BurgerButton from "./BurgerButton/BurgerButton";
import useWindowWidth from "@/lib/hooks/useWindowWidth";

const Header = () => {
	const [openBurger, setOpenBurger] = useState(true);
	// const path = usePathname().split("/");
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
				<BurgerButton openBurger={openBurger} setOpenBurger={setOpenBurger} />
			</div>
		</WrapperForComponents>
	);
};

export default Header;
