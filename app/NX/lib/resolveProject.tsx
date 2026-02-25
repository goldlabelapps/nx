import type { T_ProjectSlug } from '../types';

import nxConfig from '../../../public/nx/config.json';
import mcukConfig from '../../../public/mcuk/config.json';
import echopayConfig from '../../../public/echopay/config.json';
import akiConfig from '../../../public/aki/config.json';
import flashConfig from '../../../public/flash/config.json';
import edtechConfig from '../../../public/edtech/config.json';

export const resolveProject = (projectSlug: T_ProjectSlug) => {

    let config;
    let markdownDir;
    switch (projectSlug) {
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
        case 'aki':
            config = akiConfig;
            markdownDir = process.cwd() + '/public/aki/markdown';
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
        projectSlug,
        config,
        markdownDir
    };
};
