import { RootState } from "../store";

export const selectAboutMe = (state: RootState) => state.aboutMe.aboutMeList;
export const selectAboutMeLang = (state: RootState) =>
	state.aboutMe.aboutMeLangList;
