"use client";
import type { I_OldCompany } from '../../types'
import * as React from 'react';
import {
    Box,
} from '@mui/material';

export default function OldCompany({ options }: I_OldCompany) {

    React.useEffect(() => {
        ActionScript.current = new NewCompanyAS(clipRef);
        ActionScript.current.init();
    }, [thisStep]);

    return (
        <Box>
            Load old Old Company by slug {options?.slug}
        </Box >
    );
}
