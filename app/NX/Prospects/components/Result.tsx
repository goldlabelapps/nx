'use client';
import * as React from 'react';
import {
    Box,
    Typography,
    IconButton,
    Link,
    Chip,
    Stack,
    Paper,
} from '@mui/material';
import {
    Icon,
} from '../../DesignSystem';

export interface I_Result {
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

interface ResultProps {
    result: I_Result;
}

export default function Result({ result }: ResultProps) {
    const handleResultClick = () => {
        // Handle click event, e.g., navigate to a detail page or open a modal
        console.log('Result clicked:', result);
    };
    
    return (
        <Paper variant='outlined' sx={{ p:1 }}>
            <Typography variant="h6">
                {result.first_name} {result.last_name}
            </Typography>
            <Typography variant="subtitle1">
                {result.company_name}
            </Typography>
            <Typography variant="body2">
                {result.email}
            </Typography>
            <Chip label={result.title} size="small" color="primary" />
            {result.person_linkedin_url && (
                <Typography variant="body2">
                    <Link href={result.person_linkedin_url} target="_blank" rel="noopener">
                        LinkedIn
                    </Link>
                    <Icon icon="linkedin" />
                </Typography>
            )}
            {result.corporate_phone && (
                <Typography variant="body2">
                    {result.corporate_phone}
                </Typography>
            )}
        </Paper>
    );
}

