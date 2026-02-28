export type T_Severity = 'success' | 'error' | 'warning' | 'info';

export interface I_MakeRes {
    severity: T_Severity;
    message: string;
    data?: any;
};
