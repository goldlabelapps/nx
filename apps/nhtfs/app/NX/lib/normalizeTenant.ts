const DEFAULT_TENANT = 'nx';

export function normalizeTenant(tenant?: string) {
    const value = tenant?.trim() || process.env.NEXT_PUBLIC_TENANT?.trim() || DEFAULT_TENANT;

    if (value === 'free') {
        return DEFAULT_TENANT;
    }

    return value;
}