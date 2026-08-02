import type { ReactNode } from 'react';
import type { Dispatch, UnknownAction } from 'redux';

export type T_UbereduxState = Record<string, unknown>;

export type T_UbereduxKeyPayload = {
  key: string;
  value: unknown;
};

export type T_RootState = {
  redux: T_UbereduxState;
};

export type T_UbereduxDispatch = Dispatch<UnknownAction>;
export type AppDispatch = T_UbereduxDispatch;

export type T_UbereduxProviderProps = {
  config?: unknown;
  children: ReactNode;
};