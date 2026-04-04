"use client";
import React from 'react';
import { 
    Button,
    Box,
    CardHeader,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography,
} from '@mui/material';
import { 
    usePaywall, 
    setPaywall,
    firebaseLogout,
    updateAccount,
    ChooseAvatar,
} from '../../Paywall';
import { useDispatch } from '../../Uberedux';
import { Icon, EditableStr } from '../../DesignSystem';

export default function MiniAccount({ onCloseDrawer }: { onCloseDrawer?: () => void } = {}) {

    const dispatch = useDispatch();
    const paywall = usePaywall();
    const { account } = paywall || {};
    const {
        // avatar,
        // level,
        name,
        email,
    } = account || {}; 

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSignout = async () => {
        await firebaseLogout();
        dispatch(setPaywall('user', null));
        dispatch(setPaywall('account', null));
        setOpen(false);
        if (onCloseDrawer) onCloseDrawer();
    }
    
    const onNameSave = (newName: string) => {
        dispatch(updateAccount('name', newName, `You are now called ${newName}`));
    };

    const onAvatarSave = (newAvatar: string) => {
        // console.log('new avatar url', newAvatar);
        dispatch(updateAccount('avatar', newAvatar, `You have a new avatar`));
    };

    return (<>
        <Box>
            <CardHeader
                title={<EditableStr 
                    id="account-name"
                    dialogTitle='Change your name'
                    value={name}
                    onSave={onNameSave}
                />}
                subheader={email}
                                action={name || email ? (
                                    <IconButton 
                                        color="primary" 
                                        onClick={handleOpen}>
                                        <Icon icon="signout" />
                                    </IconButton>
                                ) : null}
            />
            
        </Box>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogTitle>
                <Typography variant="h6" component="span" sx={{mt:1}}>
                    Sign {name} out?
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
        {/* <pre>account: {JSON.stringify(account, null, 2)}</pre> */}
    </>
    );
}
