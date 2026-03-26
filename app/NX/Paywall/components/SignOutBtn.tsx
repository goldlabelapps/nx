"use client";
import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    IconButton,
    Typography,
} from '@mui/material';
import { Icon } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';
import { useRouter } from 'next/navigation';
import {
    usePaywall,
    setPaywall,
    firebaseLogout,
    updateAccount,
    ChooseAvatar,
} from '../../Paywall';

export default function SignOutBtn() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSignout = async () => {
        await firebaseLogout();
        dispatch(setPaywall('user', null));
        dispatch(setPaywall('account', null));
        setOpen(false);
    }
    
    return (
        <>
        <IconButton onClick={handleSignout} color="primary">
            <Icon icon="signout" />
        </IconButton>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogTitle>
                <Typography variant="h6" component="span" sx={{mt:1}}>
                    Sign out?
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    No
                </Button>
                <Button 
                    endIcon={<Icon icon="tick" />}
                    variant="outlined" 
                    onClick={handleSignout} color="primary" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}
