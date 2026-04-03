"use client";
import * as React from "react";
import type { T_ApolloDoc } from '../types';
import {
    useTheme,
    useMediaQuery,
    TextField,
    Button,
} from "@mui/material";
import { useDispatch } from '../../Uberedux';
import { 
    sendPrompt,
} from '../../Prospects';
import {Icon} from '../../DesignSystem';
import { promptMagentoPlugin } from '../../Prospects'

export interface I_Prompt {
    result?: T_ApolloDoc;
}

export default function Prompt({ result }: I_Prompt) {

    const {
        first_name,
        last_name,
        person_linkedin_url,
    } = result || {};

    const prompt = promptMagentoPlugin({
        first_name: first_name || '',
        last_name: last_name || '',
        person_linkedin_url: person_linkedin_url || '',
    });


    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
            <>
                {/* <TextField
                    fullWidth
                    label="AI Prompt"
                    value={prompt}
                    variant="filled"
                    multiline
                    maxRows={13}
                    InputProps={{
                        style: { 
                            fontFamily: 'monospace', 
                            fontSize: '0.8rem', 
                        }
                    }}
                /> */}
                <Button 
                    sx={{mx:1, mb:2}}
                    fullWidth
                    variant="contained" 
                    color="primary" 
                    startIcon={<Icon icon="ai" />}
                    onClick={() => {
                        dispatch(sendPrompt(prompt));
                    }}>
                    Do the clever thing
                </Button>
        </>
    );
}

