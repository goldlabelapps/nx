'use client';
import * as React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import type { I_Icon } from '../../types';
import { Icon } from '../../DesignSystem';

export interface I_ConfirmAction {
    open: boolean;
    icon?: I_Icon['icon'];
    title: React.ReactNode;
    body: React.ReactNode;
    handleConfirm: () => void;
    handleClose: () => void;
}

export default function ConfirmAction({
    open,
    icon,
    title,
    body,
    handleConfirm,
    handleClose,
}: I_ConfirmAction) {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {icon ? <Icon icon={icon} /> : null}
                    <Typography variant="h6" component="span">
                        {title}
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Typography variant="body1">
                    {body}
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="inherit">
                    No
                </Button>
                <Button onClick={handleConfirm} variant="contained" color="primary">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
