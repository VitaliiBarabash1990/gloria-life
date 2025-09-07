import { createSlice } from "@reduxjs/toolkit";
import { logOut, adminLogIn } from "./operations";
import { AuthState } from "@/types/types";

const initialState: AuthState = {
	user: {
		name: null,
		email: null,
	},
	token: null,
	role: null,
	isLoggedIn: false,
	isLoading: false,
	isError: false,
	isSuccess: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetError(state) {
			state.isError = false;
		},
		resetSuccess(state) {
			state.isSuccess = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(adminLogIn.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(adminLogIn.fulfilled, (state, { payload }) => {
				state.user.name = payload.name;
				state.user.email = payload.email;
				state.token = payload.accessToken;
				state.role = payload.role; // тільки тут
				state.isLoggedIn = true;
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
			})
			.addCase(adminLogIn.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})
			.addCase(logOut.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(logOut.fulfilled, (state) => {
				state.user = {
					name: null,
					email: null,
				};
				state.token = null;
				state.role = null;
				state.isLoggedIn = false;
				state.isLoading = false;
				state.isError = false;
			})
			.addCase(logOut.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			});
	},
});

export const { resetError, resetSuccess } = authSlice.actions;
export const authReducer = authSlice.reducer;
