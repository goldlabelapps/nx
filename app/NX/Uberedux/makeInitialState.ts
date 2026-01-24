import type { T_Config } from '../types';

export const makeInitialState = (config: T_Config) => ({
    config,
    // ...other initial state properties
});
