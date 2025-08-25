import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
// шлях до твого request.ts (змінюй відповідно до структури)

const nextConfig: NextConfig = {
	/* інші налаштування */
};

export default withNextIntl(nextConfig);
