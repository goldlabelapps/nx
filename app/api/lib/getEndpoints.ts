import { getBaseurl } from './getBaseurl';

export const getEndpoints = (name?: string) => {
    const baseURL = getBaseurl();
    const endpoints = [
        {
            name: 'Avatars',
            description: 'Upload, fetch and delete avatars',
            path: `${baseURL}/avatars`,
            endpoints: [
                {
                    name: 'Upload',
                    endpoint: `${baseURL}/avatars/upload`,
                    method: 'POST',
                },
            ]
        },
        {
            name: 'Notify',
            description: 'Handles all channels of notification and logging',
            path: `${baseURL}/notify`,
            endpoints: [
                {
                    name: 'Email',
                    endpoint: `${baseURL}/notify/email`,
                    method: 'POST',
                },
            ]
        },
    ];
    if (name) {
        const found = endpoints.find(e => e.name === name);
        return found || null;
    }
    return { endpoints };
};
