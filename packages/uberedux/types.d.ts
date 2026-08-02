import type { ReactNode } from 'react';
import type { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';

export type T_UbereduxState = Record<string, any>;

export type T_UbereduxKeyPayload = {
  key: string;
  value: unknown;
};

export type T_RootState = {
  redux: T_UbereduxState;
};

export type T_UbereduxDispatch = ThunkDispatch<T_RootState, unknown, UnknownAction>;
export type AppDispatch = T_UbereduxDispatch;

export type T_UbereduxProviderProps = {
  config?: unknown;
  children: ReactNode;
};