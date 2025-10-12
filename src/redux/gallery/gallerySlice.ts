import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	getGallery,
	uploadGalleryImages,
	deleteGalleryImage,
} from "./operations";
import { GalleryCategory, GalleryState } from "@/types/types";

const initialState: GalleryState = {
	gallery: [],
	isLoading: false,
	isError: false,
};

export const gallerySlice = createSlice({
	name: "gallery",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// 🟢 GET
			.addCase(
				getGallery.fulfilled,
				(state, { payload }: PayloadAction<GalleryCategory[]>) => {
					state.gallery = payload;
					state.isLoading = false;
				}
			)

			// 🟢 UPLOAD
			.addCase(
				uploadGalleryImages.fulfilled,
				(state, { payload }: PayloadAction<GalleryCategory>) => {
					// console.log("Payload", payload);
					const index = state.gallery.findIndex((g) => g.type === payload.type);
					if (index >= 0) {
						state.gallery[index] = payload;
					} else {
						state.gallery.push(payload);
					}
					state.isLoading = false;
				}
			)

			// ❌ DELETE
			.addCase(
				deleteGalleryImage.fulfilled,
				(
					state,
					{ payload }: PayloadAction<{ type: string; imageUrl: string }>
				) => {
					const category = state.gallery.find((g) => g.type === payload.type);
					if (category) {
						category.imgs = category.imgs.filter(
							(img) => img._id !== payload.imageUrl
						);
					}
					state.isLoading = false;
				}
			);
	},
});

export const GalleryReducer = gallerySlice.reducer;
