import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AuthResponse, SendOrderPayload } from "@/types/types";

export const gloriaAPI = axios.create({
	baseURL: "http://localhost:4000/",
	// baseURL: "https://pan-sirko-back.onrender.com",
	withCredentials: true,
});

const setAuthHeader = (token: string) => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
	delete axios.defaults.headers.common.Authorization;
};

interface LoginCredentials {
	email: string;
	password: string;
}

export const adminLogIn = createAsyncThunk<
	AuthResponse & { role: string },
	LoginCredentials,
	{ rejectValue: string }
>("auth/adminlogin", async (credentials, thunkAPI) => {
	try {
		const res = await gloriaAPI.post("/auth/adminlogin", credentials);
		const token = res.data?.data?.data?.accessToken;
		if (token) setAuthHeader(token);
		toast.success(`Welcome Admin ${res.data?.data?.data?.name ?? ""}`);
		return res.data.data.data;
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : "Unknown admin login error";
		toast.error("ERROR, Invalid admin data");
		return thunkAPI.rejectWithValue(message);
	}
});

export const logOut = createAsyncThunk<void, void, { rejectValue: string }>(
	"auth/logout",
	async (_, thunkAPI) => {
		try {
			await gloriaAPI.post("/auth/logout");
			clearAuthHeader();
		} catch (error) {
			// @ts-expect-error TS is not sure about error structure
			const message = error?.message ?? "Unknown error";
			toast.error("Error, server not answer");
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const sendOrderEmail = createAsyncThunk<
	void,
	SendOrderPayload,
	{ rejectValue: string }
>("order/sendEmail", async (orderData, thunkAPI) => {
	try {
		await gloriaAPI.post("/auth/send-order", orderData);
		toast.success("Замовлення успішно відправлено на email!");
	} catch (error) {
		// @ts-expect-error TS is not sure about error structure
		const message = error?.message || "Щось пішло не так";
		toast.error("Помилка при відправленні замовлення");
		return thunkAPI.rejectWithValue(message);
	}
});

export const sendOrderTelegram = createAsyncThunk<
	void,
	SendOrderPayload,
	{ rejectValue: string }
>("order/sendTelegram", async (orderData, thunkAPI) => {
	try {
		await gloriaAPI.post("/auth/send-order-telegram", orderData);
		toast.success("Замовлення успішно відправлено на Telegram!");
	} catch (error) {
		// @ts-expect-error TS is not sure about error structure
		const message = error?.message || "Щось пішло не так";
		toast.error("Помилка при відправленні замовлення");
		return thunkAPI.rejectWithValue(message);
	}
});
