'use client';
import * as React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Card,
    CardHeader,
    Typography,
    CardMedia,
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
        attribute_set_code,
        thumbnail_image,
    } = data || {};
    // React.useEffect(() => {
    //     if (!initted) {
    //         dispatch(init());
    //     }
    // }, [initted, dispatch]);

    const src = `/shared/jpg/magento/${thumbnail_image}`;

    const thumbSize = 75;
    return (
        <>
            <Card 
                variant="outlined"
                sx={{my: 1}}
            >
                <CardHeader 
                    avatar={<Icon icon="orders" color="primary"/>}
                    title={name}
                    subheader={attribute_set_code}
                    action={<Box sx={{
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        width: thumbSize,
                        height: thumbSize,
                    }}>
                        <CardMedia
                            component="img"
                            image={src}
                            alt={name}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>}
                    
                />
                

            </Card>
        </>
    );
};

export default Order;

