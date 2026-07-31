'use client';
import * as React from 'react';
import {
    Grid,
} from '@mui/material';
import { useDispatch } from '../../../Uberedux';
import { setNXAdmin, useNXAdmin } from '../../../NXAdmin';
import { initTenants, setTenants, useTenants } from '../Tenants';
import { useDash } from '../MegaDash';
export default function Tenants() {
    
    const dispatch = useDispatch();
    const nxAdmin = useNXAdmin();
    const dash = useDash();
    const tenants = useTenants();
    const didInit = React.useRef(false);
    
    React.useEffect(() => {
        if (!didInit.current) {
            if (!nxAdmin || !nxAdmin.tenants) dispatch(initTenants());
            didInit.current = true;
        }
    }, [dispatch, nxAdmin]);

    React.useEffect(() => {
        if (dash && dash.title) {
            dispatch(setNXAdmin('header', {
                title: 'Tenants°',
                icon: 'tenant',
            }));
        }
    }, [dispatch, dash?.title]);

    return (
        <>
            <pre>{JSON.stringify(tenants, null, 2)}</pre>
        </>
    );
}
