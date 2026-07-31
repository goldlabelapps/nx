'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    Alert,
    Button,
    ButtonBase,
    Chip,
    IconButton,
    Card,
    CardContent,
    CardHeader,
    Box,
    Typography,
} from '@mui/material';
import { navigateTo, Icon } from '../../../../DesignSystem';
import { createSlug } from '../../../../lib';
import { useDispatch } from '../../../../Uberedux';
import { useSubscription, initProspects } from '../../Prospects';
import { useNXAdmin } from '../../../../NXAdmin';

export default function Surface() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { prospects = [], loading } = useSubscription(10);
    const nxAdmin = useNXAdmin();
    const didInit = React.useRef(false);
    const totalDocs = nxAdmin?.prospects?.totalDocs ?? '...';

    // State for random prospect index
    const [randomIdx, setRandomIdx] = React.useState<number | null>(null);

    React.useEffect(() => {
        if (!didInit.current) {
            if (!nxAdmin || !nxAdmin.prospects) {
                dispatch(initProspects());
            }
            didInit.current = true;
        }
    }, [dispatch, nxAdmin]);

    const handleProspectsClick = () => {
        dispatch(navigateTo(router, '/prospects'));
    };

    const handleTagClick = (tag: string) => {
        dispatch(navigateTo(router, `/prospects/tag/${createSlug(tag)}`));
    };

    const handleRandomProspectClick = () => {
        if (randomProspect && randomProspect.id) {
            dispatch(navigateTo(router, `/prospects/${randomProspect.id}`));
        }
    };

    // Handler to re-randomize
    const handleRerandomize = () => {
        if (prospects && prospects.length > 1) {
            let newIdx;
            do {
                newIdx = Math.floor(Math.random() * prospects.length);
            } while (prospects.length > 1 && newIdx === randomIdx);
            setRandomIdx(newIdx);
        } else if (prospects && prospects.length === 1) {
            setRandomIdx(0);
        } else {
            setRandomIdx(null);
        }
    };

    // Pick a random prospect if available
    type Prospect = typeof prospects extends (infer U)[] ? U : any;
    let randomProspect: Prospect | null = null;
    if (prospects && Array.isArray(prospects) && prospects.length > 0) {
        let idx = randomIdx;
        if (idx === null || idx >= prospects.length) {
            idx = Math.floor(Math.random() * prospects.length);
            setRandomIdx(idx);
        }
        randomProspect = prospects[idx];
    }

    return (
        <Card variant="outlined">
            <CardHeader
                title="Prospects"
                subheader={`total ${totalDocs}`}
                avatar={
                    <IconButton onClick={handleProspectsClick} color="primary">
                        <Icon icon="prospects" />
                    </IconButton>
                }
                action={
                    <Button 
                        onClick={handleRerandomize} 
                        color="primary" 
                        title="Show another prospect"
                        endIcon={<Icon icon="random" />}
                    >
                        Random Prospect
                    </Button>
                }
            />
            <CardContent>
                {loading ? (
                    <Typography>prospects...</Typography>
                ) : randomProspect ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                            <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>

                                {randomProspect.linkedin && (
                                    <Button
                                        href={randomProspect.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="outlined"
                                        startIcon={<Icon icon="linkedin" />}
                                    >
                                        LinkedIn
                                    </Button>
                                )}
                                {randomProspect.email && (
                                    <Button
                                        href={`mailto:${randomProspect.email}`}
                                        variant="outlined"
                                        startIcon={<Icon icon="email" />}
                                    >
                                        Email
                                    </Button>
                                )}
                                {randomProspect.companyWebsite && (
                                    <Button
                                        href={randomProspect.companyWebsite}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="outlined"
                                        startIcon={<Icon icon="web" />}
                                    >
                                        Website
                                    </Button>
                                )}
                            </Box>

                        {/* Name and Company, left-aligned */}
                        <ButtonBase
                            onClick={handleRandomProspectClick}
                            sx={{
                                mb: 1,
                                alignItems: 'flex-start',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                textAlign: 'left',
                                width: '100%',
                            }}
                        >
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {randomProspect.name}
                                </Typography>
                                {randomProspect.company && (
                                    <Typography variant="body2" color="text.secondary">{randomProspect.company}</Typography>
                                )}
                            </Box>
                        </ButtonBase>

                            {/* Recommendation */}
                            {randomProspect.recommendation && (
                                <Alert severity="info" sx={{ mt: 0 }}>
                                    <Typography variant="body2">
                                        <Box component="span" sx={{ fontWeight: 700 }}>Recommendation:</Box>{' '}
                                        {randomProspect.recommendation}
                                    </Typography>
                                </Alert>
                            )}

                            {randomProspect.tags && Array.isArray(randomProspect.tags) && randomProspect.tags.length > 0 && (
                                <Box sx={{ my: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {randomProspect.tags.map((tag: string) => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            clickable
                                            onClick={() => handleTagClick(tag)}
                                            variant="outlined"
                                        />
                                    ))}
                                </Box>
                            )}

                            {/* Job Description */}
                            {randomProspect.job && (
                                <Box sx={{ mb: 0 }}>
                                    <Typography variant="body2">{randomProspect.job}</Typography>
                                </Box>
                            )}
                            
                        {/* Main Info */}
                        <Box sx={{ minWidth: 0 }}>
                            {/* Summary */}
                            {randomProspect.summary && (
                                <Typography variant="body2" sx={{  }}>
                                    {randomProspect.summary}
                                </Typography>
                            )}
                            {/* Tags */}
                            
                            
                            {/* Career */}
                            {randomProspect.career && Array.isArray(randomProspect.career) && randomProspect.career.length > 0 && (
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="h6" sx={{ mt: 1 }}>Career</Typography>
                                    {randomProspect.career.map((role: any, idx: number) => (
                                        <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                                            <Box component="span" sx={{ fontWeight: 700 }}>{role.title}</Box> @ {role.company}{' '}
                                            <Box component="span" sx={{ color: 'text.secondary' }}>({role.from} - {role.to})</Box>
                                        </Typography>
                                    ))}
                                </Box>
                            )}
                            
                                {/* Education */}
                                {randomProspect.education && (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="h6" sx={{ mb: 0.5 }}>Education</Typography>
                                        <Typography variant="body2">{randomProspect.education.degree} @ {randomProspect.education.institution}</Typography>
                                        <Typography variant="caption" color="text.secondary">{randomProspect.education.location} ({randomProspect.education.year})</Typography>
                                    </Box>
                                )}


                                

                            
                            
                        </Box>
                    </Box>
                ) : (
                    <Typography>No prospects.</Typography>
                )}
            </CardContent>
        </Card>
    );
}

/*

*/