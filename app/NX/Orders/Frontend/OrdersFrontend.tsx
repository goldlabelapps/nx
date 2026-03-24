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
                avatar={<Icon icon='orders' color={'primary'} />}
                action={<IconButton color={'primary'} onClick={onActionClick}>
                    <Icon icon='admin' />
                </IconButton>}
            />
            <CardContent>
                {error ? <Alert 
                            variant='outlined' 
                            severity='warning'>
                            {error}
                        </Alert> : <>
                    <ProductSearch />
                </>}     

                {Array.isArray(products) && products.length > 0 && (
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>{product.title}</li>
                        ))}
                    </ul>
                )}
            </CardContent>
            {/* <pre>search: {JSON.stringify(search, null, 2)}</pre>
            <pre>products: {JSON.stringify(products, null, 2)}</pre> */}
        </>
    </>
    );
}

/*
 
subheader='Find products, create orders, pay.'
*/