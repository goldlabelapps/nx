// grab the baseURL from the config
export const getBaseurl = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:1999/api';
    }
    return 'https://goldlabel.pro/api';
};
