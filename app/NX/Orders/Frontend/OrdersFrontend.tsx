'use client';
import type { T_Config } from '../../types';
import * as React from 'react';
import {useRouter} from 'next/navigation';
import {
    IconButton,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Alert,
} from '@mui/material';

import {Icon} from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';
import { useOrders, initOrders } from '../../Orders';

export interface I_OrdersFrontend {
    config: T_Config;
    children?: React.ReactNode;
};

export default function OrdersFrontend({
    config,
}: I_OrdersFrontend) {

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
        router.push('/echopay/orders-admin');
    };
    
    return (<>
        <Card variant='outlined'>
            <CardHeader 
                title='Frontend' 
                subheader='Find products, create orders, pay.'
                avatar={<Icon icon='orders' color={'primary'} />}
                action={<IconButton color={'primary'} onClick={onActionClick}>
                    <Icon icon='admin' />
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
        {/* <pre>error: {JSON.stringify(error, null, 2)}</pre> */}
    </>
    );
}
