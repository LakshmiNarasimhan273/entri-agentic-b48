import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import contactsReducer from './contactsSlice';
import dealsReducer from './dealsSlice';
import preferencesReducer from './preferencesSlice';
import { loadInitialState, write, clearSession, STORAGE_KEYS } from '../utils/storage';

export function createStore(preloadedState = loadInitialState()) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      contacts: contactsReducer,
      deals: dealsReducer,
      preferences: preferencesReducer,
    },
    preloadedState,
  });

  // Persist to localStorage (same keys as the original app) whenever state changes
  let prev = store.getState();
  store.subscribe(() => {
    const s = store.getState();
    if (s.auth.users !== prev.auth.users) write(STORAGE_KEYS.USERS, s.auth.users);
    if (s.auth.session !== prev.auth.session) {
      s.auth.session ? write(STORAGE_KEYS.SESSION, s.auth.session) : clearSession();
    }
    if (s.contacts.items !== prev.contacts.items) write(STORAGE_KEYS.CONTACTS, s.contacts.items);
    if (s.deals.items !== prev.deals.items) write(STORAGE_KEYS.DEALS, s.deals.items);
    if (s.preferences !== prev.preferences) write(STORAGE_KEYS.PREFERENCES, s.preferences);
    prev = s;
  });

  // Seed storage on first run so data exists even before any change
  const s = store.getState();
  if (localStorage.getItem(STORAGE_KEYS.USERS) === null) write(STORAGE_KEYS.USERS, s.auth.users);
  if (localStorage.getItem(STORAGE_KEYS.CONTACTS) === null) write(STORAGE_KEYS.CONTACTS, s.contacts.items);
  if (localStorage.getItem(STORAGE_KEYS.DEALS) === null) write(STORAGE_KEYS.DEALS, s.deals.items);

  return store;
}

export default createStore;
