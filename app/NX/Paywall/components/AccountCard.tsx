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

export default function AccountCard() {

    const dispatch = useDispatch();
    const paywall = usePaywall();
    const { account } = paywall || {};
    const {
        level,
        name,
        email,
    } = account || {}; 

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
                avatar={<ChooseAvatar onSave={onAvatarSave} />}
                title={<EditableStr 
                    id="account-name"
                    dialogTitle='Change your name'
                    value={name}
                    onSave={onNameSave}
                />}
                subheader={email}
                
            />
            {[...Array(5)].map((_, i) => (
                <Icon
                    key={`star_${i}`}
                    color={'primary'}
                    icon={i < (typeof level === 'number' ? level : 0) ? 'staron' : 'staroff'}
                />
            ))}
        </Box>
        
        {/* <pre>account: {JSON.stringify(account, null, 2)}</pre> */}
    </>
    );
}
