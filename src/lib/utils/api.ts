import { CallBackFormProps } from "@/types/types";
import axios from "axios";
import toast from "react-hot-toast";

export const sendMail = async (body: CallBackFormProps) => {
	try {
		await axios.post(
			"https://kolibry-studio-back.onrender.com/send-email",
			body
		);
		toast.success("Сообщение отправлено!");
	} catch (error) {
		console.error("Ошибка отправки:", error);
		toast.error("Ошибка при отправке сообщения");
	}
};
