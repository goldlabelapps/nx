'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Paper,
    ButtonBase,
    Typography,
} from '@mui/material';
import { Icon } from '../../../../NX/DesignSystem';
import { useDispatch } from '../../../../NX/Uberedux';
import {setNXAdmin} from '../../../NXAdmin'

export default function Dashboard({ nav }: { nav: any }) {

    const dispatch = useDispatch();

    const handleClick = (item: any) => {
        if (item.collection) {
            dispatch(setNXAdmin('active', item.collection));
        }
    };

    return (
        <>
            {Array.isArray(nav) && nav.map((item: any, i: number) => (
                <ButtonBase
                    onClick={() => handleClick(item)}
                    key={`navItem_${i}`}
                    sx={{
                        my:1,
                        textAlign: 'left',
                        width: '100%',
                    }}
                >
                    <Paper 
                        variant='outlined' 
                        sx={{
                            p: 2,
                            display: 'flex',
                            width: '100%',
                        }}
                    >
                        <Box sx={{mr:2}}>
                            <Icon icon={item.icon} color="primary"/>
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
            ))}
        </>
    );
}
