'use client';
import * as React from 'react';
import Link from 'next/link';
import type { I_Result } from '../types';
import {
    IconButton,
    Tooltip,
    useTheme,
    useMediaQuery,
    ButtonBase,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    CardHeader,
    DialogContent,
    DialogActions,
    Button,
    Grid,
} from '@mui/material';
import {useRouter} from 'next/navigation';
import {
    Icon,
    navigateTo,
} from '../../DesignSystem';
import {
    useDispatch,
} from '../../Uberedux';
import {
    setProspects,
    addToBasket,
} from '../../Prospects'

// Helper to get TLD URL from email
function emailToTldUrl(email: string): string {
    if (typeof email !== 'string') return '';
    const match = email.match(/@([\w.-]+)/);
    if (!match) return '';
    return `https://${match[1]}`;
}

// Helper to fix phone numbers
function fixPhone(phone: string) {
    return typeof phone === 'string' && phone.startsWith("'+44")
        ? '0' + phone.slice(5)
        : phone;
}

export default function Result({ result }: I_Result) {
    
    const dispatch = useDispatch();
    const theme = useTheme();
    const router = useRouter();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);
    const [copied, setCopied] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    
    const handleAddToBasket = () => {
        setOpen(false);
        dispatch(setProspects('basketOpen', true));
        dispatch(addToBasket(result));
    }

    const handleResultClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLinkedin = () => {
        dispatch(navigateTo(router, result.person_linkedin_url, '_blank'));
    };

    const handleWebsite = () => {
        dispatch(navigateTo(router, emailToTldUrl(result.email as string), '_blank'));
    };

    return (
        <>
            <ButtonBase sx={{mx:1, width: '100%', textAlign: 'left'}} onClick={handleResultClick}>
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
                    <CardHeader 
                        sx={{mx:-2}}
                        action={<Button
                            startIcon={<Icon icon="left" />}
                            onClick={handleClose}
                            color="primary"
                        >
                            Back
                        </Button>}
                        title={result.company_name}
                        subheader={`${result.first_name} ${result.last_name}`}
                    />
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="h6">
                                {result.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography
                                    variant="caption"
                                    component="a"
                                    href={`mailto:${result.email}`}
                                    sx={{ color: 'primary.main', textDecoration: 'underline' }}
                                >
                                    {result.email}
                                </Typography>
                                <Tooltip title={copied ? 'Copied!' : 'Copy email'} open={Boolean(anchorEl)} disableFocusListener disableHoverListener disableTouchListener>
                                    <IconButton
                                        size="small"
                                        onClick={e => {
                                            navigator.clipboard.writeText(result.email);
                                            setCopied(true);
                                            setAnchorEl(e.currentTarget);
                                            setTimeout(() => {
                                                setCopied(false);
                                                setAnchorEl(null);
                                            }, 1500);
                                        }}
                                        aria-label="Copy email"
                                    >
                                        <Icon icon="copy" color="primary" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            
                        </Grid>
                        
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="body1">
                                {fixPhone(result.corporate_phone)}
                            </Typography>
                            <Button
                                startIcon={<Icon icon="linkedin" />}
                                onClick={handleLinkedin}
                            >
                                LinkedIn
                            </Button>

                            <Button
                                startIcon={<Icon icon="link" />}
                                onClick={handleWebsite}
                            >
                                Website
                            </Button>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Button
                                fullWidth
                                variant='contained'
                                startIcon={<Icon icon="shop" />}
                                onClick={handleAddToBasket}
                            >
                                Add to basket
                            </Button>
                        </Grid>
                    </Grid>
                    
                </DialogContent>
            </Dialog>
        </>
    );
}

