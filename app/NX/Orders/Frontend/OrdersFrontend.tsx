'use client';
import * as React from 'react';
import {useRouter} from 'next/navigation';
import {
    IconButton,
    CardHeader,
    CardContent,
    Alert,
} from '@mui/material';
import {Icon} from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';
import { useOrders, initOrders, ProductSearch } from '../../Orders';

export default function OrdersFrontend() {

    const router = useRouter();
    const dispatch = useDispatch();
    const orders = useOrders();
    const {error, products, search} = orders || {};

    React.useEffect(() => {
        if (!orders){
            dispatch(initOrders());
        };
    }, [dispatch, orders]);

    const onActionClick = () => {
        router.push('/echopay/orders-admin');
    };
    
    return (<>
        <>
            <CardHeader 
                title='Orders Frontend' 
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
                <ProductSearch />
            </CardContent>
        </>
        <pre>search: {JSON.stringify(search, null, 2)}</pre>
    </>
    );
}
