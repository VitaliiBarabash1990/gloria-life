// redux/main/slice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
	createArticle,
	updateArticle,
	getAllArticle,
	getArticleById,
	deleteArticle,
} from "./operations";
import { BlogPayload, BlogState } from "@/types/types";

const initialState: BlogState = {
	blogList: [],
	blogLangList: [],
	isLoading: false,
	isError: false,
};

export const blogSlice = createSlice({
	name: "blog",
	initialState,
	reducers: {
		resetBlogError(state) {
			state.isError = false;
		},
	},
	extraReducers: (builder) => {
		builder
			// CREATE
			.addCase(createArticle.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(createArticle.fulfilled, (state, { payload }) => {
				// state.aboutMe = payload;
				state.blogList.push(payload);

				const { ua, en, pl, de } = payload;
				state.blogLangList.push({ ua, en, pl, de });
				state.isLoading = false;
			})
			.addCase(createArticle.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})

			// UPDATE
			.addCase(updateArticle.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(updateArticle.fulfilled, (state, { payload }) => {
				// state.aboutMe = payload;
				state.blogList = state.blogList.map((item) =>
					item._id === payload._id ? payload : item
				);

				state.blogLangList = state.blogList.map((item) => {
					const { ua, en, pl, de } = item;
					return { ua, en, pl, de };
				});
				state.isLoading = false;
			})
			.addCase(updateArticle.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})

			// GET ALL (поверне масив, беремо перший)
			.addCase(getAllArticle.fulfilled, (state, { payload }) => {
				// const aboutMe = payload[0] || null;

				// if (aboutMe) {
				// 	const { ua, en, pl, de } = aboutMe;
				// 	state.aboutMeLang = { ua, en, pl, de };
				// } else {
				// 	state.aboutMeLang = null;
				// }
				// state.aboutMe = aboutMe;

				state.blogList = payload;

				state.blogLangList = payload.map((item: BlogPayload) => {
					const { ua, en, pl, de } = item;
					return { ua, en, pl, de };
				});
			})

			// GET BY ID
			.addCase(getArticleById.fulfilled, (state, { payload }) => {
				// state.aboutMe = payload;

				const exists = state.blogList.some((item) => item._id === payload._id);
				if (exists) {
					state.blogList = state.blogList.map((item) =>
						item._id === payload._id ? payload : item
					);
				} else {
					state.blogList.push(payload);
				}

				state.blogLangList = state.blogList.map((item) => {
					const { ua, en, pl, de } = item;
					return { ua, en, pl, de };
				});
			})

			// DELETE
			.addCase(deleteArticle.fulfilled, (state, { payload }) => {
				// state.aboutMe = null;
				state.blogList = state.blogList.filter((item) => item._id !== payload);

				state.blogLangList = state.blogList.map((item) => {
					const { ua, en, pl, de } = item;
					return { ua, en, pl, de };
				});
			});
	},
});

export const { resetBlogError } = blogSlice.actions;
export const BlogReducer = blogSlice.reducer;
