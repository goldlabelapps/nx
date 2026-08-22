import { formatLanguages } from './formatLanguages';

const normalize = (value?: string) => (value || '').trim().toLowerCase();

const toTitleCase = (value?: string) => {
    if (!value) return '';
    return value
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

export const formatDeviceSummary = (device?: any): string => {
    if (!device) return '';

    const normalizedModel = normalize(device.model);
    const normalizedModelCode = normalize(device.modelCode);
    const model = normalizedModel && normalizedModel === normalizedModelCode
        ? (device.model || device.modelCode || '')
        : (device.model || device.modelCode || '');

    const modelOrPlatform = model || device.platform || '';
    const formFactor = typeof device.isMobile === 'boolean'
        ? (device.isMobile ? 'Mobile' : 'Desktop')
        : '';
    const vendor = device.vendor || '';
    const browser = toTitleCase(device.browser);
    const languageString = device.languages?.length ?
        formatLanguages(device.languages) : '';

    return [
        browser,
        formFactor
    ].filter(Boolean).join(', ');
}