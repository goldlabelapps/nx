import UbereduxProvider from './UbereduxProvider';
import { useSlice } from './hooks/useSlice';
import { useDispatch } from './hooks/useDispatch';
import { initialState, setUbereduxKey, resetUberedux, store } from './store';
import {
  clearPersistedThemeMode,
  readPersistedThemeModeFromStorage,
  selectPersistedThemeMode,
  setPersistedThemeMode,
  themePreferencePersistor,
  themePreferenceStore,
} from './themePreferenceStore';

export {
  UbereduxProvider,
  initialState,
  useSlice,
  useDispatch,
  setUbereduxKey,
  resetUberedux,
  store,
  setPersistedThemeMode,
  clearPersistedThemeMode,
  selectPersistedThemeMode,
  readPersistedThemeModeFromStorage,
  themePreferenceStore,
  themePreferencePersistor,
};

export type {
  T_RootState,
  T_UbereduxDispatch,
  AppDispatch,
  T_PersistedThemeMode,
  T_ThemePreferenceState,
  T_ThemePreferenceRootState,
  T_ThemePreferenceStore,
} from '../types';