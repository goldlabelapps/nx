"use client";
import React from 'react';
import {
    useTheme,
    Avatar,
    Box,
    Button,
    Paper,
    Card,
    CardHeader,
    CardContent,
    CardActions,
} from '@mui/material';
import { Icon } from '../../../../app/NX/DesignSystem';

const Calculator = () => {
    const theme = useTheme();
    const fill = theme.palette.primary.main;
    return (
        <Card
            square
            sx={{
                width: '100%',
            }}>
            <CardHeader
                avatar={<Avatar src="/echopay/png/favicon.png" />}
                title="EchoPay"
                subheader="Calculator"
            />
            <CardContent>

            </CardContent>
            <CardActions>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                    endIcon={<Icon icon={"right"} />}
                    color="primary"
                >
                    Calculate
                </Button>
            </CardActions>
        </Card>
    );
};

export default Calculator;
