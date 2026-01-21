import UbereduxProvider from './UbereduxProvider';
import type { T_RootState, T_Dispatch } from './store';
import { getUbereduxActions } from './store';
import { setSomething } from './actions/setSomething';
import { useAll } from './hooks/useAll';

export type { T_RootState, T_Dispatch };
export {
  UbereduxProvider,
  getUbereduxActions,
  useAll,
  setSomething,
};
