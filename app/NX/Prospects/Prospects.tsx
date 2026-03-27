'use client';
import type { T_Config } from '../types';
import * as React from 'react';
import {
    CircularProgress,
    Box,
    Alert,
    Button,
    IconButton,
    CardActions,
    Grid,
    Card,
} from '@mui/material';
import {
    Search,
    Selecta,
    useProspects,
    initProspects,
    updateQuery,
    resetQuery,
} from '../Prospects';
import {
    Icon,
} from '../DesignSystem';
import {
    useDispatch,
} from '../Uberedux';

export interface I_Prospects {
    config: T_Config;
    children?: React.ReactNode;
};

export default function Prospects({
    config,
}: I_Prospects) {

    const dispatch = useDispatch();
    const state = useProspects();
    const loading = state?.loading;
    const initialData = state?.initialData;
    const query = state?.query;

    const handleReset = () => {
        // To reset/clear the query, pass an empty object
        dispatch(resetQuery());
    }

    const handleTingClick = () => {
        // Correct usage: pass an object with the query part
        dispatch(updateQuery({ ting: 'New Ting' }));
    }

    // Helper to slugify a string
    const slugify = (str: unknown) =>
        String(str)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

    // Handles both the nested and flat string cases, and sorts by count if available

    React.useEffect(() => {
        if (!state) dispatch(initProspects());
    }, [state, dispatch]);

    if (loading) return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '70vh',
            }}
        >
            <CircularProgress />
        </Box>
    );

    if (state?.error) {
        return (
            <Alert severity="error" sx={{ my: 2 }}>
                {state.error}
            </Alert>
        );
    }


    // Helper to flatten and combine label/count for any prop
    // For new structure: groups.level, groups.job, groups.lane
    const flattenLabelCount = (rawArr: any[]) =>
        (rawArr || []).map((item: any, idx: number) => {
            if (typeof item === 'object' && typeof item.label === 'string') {
                return item.label;
            }
            return typeof item === 'string' ? item : String(item ?? '');
        });

    const rawLevels: string[] = flattenLabelCount(initialData?.groups?.level?.list);
    const rawJobs: string[] = flattenLabelCount(initialData?.groups?.job?.list);
    const rawLanes: string[] = flattenLabelCount(initialData?.groups?.lane?.list);
    // Map to correct type for Selecta, ensure unique and non-empty values
    const makeSelectaList = (arr: string[]) =>
        arr.map((label: string, idx: number) => {
            let safeLabel = label && typeof label === 'string' ? label : `Item ${idx + 1}`;
            let value = slugify(safeLabel);
            if (!value) value = `item-${idx}`;
            return {
                label: safeLabel,
                value,
            };
        }).slice(0, 10);

    const levelList = makeSelectaList(rawLevels);
    const jobList = makeSelectaList(rawJobs);
    const laneList = makeSelectaList(rawLanes);

    return (
        <>
            <Box sx={{display: 'flex'}}>
                
                
                
                {/* <Box>
                    <IconButton
                        size='small'
                        onClick={handleTingClick}>
                        <Icon icon="ting" />
                    </IconButton>
                </Box> */}
                <Box>
                    
                </Box>
            </Box>

            <Grid container spacing={4} sx={{ mx: 1 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Search />
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <Selecta
                        label="by Job"
                        list={jobList}
                        value={query?.job || null}
                        onChange={value => dispatch(updateQuery({ job: value }))}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Selecta
                        label="by Level"
                        list={levelList}
                        value={query?.level || null}
                        onChange={value => dispatch(updateQuery({ level: value }))}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Selecta
                        label="by Lane"
                        list={laneList}
                        value={query?.lane || null}
                        onChange={value => dispatch(updateQuery({ lane: value }))}
                    />
                </Grid>
            </Grid>
                
                
            <CardActions>
                <Button
                    variant="outlined"
                    startIcon={<Icon icon="reset" />}
                    onClick={handleReset}
                >   
                    Reset Query
                </Button>
                {/* <IconButton
                    size='small'
                    onClick={handleReset}>
                    <Icon icon="reset" />
                </IconButton> */}
            </CardActions>
        
            {/* <pre>
                query: {JSON.stringify(query, null, 2)}
            </pre> */}
        </>
    );
}
/*
*/