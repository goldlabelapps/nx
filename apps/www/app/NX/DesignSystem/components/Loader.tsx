'use client';
import * as React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useDesignSystem, setDesignSystem } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';

export default function Loader() {
    const designSystem = useDesignSystem();
    const loading = designSystem?.loading;
    const dispatch = useDispatch();

    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    React.useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape' && loading) {
                dispatch(setDesignSystem('loading', false));
            }
        }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [dispatch, loading]);

    if (!mounted) return null;

    return (
        <Backdrop 
            open={!!loading} 
            sx={{ 
                zIndex: (theme) => theme.zIndex.drawer + 2000,
            }}>
            <CircularProgress color="info" />
        </Backdrop>
    );
}
