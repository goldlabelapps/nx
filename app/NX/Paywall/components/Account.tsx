"use client";
import React from 'react';
import { 
    Box,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    Button,
 } from '@mui/material';
import { useAuthed, usePaywall } from '../../Paywall';
import { Icon } from '../../DesignSystem';

export interface I_Account {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Account({ onClick }: I_Account) {
    
    const paywall = usePaywall();
    
    return (<Card variant='outlined'>
                <CardHeader 
                avatar={<Icon icon="account" color="primary"/>}
                title="Account" />
                <CardContent>
                    <pre>{JSON.stringify(paywall, null, 2)}</pre>
                </CardContent>
                <CardActions>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button 
                        endIcon={<Icon icon="save" />}
                        variant='contained'
                        onClick={onClick}>
                        Save
                    </Button>
                </CardActions>
            </Card>);

}
