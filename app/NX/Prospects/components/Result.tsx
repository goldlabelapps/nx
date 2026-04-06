'use client';
import * as React from 'react';
import type { I_Result, T_ApolloDoc } from '../types';
import {
    IconButton,
    Tooltip,
    useTheme,
    useMediaQuery,
    CircularProgress,
    Button,
    ButtonBase,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    CardHeader,
    DialogContent,
    DialogActions,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    LinearProgress,
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
    hideProspect,
    flagProspect,
    useProspects,
    rateProspect,
} from '../../Prospects'


function emailToTldUrl(email: string): string {
    if (typeof email !== 'string') return '';
    const match = email.match(/@([\w.-]+)/);
    if (!match) return '';
    return `https://${match[1]}`;
}

function emailToHostname(email: string): string {
    if (typeof email !== 'string') return '';
    const match = email.match(/@([\w.-]+)/);
    if (!match) return '';
    return `${match[1]}`;
}

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
    const hostname = emailToHostname(result.email as string);
    const prospects = useProspects();
    const flagging = prospects?.flagging;
    const ratings = prospects?.ratings || {};
    const isRatingMap = prospects?.isRating || {};
    const isRating = !!isRatingMap[result.id];
    const rating = ratings[result.id];
    let parsedCompletion = null;
    if (rating && rating.data && rating.data.completion) {
        try {
            parsedCompletion = JSON.parse(rating.data.completion);
            // eslint-disable-next-line no-console
            // console.log('Parsed completion:', parsedCompletion);
        } catch (e) {
            // eslint-disable-next-line no-console
            // console.error('Failed to parse completion JSON:', e, rating.data.completion);
        }
    }
    const ratingProspect = prospects?.ratingProspect;
    
    // console.log('ratingProspect', ratingProspect);
    // console.log('rating', rating);

    const handleResultClick = () =>  setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAutoRate = () => {
        dispatch(rateProspect(result as T_ApolloDoc));
    };

    const handleEmail = () => {
        console.log("Email clicked for", result.first_name, result.last_name);
    }
    
    const handleHide = () => {
        dispatch(hideProspect(result.id, !result.hide, `${result.first_name} ${result.last_name} hidden`));
        handleClose();
    }

    const handleFlag = () => {
        const newFlag = !result.flag;
        const actionText = newFlag ? 'flagged' : 'unflagged';
        dispatch(flagProspect(result.id, newFlag, `${result.first_name} ${result.last_name} ${actionText}`));
    }

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
                    <Box sx={{display: 'flex'}}>

                        <Box sx={{ display: 'block' }}>
                            <Typography variant="body1">
                                {result.first_name} {result.last_name}
                            </Typography>
                            <Typography variant="caption">
                                {result.title} at {result.company_name}
                            </Typography>
                        </Box>

                        {(!!result.flag) && (
                            <Box sx={{ ml: 1, mt: 2 }}>
                                <Icon icon="flagon" color="primary" />
                            </Box>
                        )}
                    </Box>
                </Box>
            </ButtonBase>
            <Dialog 
                fullWidth 
                maxWidth="sm" 
                open={open} 
                onClose={handleClose} 
                fullScreen={isMobile}>
                <DialogTitle>
                    <CardHeader 
                        sx={{mx:-2}}
                        title={`${result.first_name} ${result.last_name}`}
                        subheader={result.title}
                        action={<>
                            <IconButton
                                onClick={handleHide}
                                color="primary"
                            >
                                <Icon icon="hide" />
                            </IconButton>
                            {flagging ? (
                                <IconButton>   
                                    <CircularProgress size={24} color="primary" />
                                </IconButton>   
                            ) : (
                                <IconButton
                                    onClick={handleFlag}
                                    color="primary"
                                >
                                    <Icon icon={!!result.flag ? "flagon" : "flagoff"} />
                                </IconButton>
                            )}
                            
                            <IconButton
                                onClick={handleClose}
                                color="primary"
                            >
                                <Icon icon="close" />
                            </IconButton>
                        </>
                        }
                        
                    />
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid size={{ xs: 12, sm: 5 }}>
                            <Box sx={{ mb: { xs: 2, md: 0 } }}>
                                <Typography variant="body1">
                                    {result.company_name}
                                </Typography>
                                <Typography variant="body1">
                                    {fixPhone(result.corporate_phone)}
                                </Typography>
                            </Box>
                        </Grid>        
                        <Grid size={{ xs: 12, sm: 7 }}>
                            <List dense disablePadding>
                                <ListItemButton onClick={handleLinkedin}>
                                    <ListItemIcon>
                                        <Icon icon="linkedin" color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary="Profile" />
                                </ListItemButton>
                                <ListItemButton onClick={handleWebsite}>
                                    <ListItemIcon>
                                        <Icon icon="link" color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={hostname} />
                                </ListItemButton>
                                <Tooltip
                                    open={copied}
                                    title="Copied!"
                                    placement="bottom"
                                    arrow
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    PopperProps={{ 
                                        anchorEl: anchorEl ? { getBoundingClientRect: () => anchorEl.getBoundingClientRect(), 
                                        clientWidth: anchorEl.clientWidth } : undefined
                                    }}
                                >
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
                                            <Icon icon="email" color="primary" />
                                        </ListItemIcon>
                                        <ListItemText primary={result.email} />
                                    </ListItemButton>
                                </Tooltip>
                            </List>
                        </Grid>
                    </Grid>


                    {isRating && (
                        <Box sx={{ my: 2 }}>
                            <Typography variant="body2" sx={{ mb: 1, textAlign: 'center' }} color="primary">
                                Analysing this prospect with AI... Please wait for a commercial summary and score.
                            </Typography>
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress color="primary" />
                            </Box>
                        </Box>
                    )}
{/*                     
                    <pre>rating?: {JSON.stringify(ratingProspect, null, 2)}</pre>
                    <pre>parsedCompletion: {JSON.stringify(parsedCompletion, null, 2)}</pre> */}
                    {parsedCompletion && (
                        <Box>
                            <Typography variant="subtitle1">Prospect Analysis</Typography>

                            <Typography variant="body2" sx={{ mb: 1 }}><b>Prospect Score:</b> {parsedCompletion.prospect_score}</Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}><b>Prospect Grade:</b> {parsedCompletion.prospect_grade}</Typography>

                            <Typography variant="body2" sx={{ mb: 1 }}><b>Seniority Level:</b> {parsedCompletion.seniority_level}</Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}><b>Decision Power:</b> {parsedCompletion.decision_power}</Typography>
                            
                            <Typography variant="body2" sx={{ mb: 1 }}><b>Recommendation:</b> {parsedCompletion.recommendation}</Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}><b>Summary:</b> {parsedCompletion.summary}</Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}><b>Role Inference:</b> {parsedCompletion.role_inference}</Typography>
                            
                            <Typography variant="body2" sx={{ mb: 1 }}><b>Key Priorities:</b> {parsedCompletion.key_priorities && parsedCompletion.key_priorities.length > 0 ? parsedCompletion.key_priorities.join(', ') : 'N/A'}</Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}><b>Likely Pain Points:</b> {parsedCompletion.likely_pain_points && parsedCompletion.likely_pain_points.length > 0 ? parsedCompletion.likely_pain_points.join(', ') : 'N/A'}</Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}><b>Intent Alignment:</b> {parsedCompletion.intent_alignment}</Typography>
                        </Box>
                    )}


                </DialogContent>
                <DialogActions>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<Icon icon="star" />}
                        onClick={handleAutoRate}
                        disabled={isRating}
                    >
                        Auto Analyse
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
