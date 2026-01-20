import React from "react";
import { Typography, Box, Button } from '@mui/material';

export type T_AdAction = 'routeTo' | 'alert';

export interface AdProps {
    ad: {
        title: string;
        description: string;
        actionType: T_AdAction;
        route: string;
        ctaLabel: string;
    };
}

export const Ad: React.FC<AdProps> = ({ ad }) => {
    const { title, description, actionType, route, ctaLabel } = ad;
    return (
        <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>{title}</Typography>
            <Typography variant="body2" gutterBottom>{description}</Typography>
            <Button
                variant={'outlined'}
                color={'primary'}
                href={actionType === 'routeTo' ? route : undefined}
                onClick={actionType === 'alert' ? () => alert('Action!') : undefined}
            >
                {ctaLabel}
            </Button>
        </Box>
    );
};