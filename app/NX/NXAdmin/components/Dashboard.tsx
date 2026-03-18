'use client';
import * as React from 'react';
import {
    Box,
    Grid,
    Paper,
    ButtonBase,
    Typography,
} from '@mui/material';
import { Icon } from '../../../NX/DesignSystem';
import { useDispatch } from '../../../NX/Uberedux';


export default function Dashboard() {

    const dispatch = useDispatch();

    return (
        <Grid container spacing={2} sx={{mb: 4}}>
            <Grid size={{ xs: 12, md: 6 }}>
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
            </Grid>
        </Grid>
    );
}
