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
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import {Icon} from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';
import { useOrders, initOrders } from '../../Orders';

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
    const {error, products} = orders || {};

    React.useEffect(() => {
        if (!orders){
            dispatch(initOrders());
        };
    }, [dispatch, orders]);
    
    const onActionClick = () => {
        router.push('/echopay/orders');
    };

    return (
        <>
            <CardHeader 
                title='Orders Admin'
                avatar={<Icon icon='admin' color={'primary'} />}
                action={<IconButton color={'primary'} onClick={onActionClick}>
                            <Icon icon='orders' />
                        </IconButton>}
            />
            <CardContent>
                {error && (
                    <Alert 
                        variant='outlined' 
                        severity='warning'>
                        {error}
                    </Alert>
                )}
            </CardContent>
        </>
    );
}
