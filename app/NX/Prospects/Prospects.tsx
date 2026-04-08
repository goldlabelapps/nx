'use client';
import * as React from 'react';
import {
    Button,
    Container,
    CircularProgress,
    Box,
    Alert,
    Grid,
    Pagination,
    Typography,
} from '@mui/material';
import {
    useDispatch,
} from '../Uberedux';
import {
    Icon,
} from '../DesignSystem';
import {
    HammerMenu,
    useProspects,
    initProspects,
    Result,
    updateQuery,
    searchProspects,
} from '../Prospects';

export default function Prospects() {

    const dispatch = useDispatch();
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
            <Container maxWidth="lg">
                <Box sx={{display: 'flex', mb: 2}}>

                    <Typography variant="h4" color="textSecondary" sx={{ mr: 1 }}>
                        {pagination ? ` ${pagination.total || 0}` : null}
                    </Typography>
                    
                    {Array.isArray(results) && !loading && <HammerMenu />}

                    <Box sx={{ flexGrow: 1 }} />
                    {pagination && pagination.pages > 1 && (
                        <Pagination
                            size="small"
                            sx={{ mt: 0.5 }}
                            count={pagination.pages}
                            page={pagination.page}
                            onChange={handlePageChange}
                            color="standard"
                            shape="rounded"
                            siblingCount={0}
                            boundaryCount={1}
                        />
                    )}
                    
                </Box>
                
                {Array.isArray(results) && results.length > 0 ? (
                    <Grid container spacing={2}>
                        {results.map((result, idx) => (
                            <Grid key={result.id || idx} size={{ xs: 12 }}>
                                <Result result={result} autoOpen={idx === 0} />
                            </Grid>
                        ))}
                    </Grid>
                ) : null }
            </Container>
        </>
    );
}
