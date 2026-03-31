export type T_ApolloDoc = {
    id: number;
    first_name: string;
    last_name: string;
    title: string;
    company_name: string;
    email: string;
    email_status: string;
    primary_email_source: string;
    primary_email_verification_source: string;
    email_confidence: string;
    primary_email_catchall_status: string;
    primary_email_last_verified_at: string;
    seniority: string;
    sub_departments: string;
    work_direct_phone: string;
    home_phone: string;
    mobile_phone: string;
    corporate_phone: string;
    other_phone: string;
    do_not_call: string;
    lists: string;
    person_linkedin_url: string;
    country: string;
    subsidiary_of: string;
    subsidiary_of_organization_id: string;
    tertiary_email: string;
    tertiary_email_source: string;
    tertiary_email_status: string;
    tertiary_email_verification_source: string;
    primary_intent_topic: string;
    primary_intent_score: string;
    secondary_intent_topic: string;
    secondary_intent_score: string;
    qualify_contact: string;
    cleaned: string;
    search_vector: string;
}

export interface I_Result {
    result: T_ApolloDoc;
}