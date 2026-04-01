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



export interface I_Prompt {
    result?: T_ApolloDoc;
}

export default function Prompt({ result }: I_Prompt) {

    const {
        first_name,
        last_name,
        person_linkedin_url,
    } = result || {};

    // Example prompt string to be posted to LLM
    const [prompt, setPrompt] = React.useState<string>(
        `We are creating a personalised email to ${first_name} ${last_name}. His LinkedIn is here ${person_linkedin_url}\nResearch the profile and have a look for a link for their past and present experience and what that could possibly have to do with their company's Magento store. Create a personalised email intro based on this research.`
    );

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
                    helperText="The prompt is created based on the prospect's data and will be sent to the LLM for processing. You can edit it before submission."
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    variant="filled"
                    multiline
                    minRows={6}
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
                    endIcon={<Icon icon="right" />}
                    onClick={() => {
                        // Here you would typically dispatch an action to send the prompt to your backend/LLM
                        console.log('Prompt submitted:', prompt);
                        // For example:
                        // dispatch(sendPromptToLLM(prompt));
                    }}>
                    Do the clever thing
                </Button>
            </CardActions>
        </>
    );
}

