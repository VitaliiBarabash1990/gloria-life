"use client";
import RightSide from "@/components/Admin/RightSide/RightSide";
import LeftSide from "@/components/Admin/LeftSide/LeftSide";
import { useRouter } from "@/i18n/routing";
import React, { useEffect, useState } from "react";
import s from "./page.module.css";
import WrapperForComponents from "@/components/UI/WrapperForComponents/WrapperForComponents";
import { useSelector } from "react-redux";
import {
	selectIsLoggedIn,
	selectIsSuccess,
	selectUserRole,
} from "@/redux/auth/selectors";
import ErrorAuthPopup from "@/components/UI/ErrorPopups/ErrorAuthPopup/ErrorAuthPopup";

const Page = () => {
	const router = useRouter();
	const [idMenuItem, setIdMenuItem] = useState(0);
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const isSuccess = useSelector(selectIsSuccess);
	console.log("isSuccess", isSuccess);
	const user = useSelector(selectUserRole);

	useEffect(() => {
		if (!isLoggedIn && user === "admin") {
			router.push("/admin_authorization");
		}
	}, [isLoggedIn, router, user]);

	if (!isLoggedIn) {
		return null;
	}

	return (
		<>
			<WrapperForComponents paddingTop={32} paddingBottom={32}>
				<div className={s.pageAdmin}>
					<LeftSide setIdMenuItem={setIdMenuItem} idMenuItem={idMenuItem} />
					<RightSide idMenuItem={idMenuItem} />
				</div>
			</WrapperForComponents>
			{isSuccess && (
				<ErrorAuthPopup color="green">
					Ви успішно зайшли в адмін панель!
				</ErrorAuthPopup>
			)}
		</>
	);
};

export default Page;
