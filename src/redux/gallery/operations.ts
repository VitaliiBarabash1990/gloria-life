import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { gloriaAPI } from "../auth/operations";

// ➕ Додати зображення (одне або кілька)
export const uploadGalleryImages = createAsyncThunk(
	"gallery/uploadImages",
	async ({ type, files }: { type: string; files: File[] }, thunkAPI) => {
		try {
			const formData = new FormData();
			files.forEach((file) => formData.append("imgs", file)); // 👈 бекенд очікує imgs[]

			const res = await gloriaAPI.patch(`/gallery/${type}`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			// console.log("RESPONSE", res.data.data);

			toast.success("Фото успішно додано ✅");
			return res.data.data;
		} catch (err) {
			const message = (err as Error)?.message || "Щось пішло не так";
			toast.error("Помилка при завантаженні фото ❌");
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// ❌ Видалити одне зображення
export const deleteGalleryImage = createAsyncThunk(
	"gallery/deleteImage",
	async ({ type, imageUrl }: { type: string; imageUrl: string }, thunkAPI) => {
		try {
			await gloriaAPI.delete(`/gallery/${type}/image`, {
				data: { url: imageUrl },
			});
			toast.success("Фото видалено ✅");
			return { type, imageUrl };
		} catch (err) {
			const message = (err as Error)?.message || "Щось пішло не так";
			toast.error("Помилка при видаленні ❌");
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// 📦 Отримати всі категорії зображень
export const getGallery = createAsyncThunk(
	"gallery/getAll",
	async (_, thunkAPI) => {
		try {
			const res = await gloriaAPI.get("/gallery");
			return res.data.data;
		} catch (err) {
			// @ts-expect-error TS is not sure about error structure
			const message = err?.message || "Щось пішло не так";
			toast.error("Не вдалося завантажити галерею ❌");
			return thunkAPI.rejectWithValue(message);
		}
	}
);
