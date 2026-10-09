import { createSlice } from '@reduxjs/toolkit';

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {},
  reducers: {
    savePreferences: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { savePreferences } = preferencesSlice.actions;
export default preferencesSlice.reducer;
