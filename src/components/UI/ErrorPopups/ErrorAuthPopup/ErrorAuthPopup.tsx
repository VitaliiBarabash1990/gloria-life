import React, { useEffect } from "react";
import s from "./ErrorAuthPopup.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { resetError, resetSuccess } from "@/redux/auth/authSlice";

type ChildrenProps = {
	children: string;
	color: string;
};

const ErrorAuthPopup = ({ children, color }: ChildrenProps) => {
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(resetError());
			dispatch(resetSuccess());
		}, 2000);

		return () => clearTimeout(timer);
	}, [dispatch]);

	return (
		<div className={s.wrapper}>
			<div className={`${s.content} ${color === "green" ? s.green : s.red}`}>
				{children}
			</div>
		</div>
	);
};

export default ErrorAuthPopup;
