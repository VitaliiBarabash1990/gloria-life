"use client";
import React from "react";
import { Link } from "@/i18n/routing";

interface Props extends React.ComponentProps<typeof Link> {
	scrollId?: string;
}

export const LocalizedScrollLink = ({
	scrollId,
	href,
	onClick,
	...props
}: Props) => {
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (scrollId) {
			e.preventDefault();
			const el = document.getElementById(scrollId);
			if (el) el.scrollIntoView({ behavior: "smooth" });
		}
		onClick?.(e);
	};

	return <Link href={href} onClick={handleClick} {...props} />;
};
