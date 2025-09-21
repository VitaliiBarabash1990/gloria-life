// redux/main/slice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
	deleteAboutMe,
	getAboutMeById,
	getAllAboutMe,
	updateAboutMe,
	createAboutMe,
} from "./operations";
import { AboutMePayload, AboutMeState } from "@/types/types";

const initialState: AboutMeState = {
	aboutMeList: [],
	aboutMeLangList: [],
	isLoading: false,
	isError: false,
};

export const aboutMeSlice = createSlice({
	name: "aboutMe",
	initialState,
	reducers: {
		resetAboutMeError(state) {
			state.isError = false;
		},
	},
	extraReducers: (builder) => {
		builder
			// CREATE
			.addCase(createAboutMe.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(createAboutMe.fulfilled, (state, { payload }) => {
				// state.aboutMe = payload;
				state.aboutMeList.push(payload);

				const { ua, en, pl, de } = payload;
				state.aboutMeLangList.push({ ua, en, pl, de });
				state.isLoading = false;
			})
			.addCase(createAboutMe.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})

			// UPDATE
			.addCase(updateAboutMe.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(updateAboutMe.fulfilled, (state, { payload }) => {
				// state.aboutMe = payload;
				state.aboutMeList = state.aboutMeList.map((item) =>
					item._id === payload._id ? payload : item
				);

				state.aboutMeLangList = state.aboutMeList.map((item) => {
					const { ua, en, pl, de } = item;
					return { ua, en, pl, de };
				});
				state.isLoading = false;
			})
			.addCase(updateAboutMe.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})

			// GET ALL (поверне масив, беремо перший)
			.addCase(getAllAboutMe.fulfilled, (state, { payload }) => {
				// const aboutMe = payload[0] || null;

				// if (aboutMe) {
				// 	const { ua, en, pl, de } = aboutMe;
				// 	state.aboutMeLang = { ua, en, pl, de };
				// } else {
				// 	state.aboutMeLang = null;
				// }
				// state.aboutMe = aboutMe;

				state.aboutMeList = payload;

				state.aboutMeLangList = payload.map((item: AboutMePayload) => {
					const { ua, en, pl, de } = item;
					return { ua, en, pl, de };
				});
			})

			// GET BY ID
			.addCase(getAboutMeById.fulfilled, (state, { payload }) => {
				// state.aboutMe = payload;

				const exists = state.aboutMeList.some(
					(item) => item._id === payload._id
				);
				if (exists) {
					state.aboutMeList = state.aboutMeList.map((item) =>
						item._id === payload._id ? payload : item
					);
				} else {
					state.aboutMeList.push(payload);
				}

				state.aboutMeLangList = state.aboutMeList.map((item) => {
					const { ua, en, pl, de } = item;
					return { ua, en, pl, de };
				});
			})

			// DELETE
			.addCase(deleteAboutMe.fulfilled, (state, { payload }) => {
				// state.aboutMe = null;
				state.aboutMeList = state.aboutMeList.filter(
					(item) => item._id !== payload
				);

				state.aboutMeLangList = state.aboutMeList.map((item) => {
					const { ua, en, pl, de } = item;
					return { ua, en, pl, de };
				});
			});
	},
});

export const { resetAboutMeError } = aboutMeSlice.actions;
export const AboutMeReducer = aboutMeSlice.reducer;
