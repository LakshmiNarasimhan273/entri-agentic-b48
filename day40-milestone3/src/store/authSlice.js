import { createSlice } from '@reduxjs/toolkit';

// state: { users: [...], session: {id, name, email, avatar?} | null }
const authSlice = createSlice({
  name: 'auth',
  initialState: { users: [], session: null },
  reducers: {
    registerUser(state, { payload }) {
      state.users.push(payload);
      state.session = toSession(payload);
    },
    login(state, { payload }) {
      state.session = toSession(payload);
    },
    logout(state) {
      state.session = null;
    },
    updateProfile(state, { payload }) {
      const user = state.users.find((u) => u.id === state.session?.id);
      if (user) Object.assign(user, payload);
      if (state.session) Object.assign(state.session, payload);
    },
    changePassword(state, { payload }) {
      const user = state.users.find((u) => u.id === state.session?.id);
      if (user) user.password = payload;
    },
  },
});

function toSession(u) {
  const s = { id: u.id, name: u.name, email: u.email };
  if (u.avatar) s.avatar = u.avatar;
  return s;
}

export const { registerUser, login, logout, updateProfile, changePassword } = authSlice.actions;
export default authSlice.reducer;
