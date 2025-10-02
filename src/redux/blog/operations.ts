// redux/main/operations.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { gloriaAPI } from "../auth/operations";

// CREATE
export const createArticle = createAsyncThunk(
	"blog/createArticle",
	async (formData: FormData, thunkAPI) => {
		try {
			const res = await gloriaAPI.post("/article", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			toast.success("Article created successfully ✅");
			return res.data.data;
		} catch (error) {
			// @ts-expect-error TS is not sure about error structure
			const message = error?.message || "Щось пішло не так";
			toast.error("Помилка при створенні ❌");
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// UPDATE

export const updateArticle = createAsyncThunk(
	"blog/updateArticle",
	async ({ id, formData }: { id: string; formData: FormData }, thunkAPI) => {
		try {
			const res = await gloriaAPI.patch(`/article/${id}`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			toast.success("Article updated successfully ✅");
			return res.data.data;
		} catch (error) {
			// @ts-expect-error TS is not sure про структуру error
			const message = error?.message || "Щось пішло не так";
			toast.error("Помилка при оновленні ❌");
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// GET ALL
export const getAllArticle = createAsyncThunk(
	"blog/getAllArticle",
	async (_, thunkAPI) => {
		try {
			const res = await gloriaAPI.get("/article");
			console.log("BlogData", res.data.data);
			return res.data.data;
		} catch (err) {
			// @ts-expect-error TS is not sure about error structure
			const message = err?.message || "Щось пішло не так";
			toast.error("Не вдалося завантажити список ❌");
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// GET BY ID
export const getArticleById = createAsyncThunk(
	"blog/getArticleById",
	async (id: string, thunkAPI) => {
		try {
			const res = await gloriaAPI.get(`/article/${id}`);
			return res.data.data;
		} catch (err) {
			// @ts-expect-error TS is not sure about error structure
			const message = err?.message || "Щось пішло не так";
			toast.error("Не вдалося завантажити елемент ❌");
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// DELETE
export const deleteArticle = createAsyncThunk(
	"blog/deleteArticle",
	async (id: string, thunkAPI) => {
		try {
			await gloriaAPI.delete(`/article/${id}`);
			toast.success("Article deleted successfully ✅");
			return id; // повертаємо id щоб можна було прибрати зі стору
		} catch (err) {
			// @ts-expect-error TS is not sure about error structure
			const message = err?.message || "Щось пішло не так";
			toast.error("Помилка при видаленні ❌");
			return thunkAPI.rejectWithValue(message);
		}
	}
);
