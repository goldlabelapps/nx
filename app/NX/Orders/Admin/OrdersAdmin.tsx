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
    const {message, error} = orders || {};

    React.useEffect(() => {
        if (!orders){
            dispatch(initOrders());
        };
    }, [dispatch, orders]);
    
    const onActionClick = () => {
        router.push('/echopay/orders');
    };

    return (<>
        <Card variant='outlined'>
            <CardHeader 
                title='Admin' 
                subheader='Orders App Tenant'
                avatar={<Icon icon='admin' color={'primary'} />}
                action={<IconButton color={'primary'} onClick={onActionClick}>
                            <Icon icon='orders' />
                        </IconButton>}
            />
            <CardContent>
                {error && <Alert 
                            color="success"
                            variant='filled' 
                            severity='error'>
                            {error}
                        </Alert>}
                {/* <Typography variant='body1' sx={{my:3}}>
                    <span dangerouslySetInnerHTML={{ __html: message }} />
                </Typography> */}
                
            </CardContent>
        </Card>
        {/* <pre>orders: {JSON.stringify(orders, null, 2)}</pre> */}
    </>
    );
}
