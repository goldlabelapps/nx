import type { T_Tenant } from '../types';
import nxConfig from '../../../public/nx/config.json';
import { resolveMarkdownRoot } from './markdownRoots';

export const getTenant = (_tenant?: T_Tenant) => {
    const t = 'nx' as T_Tenant;

    return {
        tenant: t,
        config: nxConfig,
        markdownDir: resolveMarkdownRoot(),
    };
};
