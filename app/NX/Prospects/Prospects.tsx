'use client';
import type { T_Config } from '../types';
import * as React from 'react';
import {
    Typography,
    Container,
    CircularProgress,
    Box,
    Alert,
    Grid,
    Pagination,
} from '@mui/material';
import {
    useDispatch,
} from '../Uberedux';
import {
    useProspects,
    initProspects,
    Result,
    updateQuery,
    searchProspects,
    normaliseForChipSelect,
    useTable,
} from '../Prospects';

export interface I_Prospects {
    config: T_Config;
    children?: React.ReactNode;
};

export default function Prospects({
    config,
}: I_Prospects) {

    const dispatch = useDispatch();
    const table = useTable();
    const state = useProspects();
    const loading = state?.loading;
    const results = state?.results;
    const initialData = state?.initialData;
    const pagination = state?.pagination;

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(updateQuery({ page: value }));
        dispatch(searchProspects());
    };
        
    React.useEffect(() => {
        if (!state) {
            dispatch(initProspects());
            const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
            const searchParam = params?.get('search');
            if (searchParam) {
                setTimeout(() => {
                    dispatch(updateQuery({ search: searchParam }));
                    dispatch(searchProspects());
                }, 333);
            }
        }
    }, [state, dispatch]);

    if (loading) return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '75vh',
            }}
        >
            <CircularProgress />
        </Box>
    );

    if (state?.error) {
        return (
            <Container maxWidth="md" sx={{ my: 4 }}>
                <Alert severity="warning" sx={{ my: 2 }}>
                    {state.error}
                </Alert>
            </Container>
        );
    }

    return (
        <>
            <Container maxWidth="lg" sx={{ my: 0 }}>
                <Box sx={{ 
                    // mt: '125px',
                 }}>
                    {/* Pagination */}
                    {pagination && pagination.pages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}>
                            <Pagination
                                sx={{mb:4}}
                                size="small"
                                count={pagination.pages}
                                page={pagination.page}
                                onChange={handlePageChange}
                                color="primary"
                                shape="rounded"
                            />
                        </Box>
                    )}

                    {Array.isArray(results) && results.length > 0 ? (
                        <Grid container spacing={2}>
                            {results.map((result, idx) => (
                                <Grid key={result.id || idx} size={{ xs: 12, sm: 6 }}>
                                    <Result result={result} autoOpen={idx === 0} />
                                </Grid>
                            ))}
                        </Grid>
                    ) : Array.isArray(table) && table.length > 0 ? (
                        <Grid container spacing={2}>
                            {table.map((row, idx) => (
                                <Grid key={row.id || idx} size={{ xs: 12, sm: 6 }}>
                                    <Result result={row} autoOpen={idx === 0} />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Box sx={{ textAlign: 'center', color: 'text.secondary', py: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Finding prospects...
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Container>
            {/* <pre>total {JSON.stringify(initialData?.total, null, 2)}</pre> */}
        </>
    );
}


/*
<Grid container spacing={2}>

                            <Grid size={{ xs: 12 }}>
                                <Box sx={{ mx: 1, mt: 1 }}>
                                    <Search />
                                </Box>
                            </Grid>
                            
                            <Grid size={{ xs: 6 }}>
                                <ChipSelect
                                    icon="seniority"
                                    label="Seniority"
                                    list={seniorityOptions}
                                    value={query?.level || null}
                                    onChange={value => dispatch(updateQuery({ seniority: value }))}
                                />
                            </Grid>

                            <Grid size={{ xs: 6 }}>
                                <ChipSelect
                                    icon="company"
                                    label="Department"
                                    list={departmentOptions}
                                    value={query?.department || null}
                                    onChange={value => dispatch(updateQuery({ department: value }))}
                                />
                            </Grid>

                            

                        </Grid>

                                    <AppBar position="fixed" sx={{ 
                background: theme.palette.background.default, 
                boxShadow:0, 
                mt: '60px' 
            }}>
                <Toolbar>
                    <Container maxWidth="lg" sx={{ my: 3 }}>

                        
                    </Container>
                </Toolbar>
            </AppBar>   

*/