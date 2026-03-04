export type T_Severity = 'success' | 'error' | 'warning' | 'info';

export interface I_MakeRes {
    severity: T_Severity;
    message: string;
    data?: any;
    other?: any;
}

export type T_Email = {
    from: {
        label: string;
        email: string;
    },
    to: {
        label: string;
        email: string;
    }
    subject: string;
    body: string; // Markdown or HTML content?  
    template?: string;

};