// redux/main/operations.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { gloriaAPI } from "../auth/operations";

// CREATE
export const createMain = createAsyncThunk(
	"main/create",
	async (formData: FormData, thunkAPI) => {
		try {
			const res = await gloriaAPI.post("/main", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			toast.success("Main created successfully ✅");
			return res.data.data;
		} catch (error) {
			// @ts-expect-error TS is not sure about error structure
			const message = error?.message || "Щось пішло не так";
			toast.error("Помилка при створенні ❌");
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// export const createMain = createAsyncThunk(
// 	"main/create",
// 	async (payload: MainPayload, thunkAPI) => {
// 		try {
// 			const formData = new FormData();

// 			// тексти
// 			["ua", "en", "pl", "de"].forEach((lang) => {
// 				Object.entries(payload[lang as keyof Omit<MainPayload, "img">]).forEach(
// 					([key, value]) => {
// 						formData.append(`${lang}[${key}]`, value || "");
// 					}
// 				);
// 			});

// 			// картинки
// 			payload.img.forEach((file) => {
// 				if (file) formData.append("img", file);
// 			});

// 			const res = await gloriaAPI.post("/main", formData);
// 			toast.success("Main created successfully ✅");
// 			return res.data.data;
// 		} catch (error) {
// 			// @ts-expect-error TS is not sure about error structure
// 			const message = error?.message || "Щось пішло не так";
// 			toast.error("Помилка при створенні ❌");
// 			return thunkAPI.rejectWithValue(message);
// 		}
// 	}
// );

// UPDATE

export const updateMain = createAsyncThunk(
	"main/update",
	async ({ id, formData }: { id: string; formData: FormData }, thunkAPI) => {
		try {
			const res = await gloriaAPI.patch(`/main/${id}`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			toast.success("Main updated successfully ✅");
			return res.data.data;
		} catch (error) {
			// @ts-expect-error TS is not sure про структуру error
			const message = error?.message || "Щось пішло не так";
			toast.error("Помилка при оновленні ❌");
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// export const updateMain = createAsyncThunk(
// 	"main/update",
// 	async ({ id, payload }: { id: string; payload: MainPayload }, thunkAPI) => {
// 		try {
// 			const formData = new FormData();

// 			["ua", "en", "pl", "de"].forEach((lang) => {
// 				Object.entries(payload[lang as keyof Omit<MainPayload, "img">]).forEach(
// 					([key, value]) => {
// 						formData.append(`${lang}[${key}]`, value || "");
// 					}
// 				);
// 			});

// 			payload.img.forEach((file) => {
// 				if (file) formData.append("img", file);
// 			});

// 			const res = await gloriaAPI.patch(`/main/${id}`, formData);
// 			toast.success("Main updated successfully ✅");
// 			return res.data.data;
// 		} catch (err) {
// 			// @ts-expect-error TS is not sure about error structure
// 			const message = err?.message || "Щось пішло не так";
// 			toast.error("Помилка при оновленні ❌");
// 			return thunkAPI.rejectWithValue(message);
// 		}
// 	}
// );

// GET ALL
export const getAllMain = createAsyncThunk(
	"main/getAll",
	async (_, thunkAPI) => {
		try {
			const res = await gloriaAPI.get("/main");
			console.log("MainData", res);
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
export const getMainById = createAsyncThunk(
	"main/getById",
	async (id: string, thunkAPI) => {
		try {
			const res = await gloriaAPI.get(`/main/${id}`);
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
export const deleteMain = createAsyncThunk(
	"main/delete",
	async (id: string, thunkAPI) => {
		try {
			await gloriaAPI.delete(`/main/${id}`);
			toast.success("Main deleted successfully ✅");
			return id; // повертаємо id щоб можна було прибрати зі стору
		} catch (err) {
			// @ts-expect-error TS is not sure about error structure
			const message = err?.message || "Щось пішло не так";
			toast.error("Помилка при видаленні ❌");
			return thunkAPI.rejectWithValue(message);
		}
	}
);
