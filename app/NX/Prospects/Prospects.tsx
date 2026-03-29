'use client';
import type { T_Config } from '../types';
import * as React from 'react';
import {
    Container,
    CircularProgress,
    Box,
    Alert,
    Button,
    Grid,
} from '@mui/material';
import {
    Search,
    Selecta,
    useProspects,
    initProspects,
    updateQuery,
    resetQuery,
    Result,
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
    const results = state?.results;

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
            <Container maxWidth="xs" sx={{ my: 4 }}>
            <Alert severity="info" sx={{ my: 2 }}>
                {state.error}
            </Alert>
            </Container>
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
            <Grid container spacing={2} sx={{ mx: 1, mb: 2 }}>
                <Grid size={{ xs: 12}}>
                    <Search />
                </Grid>
                {/*

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
                </Grid> */}
                {Array.isArray(results) && results.length > 0 && results.map((result, idx) => (
                    <Grid key={result.id || idx} size={{ xs: 12, sm: 6 }}>
                        <Result result={result} />
                    </Grid>
                ))}
            </Grid>
                
        </>
    );
}
/*

*/