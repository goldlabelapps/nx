"use client";
import React from 'react';
import { 
    Box,
    CardHeader,
} from '@mui/material';
import { 
    usePaywall, 
    updateAccount,
} from '../../Paywall';
import { useDispatch } from '../../Uberedux';
import { EditableStr } from '../../DesignSystem';

export default function AccountCard() {

    const dispatch = useDispatch();
    const paywall = usePaywall();
    const { account } = paywall || {};
    const {
        name,
        email,
    } = account || {}; 

    const onNameSave = (newName: string) => {
        dispatch(updateAccount('name', newName, `You are now called ${newName}`));
    };

    return (<>
        <Box sx={{}}>
            <CardHeader
                // avatar={<ChooseAvatar onSave={onAvatarSave} />}
                title={<EditableStr 
                    id="account-name"
                    dialogTitle='Change your name'
                    value={name}
                    onSave={onNameSave}
                />}
                subheader={email}
                action={<>
                    
                </>}
            />
            {/* <Box sx={{mx: 1}}>
                {[...Array(5)].map((_, i) => (
                    <Icon
                        key={`star_${i}`}
                        color={'primary'}
                        icon={i < (typeof level === 'number' ? level : 0) ? 'staron' : 'staroff'}
                    />
                ))}
            </Box> */}
        </Box>        
        {/* <pre>account: {JSON.stringify(account, null, 2)}</pre> */}
    </>
    );
}
