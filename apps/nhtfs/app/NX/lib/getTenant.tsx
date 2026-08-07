import type { T_Tenant } from '../types';
import nxConfig from '../../../public/nx/config.json';
import { normalizeTenant } from './normalizeTenant';

export const getTenant = (tenant?: T_Tenant) => {

    const t = normalizeTenant(tenant) as T_Tenant;
    let config;
    let markdownDir;

    switch (t) {      

        case 'nx':
            config = nxConfig;
            markdownDir = process.cwd() + '/public/nx/markdown';
            break;
        default:
            config = nxConfig;
            markdownDir = process.cwd() + '/public/nx/markdown';
            break;
    }
    return {
        tenant: t,
        config,
        markdownDir
    };
};
