'use client';
import type { T_Config } from '../types';
import * as React from 'react';
import {
    useTheme,
    Badge,
    Container,
    CircularProgress,
    Box,
    Alert,
    AppBar,
    Toolbar,
    IconButton,
    Grid,
} from '@mui/material';
import {
    Icon,
} from '../DesignSystem';
import {
    useDispatch,
} from '../Uberedux';
import {
    Search,
    useProspects,
    setProspects,
    initProspects,
    Result,
    Basket,
    updateQuery,
    searchProspects,
    ChipSelect,
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
    const theme = useTheme();
    const loading = state?.loading;
    const results = state?.results;
    const query = state?.query;

    // seniority

    const seniorityOptions = [
        { label: 'Intern', value: 'intern' },
        { label: 'Junior', value: 'junior' },
        { label: 'Mid', value: 'mid' },
        { label: 'Senior', value: 'senior' },
        { label: 'Lead', value: 'lead' },
        { label: 'Manager', value: 'manager' },
    ];

    const departmentOptions = [
        { label: 'Intern', value: 'intern' },
        { label: 'Junior', value: 'junior' },
        { label: 'Mid', value: 'mid' },
        { label: 'Senior', value: 'senior' },
        { label: 'Lead', value: 'lead' },
        { label: 'Manager', value: 'manager' },
    ];
    
    React.useEffect(() => {
        if (!state) {
            dispatch(initProspects());
            // Check for 'search' param in query string
            const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
            const searchParam = params?.get('search');
            if (searchParam) {
                setTimeout(() => {
                    dispatch(updateQuery({ search: searchParam }));
                    dispatch(searchProspects());
                    // Optionally open first result dialog:
                    // dispatch(setProspects('openFirstResultDialog', true));
                }, 500); // 500ms delay to ensure everything is loaded
            }
        }
    }, [state, dispatch]);

    // Effect to open the first result dialog for dev
    React.useEffect(() => {
        if (state?.openFirstResultDialog && Array.isArray(results) && results.length > 0) {
            // Custom event to signal Result to open dialog
            const event = new CustomEvent('openFirstResultDialog');
            window.dispatchEvent(event);
            dispatch(setProspects('openFirstResultDialog', false));
        }
    }, [state?.openFirstResultDialog, results, dispatch]);

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
                mt: '70px' 
            }}>
                <Toolbar>
                    <Container maxWidth="lg" sx={{ my: 3 }}>

                        <Grid container spacing={2} sx={{ mt: '0px' }}>
                            
                            <Grid size={{ xs: 4 }}>
                                <ChipSelect
                                    icon="seniority"
                                    label="Select Seniority"
                                    list={seniorityOptions}
                                    value={query?.level || null}
                                    onChange={value => dispatch(updateQuery({ seniority: value }))}
                                />
                            </Grid>

                            <Grid size={{ xs: 4 }}>
                                <ChipSelect
                                    icon="company"
                                    label="Select Department"
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
                    <Grid container spacing={2} sx={{ mt: '150px' }}>
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

/*

*/