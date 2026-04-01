"use client";
import * as React from "react";
import type { T_ApolloDoc } from '../types';
import {
    CardHeader,
    useTheme,
    useMediaQuery,
    TextField,
    CardContent,
    CardActions,
    Button,
    Box,
} from "@mui/material";
import { useDispatch } from '../../Uberedux';
import { 
    useProspects, 
    updateQuery,
    setProspects,
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

    React.useEffect(() => {
        // dispatch(setProspects('basketOpen', true));
    }, [isMobile]);

    const handleClose = () => {
        // dispatch(setProspects('basketOpen', false));
    };

    return (
        <>
            <CardContent>
                <TextField
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
                />
            </CardContent>
            <CardActions>
                <Button 
                    sx={{mx:1}}
                    fullWidth
                    variant="contained" 
                    color="primary" 
                    startIcon={<Icon icon="ai" />}
                    onClick={() => {
                        // Here you would typically dispatch an action to send the prompt to your backend/LLM
                        // console.log('Prompt submitted:', prompt);
                        // For example:
                        // dispatch(sendPromptToLLM(prompt));
                    }}>
                    Do the clever thing
                </Button>
            </CardActions>
        </>
    );
}

