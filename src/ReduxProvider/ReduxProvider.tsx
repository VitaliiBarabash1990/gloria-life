"use client";

import store, { persistor } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

type ReduxProviderProps = {
	children: ReactNode;
};

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={<div>Loader..</div>} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
};

export default ReduxProvider;
