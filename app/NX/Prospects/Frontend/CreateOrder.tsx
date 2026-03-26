'use client';
import * as React from 'react';
import {useRouter} from 'next/navigation';
import {
    IconButton,
    Button,
} from '@mui/material';
import {Icon} from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';
import { useOrders, initOrders, ProductSearch } from '../../Orders';

export default function CreateOrder() {


    const onCreateClick = () => {
        // 
    };
    
    return (<>
    <Button
        onClick={onCreateClick}
        variant="contained"
        endIcon={<Icon icon="orders" />}
    >
            Create Order
    </Button>
    </>
    );
}

/*
 <pre>search: {JSON.stringify(search, null, 2)}</pre>
subheader='Find products, create orders, pay.'
*/