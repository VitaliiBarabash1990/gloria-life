import React from "react";
import { LeftSideProps } from "@/types/types";
import leftSide from "./LeftMenu.json";
import s from "./LeftSide.module.css";

const LeftSide = ({ setIdMenuItem, idMenuItem }: LeftSideProps) => {
	return (
		<ul className={s.leftMenuList}>
			{leftSide.map((item) => (
				<li
					key={item.id}
					className={`${s.leftMenuItem} ${idMenuItem === item.id && s.active}`}
					onClick={() => setIdMenuItem(item.id)}
				>
					{item.name}
				</li>
			))}
		</ul>
	);
};

export default LeftSide;
