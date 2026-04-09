export interface I_Result {
    result: I_Prospect;
}

export interface I_Prospect {
    id: number;
    name?: string | null;
    flag?: boolean | null;
    hide?: boolean | null;
    first_name?: string | null;
    last_name?: string | null;
    title?: string | null;
    company?: string | null;
    email?: string | null;
    email_status?: string | null;
    source?: string | null;
    sell_by_date?: string | null;
    seniority?: string | null;
    department?: string | null;
    phone?: string | null;
    lists?: string | null;
    linkedin?: string | null;
    country?: string | null;
    search_vector?: unknown;
}


