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
    Basket,
    updateQuery,
    searchProspects,
    ChipSelect,
} from '../Prospects';
import { normaliseForChipSelect } from '../Prospects'

export interface I_Prospects {
    config: T_Config;
    children?: React.ReactNode;
};

export default function Prospects({
    config,
}: I_Prospects) {

    const dispatch = useDispatch();
    const state = useProspects();
    const theme = useTheme();
    const loading = state?.loading;
    const results = state?.results;
    const query = state?.query;
    const initialData = state?.initialData;
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
                minHeight: '80vh',
            }}
        >
            <CircularProgress />
        </Box>
    );

    if (state?.error) {
        return (
            <Container maxWidth="md" sx={{ my: 4 }}>
                <Alert severity="info" sx={{ my: 2 }}>
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

                            <Grid size={{ xs: 12 }}>
                                <Search />
                            </Grid>

                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>   
            
            <Container maxWidth="lg" sx={{ my: 4 }}>
                <Basket />
                {!results?.length ? null : (
                    <Grid container spacing={2} sx={{ mt: '125px' }}>
                        {Array.isArray(results) && results.length > 0 && results.map((result, idx) => (
                            <Grid key={result.id || idx} size={{ xs: 12, sm: 6 }}>
                                <Result result={result} autoOpen={idx === 0} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
            {/* <pre>total {JSON.stringify(initialData?.total, null, 2)}</pre> */}
        </>
    );
}
