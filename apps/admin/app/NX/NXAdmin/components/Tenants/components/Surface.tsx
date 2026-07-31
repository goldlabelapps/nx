'use client';
import * as React from 'react';
import {
    Grid,
} from '@mui/material';
import { useDispatch } from '../../../../Uberedux';
import { setNXAdmin, useNXAdmin } from '../../../../NXAdmin';
import { initDash, useDash } from '../../MegaDash';

export default function Surface() {
    
    // const dispatch = useDispatch();
    // const nxAdmin = useNXAdmin();
    // const dash = useDash();
    // const didInit = React.useRef(false);
    
    // React.useEffect(() => {
    //     if (!didInit.current) {
    //         if (!nxAdmin || !nxAdmin.dash) dispatch(initDash());
    //         didInit.current = true;
    //     }
    // }, [dispatch, nxAdmin]);

    // React.useEffect(() => {
    //     if (dash && dash.title) {
    //         dispatch(setNXAdmin('header', {
    //             title: '°Admin',
    //             icon: 'dashboard',
    //         }));
    //     }
    // }, [dispatch, dash?.title]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    Tenant 1
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    Tenant 2
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    Tenant 3
                </Grid>
            </Grid>
        </>
    );
}
