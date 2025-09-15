import { RootState } from "../store";

export const selectMain = (state: RootState) => state.main.main;
export const selectMainLang = (state: RootState) => state.main.mainLang;
export const selectImgs = (state: RootState) => state.main.main?.img;
