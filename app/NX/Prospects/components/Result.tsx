'use client';
import * as React from 'react';
import {
    useTheme,
    ButtonBase,
    Typography,
    Box,
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
    const theme = useTheme();
    const handleResultClick = () => {
        // Handle click event, e.g., navigate to a detail page or open a modal
        console.log('Result clicked:', result);
    };
    
    return (
        <ButtonBase sx={{width: '100%', textAlign: 'left'}} onClick={handleResultClick}>
            <Box sx={{ pl: 1, width: '100%', borderLeft: `3px solid ${theme.palette.primary.main}` }}>
                <Typography variant="body1">
                    {result.first_name} {result.last_name}
                </Typography>
                <Typography variant="body2">
                    {result.title} at {result.company_name}
                </Typography>
            </Box>
        </ButtonBase>
    );
}

