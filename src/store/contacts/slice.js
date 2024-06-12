import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {contacts: []},
    reducers: {
        deleteContact: (state, {payload}) => {
            state.contacts = state.contacts.filter(el => el.id !== payload)
        },
        addContact: (state, { payload }) => {
            state.contacts.push(payload);
        },
    },
});

export const { addContact, deleteContact } = contactsSlice.actions;

export const reducerContacts = contactsSlice.reducer;