'use client';
import type { T_Config } from '../types';
import * as React from 'react';
import {
    useTheme,
    Container,
    CircularProgress,
    Box,
    Alert,
    AppBar,
    Toolbar,
    Grid,
    Pagination,
} from '@mui/material';
import {
    useDispatch,
} from '../Uberedux';
import {
    Search,
    useProspects,
    initProspects,
    Result,
    updateQuery,
    searchProspects,
    ChipSelect,
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
    const theme = useTheme();
    const loading = state?.loading;
    const results = state?.results;
    const query = state?.query;
    const initialData = state?.initialData;
    const pagination = state?.pagination;

    // Handle page change for pagination
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(updateQuery({ page: value }));
        dispatch(searchProspects());
    };
    
    const seniorityOptions = normaliseForChipSelect(initialData?.groups?.seniority?.list || [], 'label', 'value');
    const departmentOptions = normaliseForChipSelect(initialData?.groups?.sub_departments?.list || [], 'label', 'value');
    
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
            <AppBar position="fixed" sx={{ 
                background: theme.palette.background.default, 
                boxShadow:0, 
                mt: '60px' 
            }}>
                <Toolbar>
                    <Container maxWidth="lg" sx={{ my: 3 }}>

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
                    </Container>
                </Toolbar>
            </AppBar>   
            
            <Container maxWidth="lg" sx={{ my: 2 }}>
                <Box sx={{ mt: '125px' }}>

                    {/* Pagination */}
                    {pagination && pagination.pages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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
                        <Box sx={{ textAlign: 'center', color: 'text.secondary', py: 8 }}>
                            Loading prospects...
                        </Box>
                    )}

                    
                </Box>
            </Container>
            {/* <pre>total {JSON.stringify(initialData?.total, null, 2)}</pre> */}
        </>
    );
}
