// redux/main/slice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
	createMain,
	updateMain,
	getAllMain,
	getMainById,
	deleteMain,
} from "./operations";
import { MainState } from "@/types/types";

const initialState: MainState = {
	main: null,
	mainLang: null,
	isLoading: false,
	isError: false,
};

export const mainSlice = createSlice({
	name: "main",
	initialState,
	reducers: {
		resetMainError(state) {
			state.isError = false;
		},
	},
	extraReducers: (builder) => {
		builder
			// CREATE
			.addCase(createMain.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(createMain.fulfilled, (state, { payload }) => {
				state.main = payload;
				state.isLoading = false;
			})
			.addCase(createMain.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})

			// UPDATE
			.addCase(updateMain.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(updateMain.fulfilled, (state, { payload }) => {
				state.main = payload;
				state.isLoading = false;
			})
			.addCase(updateMain.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})

			// GET ALL (поверне масив, беремо перший)
			.addCase(getAllMain.fulfilled, (state, { payload }) => {
				const main = payload[0] || null;

				if (main) {
					const { ua, en, pl, de } = main; // деструктуруємо тільки мовні поля
					state.mainLang = { ua, en, pl, de };
					console.log("Main languages:", state.mainLang);
				} else {
					state.mainLang = null;
				}

				state.main = main;
			})

			// GET BY ID
			.addCase(getMainById.fulfilled, (state, { payload }) => {
				state.main = payload;
			})

			// DELETE
			.addCase(deleteMain.fulfilled, (state) => {
				state.main = null;
			});
	},
});

export const { resetMainError } = mainSlice.actions;
export const MainReducer = mainSlice.reducer;
