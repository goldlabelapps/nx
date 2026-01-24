// /Users/goldlabel/GitHub/core/gl-core/initialState.tsx
import pJSON from '../../../package.json';

export const initialState: any = {
  version: pJSON.version,
  config: {
    cartridges: {
      echopay: {
        enabled: false,
        // Add other default keys as needed
      },
      // Add other cartridges as needed
    },
    // Add other config fields as needed
  },
};
