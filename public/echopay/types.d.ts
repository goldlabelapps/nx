export interface I_CompanyOptions {
    id?: string;
    slug?: string;
    markdown?: string;
}

export interface I_NewCompany {
    options?: I_CompanyOptions;
}

export interface I_OldCompany {
    options?: I_CompanyOptions;
}