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
    Grid,
    Button,
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

    const handleBasket = () => {
        dispatch(setProspects('basketOpen', true));
    };

    React.useEffect(() => {
        if (!state) {
            dispatch(initProspects());
            // Simulate initial search for "chris" after a brief delay
            setTimeout(() => {
                dispatch(updateQuery({ search: 'chris' }));
                dispatch(searchProspects());
            }, 500); // 500ms delay to ensure everything is loaded
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
                <Grid container spacing={2} sx={{ mt: '75px' }}>
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