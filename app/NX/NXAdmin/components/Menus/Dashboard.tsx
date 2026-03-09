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

export default function Dashboard({ nav }: { nav: any }) {

    const router = useRouter();

    return (
        <>
            {Array.isArray(nav) && nav.map((item: any, i: number) => (
                <ButtonBase
                    key={`navItem_${i}`}
                    sx={{
                        m:1,
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
                            <Icon icon={item.icon} />
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
