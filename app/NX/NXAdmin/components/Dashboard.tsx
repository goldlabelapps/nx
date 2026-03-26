'use client';
import * as React from 'react';
import {
    Grid,
} from '@mui/material';
import { AccountCard } from '../../Paywall';

export default function Dashboard() {

    return <AccountCard />;
}

/*

        <Grid container spacing={0} sx={{mb: 0}}>
            <Grid size={{ xs: 12 }}>
                <AccountCard />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                
            </Grid>
        </Grid>


 <ButtonBase
    sx={{
        textAlign: 'left',
        width: '100%',
    }}>
    <Paper
        variant='outlined'
        sx={{
            p: 1,
            display: 'flex',
            width: '100%',
        }}>
        <Box sx={{ mr: 2 }}>
            <Icon icon={"right"} color="primary" />
        </Box>
        <Box>
            <Typography variant="h6">
                {"item.title"}
            </Typography>
            <Typography variant="body2" color={'text.secondary'}>
                {"item.description"}
            </Typography>
        </Box>
    </Paper>
</ButtonBase>
*/