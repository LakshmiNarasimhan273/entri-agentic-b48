import { createSlice, nanoid } from '@reduxjs/toolkit';
import { updateContact } from './contactsSlice';

export const STAGES = [
  { id: 'new', title: 'New' },
  { id: 'contacted', title: 'Contacted' },
  { id: 'qualified', title: 'Qualified' },
  { id: 'won_lost', title: 'Won/Lost' },
];

const dealsSlice = createSlice({
  name: 'deals',
  initialState: { items: [] },
  reducers: {
    addDeal: {
      reducer(state, { payload }) {
        state.items.push(payload);
      },
      prepare(data) {
        return { payload: { id: 'd_' + nanoid(8), ...data } };
      },
    },
    updateDeal(state, { payload }) {
      const i = state.items.findIndex((d) => d.id === payload.id);
      if (i !== -1) state.items[i] = { ...state.items[i], ...payload };
    },
    deleteDeal(state, { payload: id }) {
      state.items = state.items.filter((d) => d.id !== id);
    },
    // Drag & drop: move a deal to a stage at a given position inside that column
    moveDeal(state, { payload: { id, toStage, toIndex } }) {
      const from = state.items.findIndex((d) => d.id === id);
      if (from === -1) return;
      const [deal] = state.items.splice(from, 1);
      deal.stage = toStage;
      const others = state.items.filter((d) => d.stage === toStage);
      const anchor = others[toIndex];
      if (anchor) {
        state.items.splice(state.items.indexOf(anchor), 0, deal);
      } else {
        state.items.push(deal);
      }
    },
  },
  extraReducers: (builder) => {
    // Keep the denormalised contactName on deals in sync when a contact is renamed
    builder.addCase(updateContact, (state, { payload }) => {
      if (!payload.name) return;
      state.items.forEach((d) => {
        if (d.contactId === payload.id) d.contactName = payload.name;
      });
    });
  },
});

export const { addDeal, updateDeal, deleteDeal, moveDeal } = dealsSlice.actions;
export default dealsSlice.reducer;
