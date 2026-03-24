"use client";
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Card } from '@mui/material';
import { 
    Badge,
    Avatar,
    Box,
    CardHeader,
    CardContent,
    Button,
    IconButton,
} from '@mui/material';
import { 
    usePaywall, 
    setPaywall,
    firebaseLogout,
} from '../../Paywall';
import { useDispatch } from '../../Uberedux';
import { Icon, EditableStr } from '../../DesignSystem';

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
    
    const onNameSave = (newName: string) => {
        console.log('Saving new name:', newName);
    };

    return (<>
        <Box>
            <CardHeader
                title={<EditableStr 
                    id="account-name"
                    value={name}
                    onSave={onNameSave}
                />}
                subheader={email || null}
                avatar={<Avatar src={avatar} />}
                action={<IconButton color="primary" onClick={handleOpen}>
                    <Icon icon="signout" />
                </IconButton>}
            />
            <CardContent>
                {[...Array(5)].map((_, i) => (
                    <Icon key={i} color={'primary'} icon={i < (typeof level === 'number' ? level : 0) ? 'staron' : 'staroff'} />
                ))}
            </CardContent>
        </Box>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to sign out?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    No
                </Button>
                <Button 
                    endIcon={<Icon icon="tick" />}
                    variant="outlined" 
                    onClick={onSignOut} color="primary" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
        {/* <pre>paywall: {JSON.stringify(paywall, null, 2)}</pre> */}
    </>
    );
}
