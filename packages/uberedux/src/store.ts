'use client';

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import type { T_UbereduxState, T_UbereduxKeyPayload } from '../types';

export const initialState: T_UbereduxState = {};

const reduxSlice = createSlice({
  name: 'redux',
  initialState,
  reducers: {
    setUbereduxKey: (
      state,
      action: PayloadAction<T_UbereduxKeyPayload>,
    ) => {
      const { key, value } = action.payload;
      const keys = key.split('.');
      let target: T_UbereduxState = state;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!target[keys[i]]) {
          target[keys[i]] = {};
        }
        target = target[keys[i]];
      }

      target[keys[keys.length - 1]] = value;
    },

    resetUberedux: () => initialState,
  },
});

export const setUbereduxKey = reduxSlice.actions.setUbereduxKey;
export const resetUberedux = reduxSlice.actions.resetUberedux;

const rootReducer = combineReducers({
  redux: reduxSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});