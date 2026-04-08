'use client';
import * as React from 'react';
import type { I_Result, T_ApolloDoc } from '../types';
import {
    Button,
    Container,
    IconButton,
    Tooltip,
    useTheme,
    CircularProgress,
    ButtonBase,
    Typography,
    Box,
    Dialog,
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
    analyse,
    useBus,
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
    const [analysisLoading, setAnalysisLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [copied, setCopied] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const hostname = emailToHostname(result.email as string);
    const prospects = useProspects();
    const flagging = prospects?.flagging;
    const isRatingMap = prospects?.isRating || {};
    const isRating = !!isRatingMap[result.id];
    const bus = useBus(result.id);
    const busLoading = prospects?.[`bus.${result.id}_loading`];
    let analysis = undefined;
    try {
        analysis = bus?.[0]?.completion ? JSON.parse(bus[0].completion) : undefined;
    } catch (e) {
        analysis = bus?.[0]?.completion;
    }
    const hasSummary = typeof analysis === 'object' && analysis !== null && 'summary' in analysis;
    const summary = hasSummary ? analysis.summary : '';
    const score = (typeof analysis === 'object' && analysis !== null && 'prospect_score' in analysis) ? analysis.prospect_score : 0;
    const grade = (typeof analysis === 'object' && analysis !== null && 'prospect_grade' in analysis) ? analysis.prospect_grade : 'Z';

    const recommendation = hasSummary ? analysis.recommendation : 'recommendation';

    // Track previous state for summary loaded detection
    const prevShowAnalyseRef = React.useRef(bus && !hasSummary && !analysisLoading && !busLoading);
    // Alert when summary has loaded (transition from show-analyse to summary present)
    React.useEffect(() => {
        const showAnalyse = bus && !hasSummary && !analysisLoading && !busLoading;
        if (prevShowAnalyseRef.current && !showAnalyse && hasSummary) {
            alert('Summary has loaded!');
        }
        prevShowAnalyseRef.current = showAnalyse;
    }, [bus, hasSummary, analysisLoading, busLoading]);

/* {bus && !hasSummary && !analysisLoading && !busLoading ? ( */

    // Load LLM data when dialog opens and not already loaded
    React.useEffect(() => {
        if (open && !bus) {
            dispatch(require('../../Prospects').bus(result.id));
        }
    }, [open, bus, dispatch, result.id]);

    React.useEffect(() => {
        if (analysisLoading && (hasSummary || analysis)) {
            setAnalysisLoading(false);
            // Force refresh the bus data for this prospect
            dispatch(require('../../Prospects').bus(result.id));
        }
    }, [analysis, hasSummary, analysisLoading, dispatch, result.id]);

    

    const handleEmail = () => {
        console.log("Email clicked for", result.first_name, result.last_name);
    }

    const handleResultClick = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAnalyse = () => {
        setAnalysisLoading(true);
        dispatch(analyse(result as T_ApolloDoc));
    };

    const handleHide = () => {
        dispatch(hideProspect(result.id, !result.hide, `${result.first_name} ${result.last_name} deleted`));
        handleClose();
    }

    const handleFlag = () => {
        const newFlag = !result.flag;
        dispatch(flagProspect(result.id, newFlag, `${result.first_name} ${result.last_name} updated`));
    }

    const handleLinkedin = () => {
        dispatch(navigateTo(router, result.person_linkedin_url, '_blank'));
    };

    const handleWebsite = () => {
        dispatch(navigateTo(router, emailToTldUrl(result.email as string), '_blank'));
    };

    return (
        <>
            <ButtonBase sx={{width: '100%', textAlign: 'left'}} onClick={handleResultClick}>
                <Box sx={{ 
                    pl: 1, 
                    py: 0.25, 
                    width: '100%', 
                    borderLeft: `2px solid ${theme.palette.primary.main}`,
                }}>
                    <Box sx={{display: 'flex'}}>
                        <Box sx={{ display: 'block', }}>
                            <Typography variant="body1">
                                {result.first_name} {result.last_name}
                            </Typography>
                            <Typography 
                                variant="body2"
                            >
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
                fullScreen={true}>
                <Container maxWidth="md">
                    <DialogActions>
                        <IconButton
                            onClick={handleHide}
                            color="primary"
                        >
                            <Icon icon="archive" />
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
                                <Icon icon="save" />
                            </IconButton>
                        )}
                        <IconButton
                            onClick={handleClose}
                            color="primary"
                        >
                            <Icon icon="close" />
                        </IconButton>
                        
                    </DialogActions>
                        
                    <DialogContent>

                        <CardHeader
                            sx={{ mx: -2 }}
                            title={`${result.first_name} ${result.last_name}`}
                            subheader={result.title}
                        />

                        <Typography variant="body1">
                            {result.company_name}
                        </Typography>
                        <Typography variant="body1">
                            {fixPhone(result.corporate_phone)}
                        </Typography>
                        


                        <Grid container spacing={1}>
                            <Grid size={{ xs: 12, sm: 5 }}>
                                <Box sx={{ mb: { xs: 2, md: 0 } }}>
                                    
                                    
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


                        {hasSummary && (
                            <>
                                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ minWidth: 75 }}>
                                        <Typography variant="h3">
                                            {`${Math.round(score)}%`}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={score}
                                            color="primary"

                                        />
                                    </Box>
                                </Box>
                            </>
                        )}

                        {hasSummary && (
                            <Box sx={{ my: 0 }}>
                                
                                <Typography variant="body1" sx={{ my: 2 }}>
                                    {summary}
                                </Typography>
                                <Typography variant="body1" sx={{ my: 2 }}>
                                    {recommendation}
                                </Typography>

                            </Box>
                        )}


                        {/* Only show Analyse button if there is no summary and not loading. Show loading text if loading and button is hidden. */}
                        {bus && !hasSummary && !analysisLoading && !busLoading ? (
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleAnalyse}
                                startIcon={<Icon icon="google" />}
                                sx={{my:3}}
                            >
                                Analyse
                            </Button>
                        ) : null}
            
                        {isRating && (
                            <Box sx={{ my: 2, width: '100%' }}>
                                <LinearProgress color="primary" />
                                <Typography variant="body2" sx={{ my: 2, }} color="primary">
                                    Analysing prospect with Gemini...
                                </Typography>
                            </Box>
                        )}
                        
                    </DialogContent>
                </Container>
            </Dialog>
        </>
    );
}
