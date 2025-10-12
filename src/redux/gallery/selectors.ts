import { RootState } from "../store";

export const selectGalleryList = (state: RootState) => state.gallery.gallery;
export const selectGalleryIsLoading = (state: RootState) =>
	state.gallery.isLoading;
