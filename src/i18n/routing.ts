import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["pl", "ua", "en", "de"] as const,
	defaultLocale: "de",
	pathnames: {
		"/": "/",
		"/admin": "/admin",
		"/admin_authorization": "/admin_authorization",
		"/psyhology": "psyhology",
		"/barber": "barber",
		"/blog": "blog",
	},
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export function isLocale(value: string): value is Locale {
	return (routing.locales as readonly string[]).includes(value);
}

export const { Link, getPathname, redirect, usePathname, useRouter } =
	createNavigation(routing);
