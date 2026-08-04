import assert from 'node:assert/strict';
import test from 'node:test';
import { resetUberedux, setUbereduxKey, store } from '../src/store';
import {
  clearPersistedThemeMode,
  readPersistedThemeModeFromStorage,
  selectPersistedThemeMode,
  setPersistedThemeMode,
  themePreferenceStore,
} from '../src/themePreferenceStore';

test('setUbereduxKey writes nested values and resetUberedux clears them', () => {
  store.dispatch(setUbereduxKey({ key: 'flash.enabled', value: true }));

  assert.equal(store.getState().redux.flash.enabled, true);

  store.dispatch(resetUberedux());

  assert.deepEqual(store.getState().redux, {});
});

test('theme preference store updates and selects persisted mode', () => {
  themePreferenceStore.dispatch(setPersistedThemeMode('dark'));

  assert.equal(selectPersistedThemeMode(themePreferenceStore.getState()), 'dark');

  themePreferenceStore.dispatch(clearPersistedThemeMode());

  assert.equal(selectPersistedThemeMode(themePreferenceStore.getState()), null);
});

test('readPersistedThemeModeFromStorage returns stored theme mode when available', () => {
  const originalWindow = globalThis.window;

  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      localStorage: {
        getItem: () => JSON.stringify({ mode: JSON.stringify('light') }),
      },
    },
  });

  try {
    assert.equal(readPersistedThemeModeFromStorage(), 'light');
  } finally {
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: originalWindow,
    });
  }
});