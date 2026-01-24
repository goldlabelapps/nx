'use client';
import type { T_Config } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialState';

export const reduxSlice = createSlice({
  name: 'redux',
  initialState,
  reducers: {
    setUbereduxKey: (
      state,
      action: PayloadAction<{ key: string; value: any }>,
    ) => {
      const { key, value } = action.payload;
      console.log('Setting key:', key, 'to value:', value);
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

    resetUberedux: () => initialState,

    updateConfig: (state, action: PayloadAction<{ config: any }>) => {
      console.log("hey.")
      state.config = action.payload.config;
    },
  },
});


// Note: store is now created in UbereduxProvider with config, not here

export const setUbereduxKey = reduxSlice.actions.setUbereduxKey;
export const resetUberedux = reduxSlice.actions.resetUberedux;
export const updateConfig = reduxSlice.actions.updateConfig;


