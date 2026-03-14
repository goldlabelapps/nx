"use client";
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    AsyncMessages,
    TingCard,
    NewMessage,
    useAsync,
    setAsync,
} from '../../Async'
import { useDispatch } from '../../Uberedux';

export interface I_AsyncDialog {
    id?: string;
}

export const AsyncDialog: React.FC<I_AsyncDialog> = ({ id }) => {

    const dispatch = useDispatch();
    const state = useAsync();
    const { dialogOpen, ting } = state || {};
    const {
        name,
        avatar,
    } = ting || {};
    const handleCloseDialog = () => {
        dispatch(setAsync('dialogOpen', false));
    };
    
    return (
        <Dialog
            fullScreen={false}
            open={!!dialogOpen}
            onClose={handleCloseDialog}
        >
            <DialogContent>
                <TingCard />
                <AsyncMessages />
            </DialogContent>
            <DialogActions>
                <NewMessage />
            </DialogActions>
        </Dialog>
    );
};

export default AsyncDialog;
