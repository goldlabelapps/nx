"use client";
import type { I_NewCompany } from '../../types'
import * as React from 'react';
import { NewCompanyAS } from './';
import {
    Box,
    Grid,
    TextField,
    Button,
    Collapse,
} from '@mui/material';
import { CleverText, NumberSlider } from '../';
// import { makeMDResponse } from '../../';
import { useFlash, setFlash } from '../../../../app/NX/Flash';
import { useDispatch } from '../../../../app/NX/Uberedux';
import { Icon } from '../../../../app/NX/DesignSystem';

export const defaultCompany = {
    name: 'Example Ltd',
    biz: '64.5',
    cto: '903450',
    atv: '572',
    markdown: `## Example Markdown`
};

export default function NewCompany({ options }: I_NewCompany) {

    const dispatch = useDispatch();
    const nameInputRef = React.useRef<HTMLInputElement>(null);
    const [response, setResponse] = React.useState("thinking...");
    const [valid, setValid] = React.useState(false);
    const [fields, setFields] = React.useState(defaultCompany);
    const defaultOptions = {
        id: undefined,
        markdown: "New company default text",
    };
    const mergedOptions = { ...defaultOptions, ...options };
    const ActionScript = React.useRef<any>(null);
    const clipRef = React.useRef<HTMLDivElement>(null);
    const flash = useFlash();
    const thisStep = flash.thisStep;

    // Set default values in flash redux if they don't exist
    React.useEffect(() => {
        if (!flash.name) {
            dispatch(setFlash('name', defaultCompany.name));
        }
        if (!flash.biz) {
            dispatch(setFlash('biz', defaultCompany.biz));
        }
        if (!flash.cto) {
            dispatch(setFlash('cto', defaultCompany.cto));
        }
        if (!flash.atv) {
            dispatch(setFlash('atv', defaultCompany.atv));
        }
    }, [flash, dispatch]);


    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            nextStep();
        }
    };

    const handleBack = () => {
        window.location.reload();
    };

    const handleShare = () => {
        dispatch(setFlash("goViralOpen", true));
    };

    const nextStep = () => {
        if (thisStep?.num === 1) {
            setTimeout(() => {
                dispatch(setFlash('thisStep', {
                    num: 2,
                    description: 'Reveal fields',
                }));
            }, 750);
        }
    }

    React.useEffect(() => {
        ActionScript.current = new NewCompanyAS(clipRef);
        ActionScript.current.init();
        if (thisStep?.num === 1) {
            dispatch(setFlash("playing", true));
        }
    }, [thisStep]);

    if (!thisStep) return null;

    return (
        <Box id={mergedOptions.id}>

            <Box ref={clipRef}>

                {/* <pre>flash: {JSON.stringify(flash, null, 2)}</pre> */}

                {/* Step 1: Intro CleverText (show in step 1 and 2) */}
                <Collapse in={thisStep?.num === 1 || thisStep?.num === 2}>
                    <CleverText options={{
                        id: 'intro_text',
                        markdown: mergedOptions.markdown,
                        onFinish: nextStep,
                    }} />
                </Collapse>

                {/* Step 2: Form fields */}
                <Collapse in={thisStep?.num === 2}>
                    <Box id="input_fields" onKeyDown={handleKeyDown}>

                        <Grid container spacing={2} sx={{ px: 2, mt: 1 }}>
                            <Grid size={{ xs: 6 }}>
                                <Box sx={{ mb: 2 }}>
                                    <TextField
                                        fullWidth
                                        label="Company name"
                                        variant="standard"
                                        id="input_name"
                                        value={fields.name}
                                        inputRef={nameInputRef}
                                        onChange={e => {
                                            const value = e.target.value;
                                            setFields(f => ({ ...f, name: value }));
                                            dispatch(setFlash('name', value));
                                            setTimeout(validate, 0);
                                        }}
                                    />
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 6 }}>
                                <Box sx={{ my: 2 }}>
                                    the figures
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 4 }}>
                                <Box sx={{ mx: 0 }}>
                                    <NumberSlider
                                        options={{
                                            id: "input_cto",
                                            prefix: "CTO",
                                            type: "currency",
                                            label: "Card turnover per month",
                                            flashKey: "cto",
                                            range: {
                                                min: 0,
                                                max: 2000000,
                                                step: 'any'
                                            },
                                        }}
                                        onChange={e => {
                                            const value = e.target.value;
                                            setFields(f => ({ ...f, cto: value }));
                                            dispatch(setFlash('cto', value));
                                            setTimeout(validate, 0);
                                        }}
                                    />
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 4 }}>
                                <Box sx={{ mx: 0 }}>
                                    <NumberSlider
                                        options={{
                                            id: "input_atv",
                                            prefix: "ATV",
                                            label: "Average Transaction Value",
                                            type: "currency",
                                            flashKey: "atv",
                                            range: {
                                                min: 0,
                                                max: 5000,
                                                step: 'any'
                                            },
                                        }}
                                        onChange={e => {
                                            const value = e.target.value;
                                            setFields(f => ({ ...f, atv: value }));
                                            dispatch(setFlash('atv', value));
                                            setTimeout(validate, 0);
                                        }}
                                    />
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 4 }}>
                                <Box sx={{ mx: 0 }}>
                                    <NumberSlider
                                        options={{
                                            id: "input_biz",
                                            prefix: "BIZ",
                                            label: "Card ratio",
                                            flashKey: "biz",
                                            type: "percentage",
                                            range: {
                                                min: 0,
                                                max: 100,
                                                step: 1
                                            },
                                        }}
                                        onChange={e => {
                                            const value = e.target.value;
                                            setFields(f => ({ ...f, biz: value }));
                                            dispatch(setFlash('biz', value));
                                            setTimeout(validate, 0);
                                        }}
                                    />
                                </Box>
                            </Grid>




                            {/* 

                            <Grid size={{ xs: 12 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                    <Button
                                        sx={{ mt: 2 }}
                                        onClick={nextStep}
                                        variant='contained'
                                        color="secondary"
                                        // fullWidth
                                        endIcon={<Icon icon="right" />}
                                        disabled={!valid}
                                    >
                                        Next
                                    </Button>
                                </Box>
                            </Grid> */}

                        </Grid>
                        {/* End of Grid container */}

                    </Box>
                </Collapse>

                {/* Step 3: Response CleverText */}
                <Collapse in={thisStep?.num === 3}>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            startIcon={<Icon icon="left" />}
                            variant='contained'
                            color="secondary"
                            onClick={handleBack}
                            sx={{ px: 3 }}
                        >
                            Back
                        </Button>

                        <Button
                            fullWidth
                            variant='contained'
                            color="secondary"
                            onClick={handleShare}
                            startIcon={<Icon icon="share" />}
                        >
                            Share
                        </Button>
                    </Box>

                    <Box sx={{}}>
                        {thisStep?.num === 3 ? <CleverText
                            options={{
                                id: 'response_mc',
                                markdown: response,
                                onFinish: nextStep,
                            }}
                        /> : null}
                    </Box>
                </Collapse>

            </Box>
        </Box>
    );
}
