import React, { Dispatch, SetStateAction } from "react";
import s from "./BurgerButton.module.css";
import clsx from "clsx";

type BurgerProps = {
	setOpenBurger: Dispatch<SetStateAction<boolean>>;
	openBurger: boolean;
};

const BurgerButton = ({ setOpenBurger, openBurger }: BurgerProps) => {
	const hundlerBurgerMenu = () => {
		setOpenBurger((prev) => !prev);
	};
	return (
		<div className={s.burgerMenu} onClick={hundlerBurgerMenu}>
			<svg
				className={clsx(s.burgerIcon, openBurger ? s.iconOpen : s.iconClose)}
			>
				<use
					href={
						openBurger
							? "/sprite.svg#icon-burger-menu"
							: "/sprite.svg#icon-burger-menu-close"
					}
				></use>
			</svg>
		</div>
	);
};

export default BurgerButton;
