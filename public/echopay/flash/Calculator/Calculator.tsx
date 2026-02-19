"use client";
import type { T_Company } from '../types';
import React from 'react';
import {
    Avatar,
    Box,
    IconButton,
    Typography,
    Card,
    CardHeader,
    CardContent,
    CardActions,
} from '@mui/material';
import { Icon } from '../../../../app/NX/DesignSystem';
import { useDispatch } from '../../../../app/NX/Uberedux';
import { useFlash, setFlash } from '../../../../app/NX/Flash';
import { FormMC } from '../';


const Calculator = () => {

    const flash = useFlash();
    const dispatch = useDispatch();

    const data: T_Company = {
        "id": '1234-asdf-1234-asdf',
        "name": "Example Company Ltd",
        "slug": "example-company-ltd",
        "cto": null,
        "atv": null,
        "biz": null,
    };

    React.useEffect(() => {
        if (!flash?.calculator) {
            dispatch(setFlash('calculator', {
                title: 'EchoPay Calculator',
                subheader: 'See how much more you make switching to your card enquirer',
                instructions: 'We need three valid valies for Card Turnover/month (CTO), average transaction value (ATV) and percentage of cards which are business as opposed to consumer (BIZ)',
                data,
            }));
        }
    }, [flash, dispatch]);

    const { title, subheader, instructions } = flash?.calculator || {};

    return (
        <>
            <Card
                sx={{
                    width: '100%',
                }}>
                <CardHeader
                    avatar={<Avatar src="/echopay/svg/favicon.svg" />}
                    title={<Typography variant="h6">{title}</Typography>}
                    subheader={<Typography variant="body2" color='secondary'>{subheader}</Typography>}
                />
                <CardContent>

                    <Box id="instructions">
                        <Typography variant="body1">{instructions}</Typography>
                    </Box>
                    <FormMC />
                </CardContent>
                {/* <CardActions>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color="secondary">
                        <Icon icon={"share"} />
                    </IconButton>
                </CardActions> */}
                {/* <pre style={{ padding: '1em', borderRadius: '8px' }}>
                    {JSON.stringify(flash, null, 2)}
                </pre> */}
            </Card >
        </>
    );
};

export default Calculator;
