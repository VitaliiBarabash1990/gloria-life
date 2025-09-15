// redux/main/slice.ts
import { createSlice } from "@reduxjs/toolkit";

import { ContactsState } from "@/types/types";
import {
	createContacts,
	deleteContacts,
	getAllContacts,
	getContactsById,
	updateContacts,
} from "./operations";

const initialState: ContactsState = {
	contacts: null,
	isLoading: false,
	isError: false,
};

export const contactsSlice = createSlice({
	name: "contacts",
	initialState,
	reducers: {
		resetContactsError(state) {
			state.isError = false;
		},
	},
	extraReducers: (builder) => {
		builder
			// CREATE
			.addCase(createContacts.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(createContacts.fulfilled, (state, { payload }) => {
				state.contacts = payload;
				state.isLoading = false;
			})
			.addCase(createContacts.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})

			// UPDATE
			.addCase(updateContacts.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(updateContacts.fulfilled, (state, { payload }) => {
				state.contacts = payload;
				state.isLoading = false;
			})
			.addCase(updateContacts.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})

			// GET ALL (поверне масив, беремо перший)
			.addCase(getAllContacts.fulfilled, (state, { payload }) => {
				const main = payload[0] || null;

				state.contacts = main;
			})

			// GET BY ID
			.addCase(getContactsById.fulfilled, (state, { payload }) => {
				state.contacts = payload;
			})

			// DELETE
			.addCase(deleteContacts.fulfilled, (state) => {
				state.contacts = null;
			});
	},
});

export const { resetContactsError } = contactsSlice.actions;
export const ContactsReducer = contactsSlice.reducer;
