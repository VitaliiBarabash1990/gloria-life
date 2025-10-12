// redux/main/operations.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { gloriaAPI } from "../auth/operations";
import { RootState } from "../store";
import { ContactsMenuFormProps } from "@/types/types";

// CREATE
export const createContacts = createAsyncThunk(
	"contacts/create",
	async (formData: ContactsMenuFormProps, thunkAPI) => {
		try {
			const state = thunkAPI.getState() as RootState;
			const token = state.auth.token;

			const res = await gloriaAPI.post("/contacts", formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			toast.success("Contacts created successfully ✅");
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

export const updateContacts = createAsyncThunk(
	"contacts/update",
	async (
		{
			id,
			formData,
		}: { id: string | undefined; formData: ContactsMenuFormProps },
		thunkAPI
	) => {
		try {
			const state = thunkAPI.getState() as RootState;
			const token = state.auth.token;
			// console.log("ID", id);
			const res = await gloriaAPI.patch(`/contacts/${id}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			toast.success("Contacts updated successfully ✅");
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
export const getAllContacts = createAsyncThunk(
	"contacts/getAllContacts",
	async (_, thunkAPI) => {
		try {
			const res = await gloriaAPI.get("/contacts");
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
export const getContactsById = createAsyncThunk(
	"contacts/getContactsById",
	async (id: string, thunkAPI) => {
		try {
			const res = await gloriaAPI.get(`/contacts/${id}`);
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
export const deleteContacts = createAsyncThunk(
	"contacts/deleteContacts",
	async (id: string, thunkAPI) => {
		try {
			await gloriaAPI.delete(`/contacts/${id}`);
			toast.success("Contacts deleted successfully ✅");
			return id; // повертаємо id щоб можна було прибрати зі стору
		} catch (err) {
			// @ts-expect-error TS is not sure about error structure
			const message = err?.message || "Щось пішло не так";
			toast.error("Помилка при видаленні ❌");
			return thunkAPI.rejectWithValue(message);
		}
	}
);
