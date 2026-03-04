// import type { T_Tenant } from '../types';
import nxConfig from '../../../public/nx/config.json';
import mcukConfig from '../../../public/mcuk/config.json';
import echopayConfig from '../../../public/echopay/config.json';
import flashConfig from '../../../public/flash/config.json';
import edtechConfig from '../../../public/edtech/config.json';

export const getTenant = () => {

    let tenant = process.env.FIREBASE_PRIVATE_KEY;
    let config;
    let markdownDir;

    switch (tenant) {
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
        case 'flash':
            config = flashConfig;
            markdownDir = process.cwd() + '/public/flash/markdown';
            break;
        default:
            config = nxConfig;
            markdownDir = process.cwd() + '/public/nx/markdown';
            break;
    }
    return {
        tenant,
        config,
        markdownDir
    };
};
