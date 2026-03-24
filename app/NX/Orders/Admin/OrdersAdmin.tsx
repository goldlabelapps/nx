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

    // Define columns for DataGrid, easy to remove or comment out
    const columns: GridColDef[] = [
        
        { field: 'item', headerName: 'Item', width: 100 },
        { field: 'ean', headerName: 'Barcode', width: 160 },
        { field: 'title', headerName: 'Title', width: 300 },
        { field: 'ssell1', headerName: 'Price', width: 90 },
        { field: 'hierarchy1', headerName: '', width: 140 },
        // { field: 'uos', headerName: 'UOS', width: 80 },
        { field: 'pack_description', headerName: 'Pack Description', width: 140 },
        // { field: 'hierarchy2', headerName: 'Hierarchy2', width: 120 },
        // { field: 'hierarchy3', headerName: 'Hierarchy3', width: 120 },
        // { field: 'uop', headerName: 'UOP', width: 80 },
        // { field: 'ssell2', headerName: 'Sell 2', width: 90 },
        // { field: 'ssell3', headerName: 'Sell 3', width: 90 },
        // { field: 'ssell4', headerName: 'Sell 4', width: 90 },
        // { field: 'ssell5', headerName: 'Sell 5', width: 90 },
        { field: 'pack1', headerName: 'Pack 1', width: 80 },
        // { field: 'pack2', headerName: 'Pack 2', width: 80 },
        // { field: 'pack3', headerName: 'Pack 3', width: 80 },
        // { field: 'pack4', headerName: 'Pack 4', width: 80 },
        // { field: 'pack5', headerName: 'Pack 5', width: 80 },
        // { field: 'params', headerName: 'Params', width: 300 },
        // { field: 'search_vector', headerName: 'Search Vector', width: 300 },
    ];

    // DataGrid expects each row to have a unique 'id' property
    const rows = Array.isArray(products) ? products.map((p: any, idx: number) => ({
        ...p,
        id: p.id || idx,
    })) : [];

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
                {error && <Alert 
                            variant='outlined' 
                            severity='warning'>
                            {error}
                        </Alert>}

                <div style={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 25, 50]}
                        disableRowSelectionOnClick
                        autoHeight={false}
                    />
                </div>
                {Array.isArray(products) && products.length === 0 && (
                    <Typography variant="body2" color="textSecondary">
                        No products found.
                    </Typography>
                )}
            </CardContent>
        </>
    );
}
