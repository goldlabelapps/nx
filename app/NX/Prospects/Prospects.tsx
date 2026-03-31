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
    Button,
    IconButton,
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
    const basket = state?.basket || [];

    // const handleBasket = () => {
    //     dispatch(setProspects('basketOpen', true));
    // };

    // On mount: initialize prospects and trigger search if 'search' param is in query string
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
                mt: '75px' 
            }}>
                <Toolbar>
                    <Container maxWidth="lg" sx={{ my: 3 }}>
                        <Box sx={{display: 'flex'}}>
                        <Box sx={{ flexGrow: 1, mx: {xs:1, md:4} }}>
                            <Search />
                        </Box>
                        {/* <Box>
                            <Badge badgeContent={basket.length} color='primary'>
                                <Button
                                    variant="outlined"
                                    startIcon={<Icon icon="shop" />}
                                    onClick={handleBasket}
                                >
                                    Basket
                                </Button>
                            </Badge>
                        </Box> */}
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>   
            
            <Container maxWidth="lg" sx={{ my: 4 }}>
                <Basket />
                {!results?.length ? (
                    <Box sx={{ 
                        mt: '85px', 
                        display: 'flex',
                        gap: 1,
                        mx: 1,
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                    }}>
                        <Box sx={{ width: '100%' }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<Icon icon="user" />}
                            >
                                search by job title
                            </Button>
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<Icon icon="company" />}
                            >
                                search by company
                            </Button>
                        </Box>

                        <Box sx={{ width: '100%' }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<Icon icon="user" />}
                            >
                                search by job title
                            </Button>
                        </Box>

                    </Box>
                ) : (
                    <Grid container spacing={2} sx={{ mt: '75px' }}>
                        {Array.isArray(results) && results.length > 0 && results.map((result, idx) => (
                            <Grid key={result.id || idx} size={{ xs: 12, sm: 6 }}>
                                <Result result={result} autoOpen={idx === 0} />
                            </Grid>
                        ))}
                    </Grid>
                )}
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