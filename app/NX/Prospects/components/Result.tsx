'use client';
import * as React from 'react';
import {
    useTheme,
    useMediaQuery,
    ButtonBase,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import {useRouter} from 'next/navigation';
import {
    Icon,
    navigateTo,
} from '../../DesignSystem';
import {
    useDispatch,
} from '../../Uberedux';

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
    const router = useRouter();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);
    const handleResultClick = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // Helper to fix phone numbers
    function fixPhone(phone: string) {
        return typeof phone === 'string' && phone.startsWith("'+44")
            ? '0' + phone.slice(5)
            : phone;
    }

    return (
        <>
            <ButtonBase sx={{mx:3, width: '100%', textAlign: 'left'}} onClick={handleResultClick}>
                <Box sx={{ pl: 1, width: '100%', borderLeft: `2px solid ${theme.palette.primary.main}` }}>
                    <Typography variant="body1">
                        {result.first_name} {result.last_name}
                    </Typography>
                    <Typography variant="caption">
                        {result.title} at {result.company_name}
                    </Typography>
                </Box>
            </ButtonBase>
            <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose} fullScreen={isMobile}>
                <DialogTitle>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6">
                        {result.first_name} {result.last_name}
                    </Typography>
                    <Typography variant="h6">
                        {result.title}
                    </Typography>
                    <Typography variant="h6">
                        {result.company_name}
                    </Typography>
                    <Typography variant="h6">
                        {fixPhone(result.corporate_phone)}
                    </Typography>
                    <Typography variant="h6">
                        {result.email}
                    </Typography>
                    <Typography variant="h6">
                        {result.person_linkedin_url}
                    </Typography>
                    {/* <Button
                        startIcon={<Icon icon="linkedin" />}
                        onClick={dispatch(navigateTo(result.person_linkedin_url))}
                    >
                        LinkedIn
                    </Button> */}
                    
                </DialogContent>
                <DialogActions>
                    <Button 
                        endIcon={<Icon icon="close" />} 
                        onClick={handleClose} 
                        color="primary"
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

