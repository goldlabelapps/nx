"use client";
import React from 'react';
import { 
    Badge,
    Avatar,
    Box,
    CardHeader,
    CardActions,
    Button,
} from '@mui/material';
import { usePaywall, setPaywall, subscribeAccount, firebaseLogout } from '../../Paywall';
import { useDispatch } from '../../Uberedux';
import { Icon } from '../../DesignSystem';

export interface I_AccountCard {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function AccountCard({ onClick }: I_AccountCard) {

    const dispatch = useDispatch();
    const paywall = usePaywall();
    const { account, accountSubscribing } = paywall || {};
    const {
        avatar,
        level,
        name,
        email,
    } = account || {}; 

    const onSignOut = async () => {
        await firebaseLogout();
        dispatch(setPaywall('user', null));
        dispatch(setPaywall('account', null));
    }
    
    React.useEffect(() => {
        if (!account && !accountSubscribing) {
            dispatch(setPaywall('accountSubscribing', true));
            dispatch(subscribeAccount());
        };
    }, [account, accountSubscribing, dispatch]);

    return (<>
            <Box>
                <CardHeader
                    title={name || null}
                    subheader={email || null}
                    avatar={<Badge badgeContent={level}>
                                <Avatar src={avatar} />
                            </Badge>}
                    />
                    <CardActions>
                        <Button 
                            endIcon={<Icon icon="signout" />}
                            variant="outlined" 
                            onClick={onSignOut}>
                                Sign out
                            </Button>
                    </CardActions>
            </Box>
            {/* <pre>account: {JSON.stringify(account, null, 2)}</pre> */}
        </>
    );
}
