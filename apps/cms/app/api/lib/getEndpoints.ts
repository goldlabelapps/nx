// import { getBaseurl } from './getBaseurl';

export const getEndpoints = (name?: string) => {
    // const baseURL = getBaseurl();
    const endpoints = [
        {
            name: 'Prompt° endpoint',
            route: `/api/prompt`,
        }
    ];
    if (name) {
        const found = endpoints.find(e => e.name === name);
        return found || null;
    }
    return endpoints;
};
