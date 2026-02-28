import { getBaseurl } from './getBaseurl';

export const getEndpoints = (name?: string) => {
    const baseURL = getBaseurl();
    const endpoints = [
        {
            name: 'Notify',
            description: 'Handles all channels of notification and logging',
            path: `${baseURL}/notify`,
            subroutines: [
                {
                    name: 'Email',
                    path: `${baseURL}/notify/email`,
                    subroutines: [
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
        },
    ];
    if (name) {
        const found = endpoints.find(e => e.name === name);
        return found || null;
    }
    return { endpoints };
};
