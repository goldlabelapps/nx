import { getBaseurl } from './getBaseurl';

export const getEndpoints = (name?: string) => {
    const baseURL = getBaseurl();
    const endpoints = [
        {
            name: 'Share',
            description: 'CRUD for the firestore share collection',
            endpoints: [
                {
                    name: 'Read',
                    description: 'Reads docs from Firebase share collection',
                    method: 'GET',
                    path: `${baseURL}/share/`,
                },
                {
                    name: 'Create',
                    description: 'Create a new share doc in firebase',
                    method: 'POST',
                    path: `${baseURL}/share/`,
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
                    endpoints: [
                        {
                            name: 'Logs',
                            path: `${baseURL}/notify/email/logs`,
                        }
                    ]
                },
                {
                    name: 'Push Notification',
                    path: `${baseURL}/notify/push`,
                }
            ]
        },
        {
            private: true,
            name: 'EchoPay',
            path: `${baseURL}/echopay`,
            testslug: 'goldlabel-magento-store'
        },
    ];
    if (name) {
        const found = endpoints.find(e => e.name === name);
        return found || null;
    }
    return { endpoints };
};
