// grab the baseURL from the config
export const getBaseurl = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:2000/api';
    }
    return 'https://nx-admin.goldlabel.pro/api';
};
