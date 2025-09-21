// redux/main/operations.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { gloriaAPI } from "../auth/operations";

// CREATE
export const createAboutMe = createAsyncThunk(
	"about/createAboutMe",
	async (formData: FormData, thunkAPI) => {
		try {
			const res = await gloriaAPI.post("/about", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			toast.success("About created successfully ✅");
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

export const updateAboutMe = createAsyncThunk(
	"about/updateAboutMe",
	async ({ id, formData }: { id: string; formData: FormData }, thunkAPI) => {
		try {
			const res = await gloriaAPI.patch(`/about/${id}`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			toast.success("AboutMe updated successfully ✅");
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
export const getAllAboutMe = createAsyncThunk(
	"about/getAllAboutMe",
	async (_, thunkAPI) => {
		try {
			const res = await gloriaAPI.get("/about");
			// console.log("MainData", res.data.data);
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
export const getAboutMeById = createAsyncThunk(
	"about/getAboutMeById",
	async (id: string, thunkAPI) => {
		try {
			const res = await gloriaAPI.get(`/about/${id}`);
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
export const deleteAboutMe = createAsyncThunk(
	"about/deleteAboutMe",
	async (id: string, thunkAPI) => {
		try {
			await gloriaAPI.delete(`/about/${id}`);
			toast.success("About deleted successfully ✅");
			return id; // повертаємо id щоб можна було прибрати зі стору
		} catch (err) {
			// @ts-expect-error TS is not sure about error structure
			const message = err?.message || "Щось пішло не так";
			toast.error("Помилка при видаленні ❌");
			return thunkAPI.rejectWithValue(message);
		}
	}
);
