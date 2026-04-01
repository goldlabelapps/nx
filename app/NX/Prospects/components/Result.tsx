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
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    DialogActions,
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
    Prompt,
    updateQuery,
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

export default function Result({ result, autoOpen }: I_Result & { autoOpen?: boolean }) {
    
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
                        avatar={<Icon icon="company" color="primary" />}
                        sx={{mx:-2}}
                        action={<IconButton
                            onClick={handleClose}
                            color="primary"
                        >
                            <Icon icon="close" />
                        </IconButton>}
                        title={result.company_name}
                        subheader={result.title}
                    />
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={1}>        
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <List dense>
                                <ListItemButton onClick={handleLinkedin}>
                                    <ListItemIcon>
                                        <Icon icon="linkedin" color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary="LinkedIn Profile" />
                                </ListItemButton>
                                <ListItemButton onClick={handleWebsite}>
                                    <ListItemIcon>
                                        <Icon icon="link" color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary="Website" />
                                </ListItemButton>
                                <ListItemButton onClick={e => {
                                    navigator.clipboard.writeText(result.email);
                                    setCopied(true);
                                    setAnchorEl(e.currentTarget);
                                    setTimeout(() => {
                                        setCopied(false);
                                        setAnchorEl(null);
                                    }, 1500);
                                }}>
                                    <ListItemIcon>
                                        <Icon icon="copy" color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={result.email} />
                                </ListItemButton>
                            </List>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="h6">
                                {`${result.first_name} ${result.last_name}`}
                            </Typography>
                            <Typography variant="body1">
                                {fixPhone(result.corporate_phone)}
                            </Typography>
                        </Grid>
                    </Grid>
                    
                </DialogContent>
                <DialogActions>
                    <Prompt result={result} />
                </DialogActions>
            </Dialog>
        </>
    );
}
