'use client';
import type { T_Config } from '../../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    Alert,
    Card,
    CardHeader,
    CardContent,
    Typography,
    IconButton,
} from '@mui/material';

import {Icon} from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';
import { useOrders, initOrders } from '../../Orders';
import router from 'next/dist/shared/lib/router/router';

export interface I_OrdersAdmin {
    config: T_Config;
    children?: React.ReactNode;
};

export default function OrdersAdmin({
    config,
}: I_OrdersAdmin) {

    const router = useRouter();
    const dispatch = useDispatch();
    const orders = useOrders();
    const {message, error, products} = orders || {};

    React.useEffect(() => {
        if (!orders){
            dispatch(initOrders());
        };
    }, [dispatch, orders]);
    
    const onActionClick = () => {
        router.push('/echopay/orders');
    };

    return (<>
        <>
            <CardHeader 
                title='Orders Admin'
                avatar={<Icon icon='admin' color={'primary'} />}
                action={<IconButton color={'primary'} onClick={onActionClick}>
                            <Icon icon='orders' />
                        </IconButton>}
            />
            <CardContent>
                {error && <Alert 
                            variant='outlined' 
                            severity='warning'>
                            {error}
                        </Alert>}

                {Array.isArray(products) && products.length > 0 && (
                    <ul>
                        {products.map((product: any, idx: number) => (
                            <li key={product.id || idx}>
                                {product.title || product.name || 'Untitled Product'}
                            </li>
                        ))}
                    </ul>
                )}
                {Array.isArray(products) && products.length === 0 && (
                    <Typography variant="body2" color="textSecondary">
                        No products found.
                    </Typography>
                )}
            </CardContent>
        </>
        {/* <pre>products: {JSON.stringify(products, null, 2)}</pre> */}
    </>
    );
}
