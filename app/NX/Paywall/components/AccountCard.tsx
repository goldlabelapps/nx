"use client";
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Card, Typography } from '@mui/material';
import { 
    Button,
    Avatar,
    Box,
    CardActions,
    CardHeader,
    CardContent,
    IconButton,
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
        dispatch(updateAccount('name', newName, `You are now called ${newName}`));
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
                subheader={email || null}
                avatar={
                    <ChooseAvatar />
                    
                }
            />
            <CardContent>
                {[...Array(5)].map((_, i) => (
                    <Icon 
                        key={`star_${i}`} 
                        color={'primary'} 
                        icon={i < (typeof level === 'number' ? level : 0) ? 'staron' : 'staroff'} 
                    />
                ))}
            </CardContent>
            <CardActions>
                <Button 
                    endIcon={<Icon icon="signout" />}
                    color="primary" onClick={handleOpen}>
                    Sign out
                </Button>
            </CardActions>
            
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
                    onClick={onSignOut} color="primary" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
        {/* <pre>account: {JSON.stringify(account, null, 2)}</pre> */}
    </>
    );
}
