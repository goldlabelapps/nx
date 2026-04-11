'use client';
import * as React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Card,
    CardHeader,
    Typography,
} from '@mui/material';
import { useDispatch } from '../../../NX/Uberedux';
import { Icon } from '../../DesignSystem';

interface I_Order {
    data: any; // Replace 'any' with a specific type if available
}

const Order: FC<I_Order> = ({ data }) => {

    const dispatch = useDispatch();

    const {
        name,
        categories,
        base_image,
    } = data || {};
    // React.useEffect(() => {
    //     if (!initted) {
    //         dispatch(init());
    //     }
    // }, [initted, dispatch]);

    const src = base_image || '/placeholder.png';

    return (
        <>
            <Card 
                variant="outlined"
                sx={{my: 1}}
            >
                <CardHeader 
                    avatar={<Icon icon="orders" color="primary"/>}
                    title={name}
                    subheader={src}
                    
                />
            </Card>
        </>
    );
};

export default Order;

