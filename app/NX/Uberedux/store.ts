'use client';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { getInitialState } from './initialState';

const createReduxSlice = (config: any) => createSlice({
  name: 'redux',
  initialState: config ? config : getInitialState(config),
  reducers: {
    setUbereduxKey: (
      state,
      action: PayloadAction<{ key: string; value: any }>,
    ) => {
      const { key, value } = action.payload;
      const keys = key.split('.');
      let target: any = state;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!target[keys[i]]) {
          target[keys[i]] = {};
        }
        target = target[keys[i]];
      }

      target[keys[keys.length - 1]] = value;
    },

    resetUberedux: () => getInitialState({}),
  },
});


export function makeStore(config: any) {
  const reduxSlice = createReduxSlice(config);
  const rootReducer = combineReducers({
    redux: reduxSlice.reducer,
  });
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  return store;
}

// For actions, you may want to export creators from a default config instance, or refactor further as needed
// export const setUbereduxKey = reduxSlice.actions.setUbereduxKey;
// export const resetUberedux = reduxSlice.actions.resetUberedux;

// Types can be exported from a default store if needed, or refactored for dynamic store
// export type T_RootState = ReturnType<typeof store.getState>;
// export type T_Dispatch = typeof store.dispatch;
