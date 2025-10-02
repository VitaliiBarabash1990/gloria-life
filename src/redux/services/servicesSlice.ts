// redux/main/slice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
	createServices,
	updateServices,
	getAllServices,
	getServicesById,
	deleteServices,
} from "./operations";
import { ServicesPayload, ServicesState } from "@/types/types";

const initialState: ServicesState = {
	servicesList: [],
	servicesLangList: [],
	isLoading: false,
	isError: false,
};

export const servicesSlice = createSlice({
	name: "services",
	initialState,
	reducers: {
		resetServicesError(state) {
			state.isError = false;
		},
	},
	extraReducers: (builder) => {
		builder
			// CREATE
			.addCase(createServices.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(createServices.fulfilled, (state, { payload }) => {
				// state.aboutMe = payload;
				state.servicesList.push(payload);

				const { ua, en, pl, de } = payload;
				state.servicesLangList.push({ ua, en, pl, de });
				state.isLoading = false;
			})
			.addCase(createServices.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})

			// UPDATE
			.addCase(updateServices.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(updateServices.fulfilled, (state, { payload }) => {
				// state.aboutMe = payload;
				state.servicesList = state.servicesList.map((item) =>
					item._id === payload._id ? payload : item
				);

				state.servicesLangList = state.servicesList.map((item) => {
					const { ua, en, pl, de } = item;
					return { ua, en, pl, de };
				});
				state.isLoading = false;
			})
			.addCase(updateServices.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})

			// GET ALL (поверне масив, беремо перший)
			.addCase(getAllServices.fulfilled, (state, { payload }) => {
				state.servicesList = payload;

				state.servicesLangList = payload.map((item: ServicesPayload) => {
					const { ua, en, pl, de } = item;
					return { ua, en, pl, de };
				});
			})

			// GET BY ID
			.addCase(getServicesById.fulfilled, (state, { payload }) => {
				// state.aboutMe = payload;

				const exists = state.servicesList.some(
					(item) => item._id === payload._id
				);
				if (exists) {
					state.servicesList = state.servicesList.map((item) =>
						item._id === payload._id ? payload : item
					);
				} else {
					state.servicesList.push(payload);
				}

				state.servicesLangList = state.servicesList.map((item) => {
					const { ua, en, pl, de } = item;
					return { ua, en, pl, de };
				});
			})

			// DELETE
			.addCase(deleteServices.fulfilled, (state, { payload }) => {
				// state.aboutMe = null;
				state.servicesList = state.servicesList.filter(
					(item) => item._id !== payload
				);

				state.servicesLangList = state.servicesList.map((item) => {
					const { ua, en, pl, de } = item;
					return { ua, en, pl, de };
				});
			});
	},
});

export const { resetServicesError } = servicesSlice.actions;
export const ServicesReducer = servicesSlice.reducer;
