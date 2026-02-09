"use client";
import React from "react";
import WrapperForComponents from "../UI/WrapperForComponents/WrapperForComponents";
import s from "./Footer.module.css";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logOut } from "@/redux/auth/operations";
import { selectIsLoggedIn } from "@/redux/auth/selectors";

const Footer = () => {
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const path = usePathname().split("/");
	const isLogin = useSelector(selectIsLoggedIn);
	// console.log("Path", path[1]);

	const hundlerRedirect = () => {
		dispatch(logOut());
		router.push("/");
	};

	return (
		<WrapperForComponents paddingBottom={40} paddingTop={40}>
			<ul className={s.footerWrapper}>
				{path[1] !== "admin" && (
					<li className={`${s.topFooter} ${s.footerText}`}>
						<Link href={isLogin ? "/admin" : "/admin_authorization"}>
							{isLogin ? "Вхід в адмін панель" : "Вхід для адміна"}
						</Link>
					</li>
				)}
				{path[1] === "admin" && (
					<button
						type="button"
						className={`${s.topFooter} ${s.footerText} ${s.btnExit}`}
						onClick={hundlerRedirect}
					>
						Вийти з режиму адміністратора
					</button>
				)}
				<li className={s.copyright}>
					<p className={s.footerText}>2025 · Gloria · Poland</p>
					<p className={s.footerText}>ALl rights reserved</p>
				</li>
			</ul>
		</WrapperForComponents>
	);
};

export default Footer;
