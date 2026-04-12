import { getBaseurl } from './getBaseurl';

export const getEndpoints = (name?: string) => {
    const baseURL = getBaseurl();
    const endpoints = [
        {
            name: 'Markdown',
            description: 'Upload, fetch and delete markdown files',
            path: `${baseURL}/markdown`,
            endpoints: [
                {
                    name: 'Get Markdown by Slug',
                    endpoint: `${baseURL}/api/markdown?slug=%2Ffeatures`,

                    // /api/markdown?slug=%2Ffeatures
                    method: 'GET',
                },
            ]
        }
    ];
    if (name) {
        const found = endpoints.find(e => e.name === name);
        return found || null;
    }
    return { endpoints };
};
