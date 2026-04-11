'use client';
import * as React from 'react';
import type { FC } from 'react';
import {
    Box,
    Typography,
} from '@mui/material';
import { useDispatch } from '../../../NX/Uberedux';
import { Thumbnail } from '../../Orders';

interface I_Product {
    data: any; // Replace 'any' with a specific type if available
}

const Product: FC<I_Product> = ({ data }) => {

    const dispatch = useDispatch();
    const thumbSize = 75;
    const {
        name,
        description,
        price,
        small_image,
    } = data || {};
    const src = `/shared/jpg/magento/${small_image}`;

    // React.useEffect(() => {
    //     if (!initted) {
    //         dispatch(init());
    //     }
    // }, [initted, dispatch]);

    return (<>
        
        <Typography variant="h3" color="text.secondary">
            {name}
        </Typography>

        {/* {small_image && (
            <Box sx={{ mb: 2 }}>
                <Thumbnail src={src} alt={name} size={thumbSize} />
            </Box>
        )} */}

        {price && (
            <Typography variant="h2" color="primary" sx={{ mt: 1 }}>
                {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(price)}
            </Typography>
        )}

        {description && (
            <Box sx={{ mt: 2 }} dangerouslySetInnerHTML={{ __html: description }} />
        )}
    </>);
};

export default Product;

