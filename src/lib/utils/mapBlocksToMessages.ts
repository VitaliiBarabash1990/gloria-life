import { BlocksLang, LocaleKey } from "@/types/types";

type Messages = {
	[block in keyof BlocksLang]?: {
		[key: string]: string | string[];
	};
};

export function mapBlocksToMessages(blocks: BlocksLang, locale: LocaleKey) {
	const messages: Messages = {};

	if (blocks.main) {
		messages.main = {
			title: blocks.main[locale]?.title || "",
			subTitleOne: blocks.main[locale]?.subTitleOne || "",
			subTitleTwo: blocks.main[locale]?.subTitleTwo || "",
		};
	}

	// if (blocks.about) {
	//   messages.about = { ... };
	// }

	return messages;
}
