import type { T_Tenant } from '../types';
import newTenantConfig from '../../../public/_new_tenant/config.json';
import nxConfig from '../../../public/nx/config.json';
import mcukConfig from '../../../public/mcuk/config.json';
import echopayConfig from '../../../public/echopay/config.json';
import edtechConfig from '../../../public/edtech/config.json';
import companyConfig from '../../../public/company/config.json';
import foodConfig from '../../../public/food/config.json';
import writingConfig from '../../../public/writing/config.json';
import sohoConfig from '../../../public/soho/config.json';


export const getTenant = (tenant?: T_Tenant) => {

    const t = tenant || process.env.NEXT_PUBLIC_TENANT;
    let config;
    let markdownDir;

    switch (t) {
        case '_new_tenant':
            config = newTenantConfig;
            markdownDir = process.cwd() + '/public/_new_tenant/markdown';
            break;
        case 'soho':
            config = sohoConfig;
            markdownDir = process.cwd() + '/public/soho/markdown';
            break;
        case 'writing':
            config = writingConfig;
            markdownDir = process.cwd() + '/public/writing/markdown';
            break;
        case 'food':
            config = foodConfig;
            markdownDir = process.cwd() + '/public/food/markdown';
            break;
        case 'company':
            config = companyConfig;
            markdownDir = process.cwd() + '/public/company/markdown';
            break;
        case 'mcuk':
            config = mcukConfig;
            markdownDir = process.cwd() + '/public/mcuk/markdown';
            break;
        case 'echopay':
            config = echopayConfig;
            markdownDir = process.cwd() + '/public/echopay/markdown';
            break;
        case 'edtech':
            config = edtechConfig;
            markdownDir = process.cwd() + '/public/edtech/markdown';
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
