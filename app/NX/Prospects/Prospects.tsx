'use client';
import type { T_Config } from '../types';
import * as React from 'react';
import {
    Typography,
    LinearProgress,
    CircularProgress,
    Box,
    Alert,
} from '@mui/material';
import {
    FindProspect,
    Selecta,
    useProspects,
    initProspects,
} from '../Prospects';
import {
    useDispatch,
} from '../Uberedux';

export interface I_Prospects {
    config: T_Config;
    children?: React.ReactNode;
};

export default function Prospects({
    config,
}: I_Prospects) {

    const dispatch = useDispatch();
    const state = useProspects();
    const loading = state?.loading;
    const initialData = state?.initialData;

    // If rawTitles is an array of objects with nested label/count, transform it for Selecta
    const rawTitles = initialData?.title?.values || [];

    // Helper to slugify a string
    const slugify = (str: unknown) =>
        String(str)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

    // Handles both the nested and flat string cases, and sorts by count if available

    type SelectaListItem = { label: string; value: string; count: number };
    const selectaListFull: SelectaListItem[] = rawTitles.map((item: any, idx: number): SelectaListItem => {
        // If item.label is an object, extract its label and count
        let labelValue = '';
        let countValue = 0;
        if (typeof item === 'object' && item.label) {
            labelValue = typeof item.label.label === 'string' ? item.label.label : String(item.label.label ?? '');
            countValue = typeof item.label.count === 'number' ? item.label.count : 0;
        } else {
            labelValue = typeof item === 'string' ? item : String(item ?? '');
        }
        // Ensure label is not empty
        let labelStr = `${labelValue}${countValue ? ` (${countValue})` : ''}`;
        if (!labelStr) labelStr = `Item ${idx + 1}`;
        let value = slugify(labelValue);
        // Ensure value is not empty
        if (!value) value = `item-${idx}`;
        return {
            label: labelStr,
            value,
            count: countValue,
        };
    });

    // map to correct type for Selecta
    const list: { label: string; value: string }[] = [...selectaListFull]
        .sort((a, b) => b.count - a.count)
        .map(({ label, value }: { label: string; value: string }) => ({ label, value }));


    React.useEffect(() => {
        if (!state) dispatch(initProspects());
    }, [state, dispatch]);

    if (loading) return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '70vh',
            }}
        >
            <CircularProgress />
        </Box>
    );

    if (state?.error) {
        return (
            <Alert severity="error" sx={{ my: 2 }}>
                {state.error}
            </Alert>
        );
    }

    return (
        <>
            <FindProspect />  
            <Selecta label="Job Title" list={list} />
            {/* <pre style={{ marginTop: '20px', fontSize: '12px' }}>
                loading: {JSON.stringify(loading, null, 2)}
            </pre> */}
        </>
    );
}
