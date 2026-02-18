export type Severity = 'success' | 'error';

export interface I_MakeRes {
    severity: Severity;
    message: string;
    data?: any;
}

export function makeRes({ severity, message, data }: I_MakeRes) {
    return {
        severity,
        message,
        ...(data !== undefined ? { data } : {})
    };
}