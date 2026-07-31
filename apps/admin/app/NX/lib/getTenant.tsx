import nxadminConfig from '../../../public/nxadmin/config.json';

export const getAppConfig = () => {
    return {
        config: nxadminConfig,
        markdownDir: process.cwd() + '/public/nxadmin/markdown',
    };
};

// Backward-compatible alias while the codebase migrates off tenant naming.
export const getTenant = getAppConfig;
