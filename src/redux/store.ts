import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { MainReducer } from "./main/mainSlice";
import { ContactsReducer } from "./contacts/contactSlice";
import { AboutMeReducer } from "./aboutMe/aboutMeSlice";

const authPersistConfig = {
	key: "auth",
	storage,
	whitelist: ["token", "role", "user", "isLoggedIn"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,
		main: MainReducer,
		contacts: ContactsReducer,
		aboutMe: AboutMeReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
