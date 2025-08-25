// import {useTranslations} from 'next-intl';
import { ReactNode } from "react";

type Props = {
	children?: ReactNode;
	title: ReactNode;
};

// export default function PageLayout({children}: Props) {
//   const t = useTranslations('PageLayout');

//   return <>{children}</>;
// }

export default function PageLayout({ children, title }: Props) {
	return (
		<>
			<header>
				<h1>{title}</h1>
			</header>
			{children}
		</>
	);
}
