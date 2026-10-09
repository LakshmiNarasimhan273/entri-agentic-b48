import { createSlice, nanoid } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [] },
  reducers: {
    addContact: {
      reducer(state, { payload }) {
        state.items.push(payload);
      },
      prepare(data) {
        return { payload: { id: 'c_' + nanoid(8), ...data } };
      },
    },
    updateContact(state, { payload }) {
      const i = state.items.findIndex((c) => c.id === payload.id);
      if (i !== -1) state.items[i] = { ...state.items[i], ...payload };
    },
    deleteContact(state, { payload: id }) {
      state.items = state.items.filter((c) => c.id !== id);
    },
  },
});

export const { addContact, updateContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
