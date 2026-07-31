import nxadminConfig from '../../../public/nxadmin/config.json';

export const getAppConfig = () => {
    return {
        config: nxadminConfig,
        markdownDir: process.cwd() + '/public/nxadmin/markdown',
    };
};
