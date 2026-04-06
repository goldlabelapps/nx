'use client';
import type { T_Config } from '../types';
import * as React from 'react';
import {
    Button,
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
    Icon,
} from '../DesignSystem';
import Search from './components/Search';
import {
    useProspects,
    initProspects,
    Result,
    updateQuery,
    searchProspects,
    useTable,
} from '../Prospects';

export interface I_Prospects {
    children?: React.ReactNode;
};

export default function Prospects({
    children,
}: I_Prospects) {

    const dispatch = useDispatch();
    const table = useTable();
    const state = useProspects();
    const loading = state?.loading;
    const results = state?.results;
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
            } else {
                // No search param, load page 1 of unmodified query
                dispatch(searchProspects());
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
                <Alert severity="warning" sx={{ my: 2 }}
                    action={
                        <Button
                            startIcon={<Icon icon="reset" />}
                            variant="outlined"
                            color="primary"
                            onClick={() => window.location.reload()}
                        >
                            Retry
                        </Button>
                    }
                >
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

                    <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 2}}>
                        <Search label="Search" />
                        {pagination && pagination.pages > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}>
                                <Pagination
                                    sx={{ mb: 4 }}
                                    size="small"
                                    count={pagination.pages}
                                    page={pagination.page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    shape="rounded"
                                />
                            </Box>
                        )}
                        
                    </Box>

                    
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
