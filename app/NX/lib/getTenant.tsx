import type { T_Tenant } from '../types';
import myTenantConfig from '../../../public/my-tenant/config.json';

export const getTenant = (tenant?: T_Tenant) => {

    const t = tenant || process.env.NEXT_PUBLIC_TENANT;
    let config;
    let markdownDir;

    switch (t) {
        case 'my-tenant':
            config = myTenantConfig;
            markdownDir = process.cwd() + '/public/my-tenant/markdown';
            break;
        default:
            config = myTenantConfig;
            markdownDir = process.cwd() + '/public/my-tenant/markdown';
            break;
    }
    return {
        tenant: t,
        config,
        markdownDir
    };
};
