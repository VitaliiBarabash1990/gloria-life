import uaMessages from "../../../messages/ua.json";
import enMessages from "../../../messages/en.json";
import plMessages from "../../../messages/pl.json";
import deMessages from "../../../messages/de.json";
import { deepmerge } from "deepmerge-ts"; // або lodash.merge
import { mapBlocksToMessages } from "./mapBlocksToMessages";
import { BlocksLang, LocaleKey, Messages } from "@/types/types";

const fileMessages: Record<LocaleKey, Messages> = {
	ua: uaMessages,
	en: enMessages,
	pl: plMessages,
	de: deMessages,
};

export function getMessages(locale: LocaleKey, blocks: BlocksLang) {
	const messagesFromFiles = fileMessages[locale] || {};
	const messagesFromDb = mapBlocksToMessages(blocks, locale);

	// зливаємо: БД переклади мають пріоритет над файлом
	return deepmerge(messagesFromFiles, messagesFromDb);
}
