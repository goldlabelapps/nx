// /Users/milky/My Drive/GitHub/goldlabel-pro/gl-core/cartridges/Uberedux/index.tsx
import UbereduxProvider from './UbereduxProvider';
import { TRootState, TUbereduxDispatch } from './store';
// import { useSlice } from './hooks/useSlice';
// import { fetchGlobalNav } from './actions/fetchGlobalNav';

import { setUbereduxKey, resetUberedux } from './store';



export {
  UbereduxProvider,
  setUbereduxKey,
  resetUberedux,
};

export type { TRootState, TUbereduxDispatch };
