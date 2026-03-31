"use client";
import * as React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    IconButton,
    Box,
    useTheme,
    useMediaQuery
} from "@mui/material";
import { useDispatch } from '../../Uberedux';
import { 
    useProspects, 
    updateQuery,
    setProspects,
} from '../../Prospects';
import {Icon} from '../../DesignSystem';

export interface I_Prompt {
    label?: string;
}

export default function Prompt({ label }: I_Prompt) {

    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    React.useEffect(() => {
        // dispatch(setProspects('basketOpen', true));
    }, [isMobile]);

    const handleClose = () => {
        // dispatch(setProspects('basketOpen', false));
    };

    return (
        <><Icon icon="ai" /></>
    );
}

