// redux/main/operations.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { gloriaAPI } from "../auth/operations";
import { RootState } from "../store";
import { ServicesFormProps } from "@/types/types";

// CREATE
export const createServices = createAsyncThunk(
	"services/createServices",
	async (formData: ServicesFormProps, thunkAPI) => {
		try {
			const state = thunkAPI.getState() as RootState;
			const token = state.auth.token;
			const res = await gloriaAPI.post("/services", formData, {
				headers: { Authorization: `Bearer ${token}` },
			});
			toast.success("Services created successfully ✅");
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

export const updateServices = createAsyncThunk(
	"services/updateServices",
	async (
		{ id, formData }: { id: string; formData: ServicesFormProps },
		thunkAPI
	) => {
		try {
			const state = thunkAPI.getState() as RootState;
			const token = state.auth.token;
			const res = await gloriaAPI.patch(`/services/${id}`, formData, {
				headers: { Authorization: `Bearer ${token}` },
			});
			toast.success("Services updated successfully ✅");
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
export const getAllServices = createAsyncThunk(
	"services/getAllServices",
	async (_, thunkAPI) => {
		try {
			const res = await gloriaAPI.get("/services");
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
export const getServicesById = createAsyncThunk(
	"services/getServicesById",
	async (id: string, thunkAPI) => {
		try {
			const res = await gloriaAPI.get(`/services/${id}`);
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
export const deleteServices = createAsyncThunk(
	"services/deleteServices",
	async (id: string, thunkAPI) => {
		try {
			await gloriaAPI.delete(`/services/${id}`);
			toast.success("Services deleted successfully ✅");
			return id; // повертаємо id щоб можна було прибрати зі стору
		} catch (err) {
			// @ts-expect-error TS is not sure about error structure
			const message = err?.message || "Щось пішло не так";
			toast.error("Помилка при видаленні ❌");
			return thunkAPI.rejectWithValue(message);
		}
	}
);
