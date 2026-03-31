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

export interface I_Basket {
    label?: string;
}

export default function Basket({ label }: I_Basket) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const prospects = useProspects();
    const basketOpen = prospects?.basketOpen
    const basket = prospects?.basket

    React.useEffect(() => {
        // dispatch(setProspects('basketOpen', true));
    }, [isMobile]);

    const handleClose = () => {
        dispatch(setProspects('basketOpen', false));
    };

    return (
        <Dialog
            open={basketOpen}
            fullScreen={isMobile}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <pre>basket: {JSON.stringify(basket, null, 2)}</pre>
        </Dialog>
    );
}

