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
    Slider,
    Typography,
    InputAdornment,
} from '@mui/material';
import { CleverText, DumbText } from '../';
import { makeMDResponse } from '../../';
import { useFlash, setFlash } from '../../../../app/NX/Flash';
import { useDispatch } from '../../../../app/NX/Uberedux';
import { Icon } from '../../../../app/NX/DesignSystem';

export const defaultCompany = {
    name: 'Example Ltd',
    biz: '75',
    cto: '1000000',
    atv: '500',
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

    // Calculate costs using calculateEchoPayProfit
    const { currentCostPerMonth, echoPayCostPerMonth } = require('../../lib/calculateEchoPayProfit').default({
        cto: parseFloat(fields.cto),
        atv: parseFloat(fields.atv),
        biz: parseFloat(fields.biz),
    });


    const handleShare = () => {
        dispatch(setFlash("goViralOpen", true));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && valid) {
            nextStep();
        }
    };

    const handleBack = () => {
        window.location.reload();
    }

    const validate = () => {
        // All fields must be non-empty and name at least 3 chars
        if (
            String(fields.name).trim().length < 3 ||
            String(fields.cto).trim() === '' ||
            String(fields.atv).trim() === '' ||
            String(fields.biz).trim() === ''
        ) {
            setValid(false);
            return;
        }
        // Parse numbers
        const cto = parseFloat(fields.cto);
        const atv = parseFloat(fields.atv);
        const biz = parseFloat(fields.biz);
        // Validate numbers
        if (
            isNaN(cto) || isNaN(atv) || isNaN(biz) ||
            cto <= 0 || atv <= 0 || biz <= 0 || biz > 100 ||
            atv > cto
        ) {
            setValid(false);
            return;
        }
        setValid(true);
    }

    const nextStep = () => {
        if (thisStep?.num === 1) {
            setTimeout(() => {
                dispatch(setFlash('thisStep', {
                    num: 2,
                    description: 'Reveal fields',
                }));
            }, 500);
        }
        if (thisStep?.num === 2) {
            console.log('NOT NOW')
            dispatch(setFlash('thisStep', {
                num: 3,
                description: 'Close fields and reveal response',
            }));
            const mdResponse = makeMDResponse({
                name: fields.name,
                cto: parseFloat(fields.cto),
                atv: parseFloat(fields.atv),
                biz: parseFloat(fields.biz),

            })
            setResponse(mdResponse);
        };

    }

    React.useEffect(() => {
        ActionScript.current = new NewCompanyAS(clipRef);
        ActionScript.current.init();
        if (thisStep?.num === 1) {
            dispatch(setFlash("playing", true));
        }
    }, [thisStep]);

    // Run validate on mount
    React.useEffect(() => {
        validate();
    }, []);

    if (!thisStep) return null;

    return (
        <Box id={mergedOptions.id}>

            <Box ref={clipRef}>

                {/* <pre>flash: {JSON.stringify(flash, null, 2)}</pre> */}

                {/* Step 1: Intro CleverText (show in step 1 and 2) */}
                <Collapse in={thisStep?.num === 1 || thisStep?.num === 2}>
                    <CleverText options={{
                        id: '',
                        markdown: mergedOptions.markdown,
                        onFinish: nextStep,
                    }} />
                </Collapse>

                {/* Step 2: Form fields */}
                <Collapse in={thisStep?.num === 2}>
                    <Box id="newcompany_mc" onKeyDown={handleKeyDown}>

                        <Grid container spacing={2} sx={{ px: 2, mt: 1 }}>
                            <Grid size={{ xs: 6 }}>
                                <Box sx={{ mx: 0 }}>
                                    <TextField
                                        fullWidth
                                        label="Company"
                                        color="primary"
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
                                <Box sx={{ mx: 0 }}>
                                    <Typography variant="caption"  >
                                        Card ratio ({Number(fields.biz)}%)
                                    </Typography>
                                    <Slider
                                        color="primary"
                                        value={Number(fields.biz)}
                                        min={0}
                                        max={100}
                                        step={1}
                                        valueLabelDisplay="off"
                                        onChange={(_, value) => {
                                            const val = typeof value === 'number' ? value : (Array.isArray(value) ? value[0] : 0);
                                            setFields(f => ({ ...f, biz: String(val) }));
                                            dispatch(setFlash('biz', String(val)));
                                            validate();
                                        }}
                                    />
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 6 }}>
                                <Box sx={{ mx: 0 }}>
                                    <TextField
                                        id="input_cto"
                                        label="Card Turnover"
                                        color="primary"
                                        variant="standard"
                                        type="number"
                                        inputProps={{ min: 0, step: 'any' }}
                                        value={fields.cto}
                                        onChange={e => {
                                            const value = e.target.value;
                                            setFields(f => ({ ...f, cto: value }));
                                            dispatch(setFlash('cto', value));
                                            setTimeout(validate, 0);
                                        }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">£</InputAdornment>
                                        }}
                                    />
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 6 }}>
                                <Box sx={{ mx: 0 }}>
                                    <TextField
                                        id="input_atv"
                                        label="Average Transaction"
                                        color="primary"
                                        size='small'
                                        variant="standard"
                                        type="number"
                                        inputProps={{ min: 0, step: 'any' }}
                                        value={fields.atv}
                                        onChange={e => {
                                            const value = e.target.value;
                                            setFields(f => ({ ...f, atv: value }));
                                            dispatch(setFlash('atv', value));
                                            setTimeout(validate, 0);
                                        }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">£</InputAdornment>
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Box sx={{ my: 2 }}>
                                    <Typography variant="body1"  >
                                        Card acquisition cost/month <span style={{ fontWeight: 'bold' }}>£{currentCostPerMonth}</span>. With EchoPay? <span style={{ fontWeight: 'bold' }}>£{echoPayCostPerMonth}</span>.
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12 }}>

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
                                        onClick={nextStep}
                                        variant='contained'
                                        color="primary"
                                        fullWidth
                                        endIcon={<Icon icon="right" />}
                                        disabled={!valid}
                                    >
                                        Show the maths
                                    </Button>
                                </Box>
                            </Grid>

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
