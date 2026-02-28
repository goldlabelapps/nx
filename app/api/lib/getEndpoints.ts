import { getBaseurl } from '../';

export const getEndpoints = (name?: string) => {
    const baseURL = getBaseurl();
    const endpoints = [
        {
            name: 'Notify',
            path: `${baseURL}/notify`,
            subroutines: [
                {
                    name: 'Email',
                    path: `${baseURL}/notify/email`,
                    private: true
                },
                {
                    name: 'SMS',
                    path: `${baseURL}/notify/sms`,
                    private: true
                },
                {
                    name: 'Push Notification',
                    path: `${baseURL}/notify/push`,
                    private: true
                }
            ]
        },
        {
            name: 'EchoPay',
            private: true,
            path: `${baseURL}/echopay`,
        },
    ];
    if (name) {
        const found = endpoints.find(e => e.name === name);
        return found || null;
    }
    return { endpoints };
};
