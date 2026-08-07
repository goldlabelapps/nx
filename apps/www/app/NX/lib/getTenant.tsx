import type { T_Tenant } from '../types';
import nxConfig from '../../../public/nx/config.json';

export const getTenant = (_tenant?: T_Tenant) => {
    const t = 'nx' as T_Tenant;

    return {
        tenant: t,
        config: nxConfig,
        markdownDir: process.cwd() + '/public/nx/markdown',
    };
};
