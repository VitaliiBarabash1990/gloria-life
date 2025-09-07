import { RootState } from "../store";

export const selectUser = (state: RootState) => state.auth.user;
export const selectUserRole = (state: RootState) => state.auth.role;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsError = (state: RootState) => state.auth.isError;
export const selectIsSuccess = (state: RootState) => state.auth.isSuccess;
export const selectIsToken = (state: RootState) => state.auth.token;
