"use client";
import type { I_OldCompany } from '../../types';
import { OldCompanyAS } from './';
import * as React from 'react';
import {
    Box,
} from '@mui/material';


export default function OldCompany({ options }: I_OldCompany) {

    const ActionScript = React.useRef<any>(null);
    const clipRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        ActionScript.current = new OldCompanyAS(clipRef);
        ActionScript.current.init();
    }, []);

    return (
        <Box ref={clipRef}>
            Load old Old Company by this slug: {options?.slug}
        </Box >
    );
}
