'use client';

import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
  type PersistConfig,
} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import type {
  T_PersistedThemeMode,
  T_ThemePreferenceState,
} from '../types';

const NOOP_STORAGE = {
  getItem: async (_key: string) => null,
  setItem: async (_key: string, value: string) => value,
  removeItem: async (_key: string) => undefined,
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : NOOP_STORAGE;

const PERSIST_KEY = 'nx-theme-preference';
const LOCAL_STORAGE_KEY = `persist:${PERSIST_KEY}`;

const initialThemePreferenceState: T_ThemePreferenceState = {
  mode: null,
};

const themePreferenceSlice = createSlice({
  name: 'themePreference',
  initialState: initialThemePreferenceState,
  reducers: {
    setPersistedThemeMode: (state, action: PayloadAction<T_PersistedThemeMode>) => {
      state.mode = action.payload;
    },
    clearPersistedThemeMode: (state) => {
      state.mode = null;
    },
  },
});

const persistConfig: PersistConfig<T_ThemePreferenceState> = {
  key: PERSIST_KEY,
  version: 1,
  storage,
  whitelist: ['mode'],
};

const persistedThemePreferenceReducer = persistReducer(persistConfig, themePreferenceSlice.reducer);

export const themePreferenceStore = configureStore({
  reducer: {
    themePreference: persistedThemePreferenceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type T_ThemePreferenceStoreState = ReturnType<typeof themePreferenceStore.getState>;

export const themePreferencePersistor = persistStore(themePreferenceStore);

const themePreferenceActions = themePreferenceSlice.actions;

export const setPersistedThemeMode = themePreferenceActions.setPersistedThemeMode;
export const clearPersistedThemeMode = themePreferenceActions.clearPersistedThemeMode;

export const selectPersistedThemeMode = (state: T_ThemePreferenceStoreState) => state.themePreference.mode;

export function readPersistedThemeModeFromStorage(): T_PersistedThemeMode | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawPersistedObject = window.localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!rawPersistedObject) {
      return null;
    }

    const persistedObject = JSON.parse(rawPersistedObject) as { mode?: string };

    if (!persistedObject.mode) {
      return null;
    }

    const mode = JSON.parse(persistedObject.mode) as unknown;
    return mode === 'light' || mode === 'dark' ? mode : null;
  } catch {
    return null;
  }
}