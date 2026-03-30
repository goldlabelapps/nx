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
} from '@mui/material';
import {
    useDispatch,
} from '../Uberedux';
import {
    Search,
    useProspects,
    initProspects,
    Result,
} from '../Prospects';

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
    const theme = useTheme();
    const results = state?.results;
    const query = state?.query || '';

    React.useEffect(() => {
        if (!state) dispatch(initProspects());
    }, [state, dispatch]);

    if (loading) return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
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

    return (
        <>
            <AppBar position="fixed" sx={{ background: theme.palette.background.default, boxShadow:0, mt: '85px' }}>
                <Toolbar>
                    <Container maxWidth="lg" sx={{ my: 3 }}>
                        <Box sx={{ flexGrow: 1, mx: 4 }}>
                            <Search />
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>   
            <Container maxWidth="lg" sx={{ my: 4 }}>
                <Grid container spacing={2} sx={{ mt: '60px' }}>
                    {Array.isArray(results) && results.length > 0 && results.map((result, idx) => (
                        <Grid key={result.id || idx} size={{ xs: 12, sm: 6 }}>
                            <Result result={result} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {/* <pre>query: {JSON.stringify(query, null, 2)}</pre>
            <pre>results: {JSON.stringify(results, null, 2)}</pre> */}
            
        </>
    );
}

/*
<Selecta
    label="by Level"
    list={levelList}
    value={query?.level || null}
    onChange={value => dispatch(updateQuery({ level: value }))}
/>
*/