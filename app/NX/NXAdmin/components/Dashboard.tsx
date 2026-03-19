'use client';
import * as React from 'react';
import {
    Grid,
} from '@mui/material';
// import { Icon } from '../../../NX/DesignSystem';

export default function Dashboard() {

    return (
        <Grid container spacing={2} sx={{mb: 4}}>
            <Grid size={{ xs: 12, sm: 6 }}>
               
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                
            </Grid>
        </Grid>
    );
}

/*
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