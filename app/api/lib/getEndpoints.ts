import { getBaseurl } from './getBaseurl';

export const getEndpoints = (name?: string) => {
    const baseURL = getBaseurl();
    const endpoints = [
        {
            name: 'Avatars',
            description: 'Handles uploading, fetching and deleting of user avatars',
            path: `${baseURL}/avatars`,
            endpoints: [
                {
                    name: 'Email',
                    path: `${baseURL}/avatars/uplolad`,
                    methos: 'POST',
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
                    path: `${baseURL}/notify/email`,
                    methos: 'POST',
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
