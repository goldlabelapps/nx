"use client";
import * as React from "react";
import type { T_ApolloDoc } from '../types';
import {
    useTheme,
    useMediaQuery,
    Button,
    Typography,
} from "@mui/material";
import { useDispatch } from '../../Uberedux';
import { 
    // sendPrompt, --- IGNORE ---
} from '../../Prospects';
import {Icon} from '../../DesignSystem';
import { promptMagentoPlugin, stalkPrompt } from '../../Prospects'

export interface I_WhoIs {
    result?: T_ApolloDoc;
}

export default function WhoIs({ result }: I_WhoIs) {

    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const {
        first_name = '',
        last_name = '',
        person_linkedin_url = '',
        title = '',
        company_name = '',
        seniority = '',
        sub_departments = '',
        country = '',
        primary_intent_topic = '',
        primary_intent_score = '',
        secondary_intent_topic = '',
        secondary_intent_score = '',
    } = result || {};

    const summary = `Click to stalk ${first_name} ${last_name}${title ? `, ${title}` : ''}${company_name ? ` at ${company_name}` : ''} by looking up their LinkedIn profile`;

    const prompt = stalkPrompt({
        first_name,
        last_name,
        person_linkedin_url,
        title,
        company_name,
        seniority,
        sub_departments,
        country,
        primary_intent_topic,
        primary_intent_score,
        secondary_intent_topic,
        secondary_intent_score,
    });

    return (
            <>
            {/* <pre style={{fontSize:9}}>{JSON.stringify(prompt, null, 2)}</pre> */}
             <Typography variant="body2" sx={{my:2}}>
                {summary}
            </Typography>   
            <Button
                
                variant="contained"
                color="primary"
                startIcon={<Icon icon="stalk" />}
                onClick={() => {
                    // dispatch(sendWhoIs(prompt));
                }}>
                Stalk {first_name}
            </Button>
        </>
    );
}

