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

    // React.useEffect(() => {
    // }, []);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // router.push('/');
    }

    return (
        <>
            {/* Map nav array to ListItemButtons */}
            {Array.isArray(nav) && nav.map((item: any, i: number) => (
                <ButtonBase
                    key={`navItem_${i}`}
                    sx={{
                        
                        m:1,
                        // border: '1px solid gold',
                        textAlign: 'left',
                        width: '100%',
                    }}
                >
                    <Paper 
                        variant='outlined' 
                        sx={{
                            p: 1,
                            display: 'flex',
                            width: '100%',
                        }}
                    >
                        <Box sx={{mr:2}}>
                            <Icon icon={item.icon} />
                        </Box>

                        <Box>
                        <Typography variant="body1">
                            {item.title}
                        </Typography>

                        <Typography variant="body2" color={'text.secondary'}>
                           Create {item.description}
                        </Typography>
                        </Box>

                        {/* <ListItemButton
                            key={item.collection}
                            onClick={() => {
                                // router.push(`/${item.collection}`)
                            }}>
                            <ListItemIcon>
                                
                            </ListItemIcon>
                            <ListItemText primary=/>
                        </ListItemButton> */}

                    </Paper>
                </ButtonBase>
            ))}
        </>
    );
}
