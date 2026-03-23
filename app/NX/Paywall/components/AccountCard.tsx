"use client";
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { 
    Badge,
    Avatar,
    Box,
    CardHeader,
    CardActions,
    Button,
    IconButton,
} from '@mui/material';
import { usePaywall, setPaywall, subscribeAccount, firebaseLogout } from '../../Paywall';
import { useDispatch } from '../../Uberedux';
import { Icon } from '../../DesignSystem';

export default function AccountCard() {

    const dispatch = useDispatch();
    const paywall = usePaywall();
    const { account } = paywall || {};
    const {
        avatar,
        level,
        name,
        email,
    } = account || {}; 

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSignOut = async () => {
        await firebaseLogout();
        dispatch(setPaywall('user', null));
        dispatch(setPaywall('account', null));
        setOpen(false);
    }
    
    return (<>
        <Box>
            <CardHeader
                title={name || null}
                subheader={email || null}
                avatar={<Badge badgeContent={level}>
                    <Avatar src={avatar} />
                </Badge>}
                action={<IconButton color="primary" onClick={handleOpen}>
                    <Icon icon="signout" />
                </IconButton>}
            />
        </Box>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Sign Out</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to sign out?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onSignOut} color="primary" autoFocus>
                    Sign Out
                </Button>
            </DialogActions>
        </Dialog>
        <pre>paywall: {JSON.stringify(paywall, null, 2)}</pre>
    </>
    );
}
