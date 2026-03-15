'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Grid,
    Paper,
    ButtonBase,
    Typography,
} from '@mui/material';
import { Icon } from '../../../../NX/DesignSystem';
import { useDispatch } from '../../../../NX/Uberedux';
import { setNXAdmin, Account } from '../../../NXAdmin';


export default function Dashboard({ nav }: { nav: any }) {

    const dispatch = useDispatch();

    const handleClick = (item: any) => {
        if (item.collection) {
            dispatch(setNXAdmin('active', item.collection));
        }
    };

    // Filter out nav items with id 'acccount'
    const filteredNav = Array.isArray(nav) ? nav.filter((item: any) => item.id !== 'acccount') : [];
    return (
        <>
        <Grid container spacing={2} sx={{mb: 4}}>
            {filteredNav.map((item: any, i: number) => (
                <Grid key={`navItem_${i}`} size={{ xs: 12, md: 6 }}>
                    <ButtonBase
                        onClick={() => handleClick(item)}
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
                                <Icon icon={item.icon} color="primary" />
                            </Box>
                            <Box>
                                <Typography variant="h6">
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color={'text.secondary'}>
                                    {item.description}
                                </Typography>
                            </Box>
                        </Paper>
                    </ButtonBase>
                </Grid>
            ))}
        </Grid>
        </>
    );
}
