'use client';
import * as React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useDesignSystem, setDesignSystem } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';

export default function Loader() {
    
    const  designSystem  = useDesignSystem();
    const loading = designSystem?.loading;
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setDesignSystem('loading', false));
    };

    React.useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape' && loading) {
                handleClose();
            }
        }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [loading]);

    return (
        <Backdrop 
            open={!!loading} 
            sx={{ 
                zIndex: (theme) => theme.zIndex.drawer + 2000,
            }}>
            <CircularProgress color="primary" />
        </Backdrop>
    );
}
