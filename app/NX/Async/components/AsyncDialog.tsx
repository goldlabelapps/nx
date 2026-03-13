import React from 'react';
import {
    Box,
    Dialog,
    DialogTitle,
    Button,
    CardHeader,
    Typography,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    Icon,
} from '../../DesignSystem'
import {
    TingCard,
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

    const handleCloseDialog = () => {
        dispatch(setAsync('dialogOpen', false));
    };
    
    return (
        <Dialog
            fullScreen
            open={!!dialogOpen}
            onClose={handleCloseDialog}
        >

            <DialogContent>
                <TingCard />
            </DialogContent>

            <DialogActions>
                <Box sx={{ flexGrow: 1 }} />
                <Button 
                    variant='outlined'
                    endIcon={<Icon icon="close" />}
                    onClick={handleCloseDialog} 
                    color="primary">
                    Close
                </Button>
                <Box sx={{flexGrow:1}}/>
            </DialogActions>
                
        </Dialog>
    );
};

export default AsyncDialog;
