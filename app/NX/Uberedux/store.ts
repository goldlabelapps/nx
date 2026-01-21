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

// Action creators for use with dynamic store
export const getUbereduxActions = (config: any) => {
  const slice = createReduxSlice(config);
  return {
    setUbereduxKey: slice.actions.setUbereduxKey,
    resetUberedux: slice.actions.resetUberedux,
  };
};

// Types for dynamic store
export type T_RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type T_Dispatch = ReturnType<typeof makeStore>["dispatch"];
