"use client";
import type { I_NewCompany } from '../../types'
import * as React from 'react';
import { NewCompanyAS } from './';
import {
    darken,
    useTheme,
    Box,
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

export default function NewCompany({ options }: I_NewCompany) {
    // Handler for Enter key to submit form
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && valid) {
            nextStep();
        }
    };
    // Ref for company name input
    const nameInputRef = React.useRef<HTMLInputElement>(null);
    const [response, setResponse] = React.useState("thinking...");
    const [valid, setValid] = React.useState(false);
    const [fields, setFields] = React.useState({
        name: 'Example Company Ltd',
        biz: '64.6',
        cto: '8905000',
        atv: '476',
    });

    // Individual field validation (must be after fields is declared)
    const isNameValid = typeof fields.name === 'string' && fields.name.trim().length >= 3;
    const ctoNum = parseFloat(String(fields.cto));
    const atvNum = parseFloat(String(fields.atv));
    const bizNum = parseFloat(String(fields.biz));
    const isCtoValid = typeof fields.cto === 'string' && fields.cto.trim() !== '' && !isNaN(ctoNum) && ctoNum > 0;
    const isAtvValid = typeof fields.atv === 'string' && fields.atv.trim() !== '' && !isNaN(atvNum) && atvNum > 0 && atvNum <= ctoNum;
    const isBizValid = typeof fields.biz === 'string' && fields.biz.trim() !== '' && !isNaN(bizNum) && bizNum > 0 && bizNum <= 100;

    const defaultOptions = {
        id: undefined,
        markdown: "New company default text",
    };
    const mergedOptions = { ...defaultOptions, ...options };

    const ActionScript = React.useRef<any>(null);
    const clipRef = React.useRef<HTMLDivElement>(null);
    const theme = useTheme();
    const flash = useFlash();
    const dispatch = useDispatch();
    const thisStep = flash.thisStep;

    const validate = () => {
        // All fields must be non-empty and name at least 3 chars
        if (
            fields.name.trim().length < 3 ||
            fields.cto.trim() === '' ||
            fields.atv.trim() === '' ||
            fields.biz.trim() === ''
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
        if (thisStep.num === 1) {
            setTimeout(() => {
                dispatch(setFlash('thisStep', {
                    num: 2,
                    description: 'Reveal fields',
                }));
            }, 1000);
            setTimeout(() => {
                if (nameInputRef.current && document.activeElement !== nameInputRef.current) {
                    nameInputRef.current.focus();
                }

            }, 2000);
        }
        if (thisStep.num === 2) {
            dispatch(setFlash('thisStep', {
                num: 3,
                description: 'Close fields and reveal response',
            }));
            // makeMDResponse
            const mdResponse = makeMDResponse({
                name: fields.name,
                cto: parseFloat(fields.cto),
                atv: parseFloat(fields.atv),
                biz: parseFloat(fields.biz),

            })
            setResponse(mdResponse);
        };
        if (thisStep.num === 3) {
            dispatch(setFlash('thisStep', {
                num: 4,
                description: 'Play response animation',
            }));

        };

        if (thisStep.num === 4) {
            dispatch(setFlash('thisStep', {
                num: 5,
                description: 'Go viral',
            }));

        };

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
        <Box
            id={mergedOptions.id}
        >
            <Box ref={clipRef} sx={{
                // border: `1px solid ${darken(theme.palette.divider, 0.9)}`,
                // bgcolor: darken(theme.palette.background.paper, 0.25),
                // borderRadius: 2,
                px: 1,
            }}>

                {/* <pre>flash: {JSON.stringify(flash, null, 2)}</pre> */}

                {/* Step 1: Intro CleverText (show in step 1 and 2) */}
                <Collapse in={thisStep.num === 1 || thisStep.num === 2}>
                    <CleverText options={{
                        id: '',
                        markdown: mergedOptions.markdown,
                        onFinish: nextStep,
                    }} />
                </Collapse>

                {/* Step 2: Form fields */}
                <Collapse in={thisStep.num === 2}>
                    <Box id="newcompany_mc" sx={{ px: 2 }} onKeyDown={handleKeyDown}>

                        <Box sx={{ display: 'flex', my: 2, }}>
                            <TextField
                                fullWidth
                                size='small'
                                variant="filled"
                                id="input_name"
                                label="Company name"
                                value={fields.name}
                                inputRef={nameInputRef}
                                onChange={e => {
                                    const value = e.target.value;
                                    setFields(f => ({ ...f, name: value }));
                                    dispatch(setFlash('name', value));
                                    setTimeout(validate, 0);
                                }}
                            />
                            {isNameValid && <Box sx={{ mt: 1, ml: 1 }}><Icon icon="tick" color="disabled" /></Box>}
                        </Box>

                        <Box sx={{ display: 'flex', mb: 2 }}>
                            <TextField
                                id="input_cto"
                                label="Card acquisition per month"
                                size='small'
                                variant="filled"
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
                            {isCtoValid && <Box sx={{ mt: 1, ml: 1 }}><Icon icon="tick" color="disabled" /></Box>}
                        </Box>

                        <Box sx={{ display: 'flex', mb: 1 }}>
                            <TextField
                                id="input_atv"
                                label="Average transaction value"
                                size='small'
                                variant="filled"
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
                            {isAtvValid && <Box sx={{ mt: 1, ml: 1 }}><Icon icon="tick" color="disabled" /></Box>}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Box sx={{}}>
                                <Typography variant="body2" sx={{}} >
                                    Business card ratio ({Number(fields.biz)}%)
                                </Typography>
                                <Slider
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
                            {isBizValid && <Box sx={{ mt: 2, ml: 2 }}><Icon icon="tick" color="disabled" /></Box>}
                        </Box>


                        {valid ? <Box sx={{ display: 'flex' }}>
                            <Button
                                onClick={nextStep}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2 }}
                                endIcon={<Icon icon="right" />}
                                disabled={!valid}
                            >
                                Do the maths
                            </Button>
                        </Box> : null}

                    </Box>
                </Collapse>

                {/* Step 3: Response CleverText */}
                <Collapse in={thisStep.num === 3}>
                    <Box sx={{ px: 1 }}>
                        {thisStep.num === 3 ? <CleverText
                            options={{
                                id: 'response_mc',
                                markdown: response,
                                onFinish: nextStep,
                            }}
                        /> : null}
                    </Box>
                </Collapse>


                {/* /* Step 4: Spread Virus */}
                <Collapse in={thisStep.num === 4}>
                    <Box sx={{ p: 1, }}>
                        <DumbText
                            options={{
                                id: 'dumbresponse_mc',
                                markdown: response,
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                            startIcon={<Icon icon="share" />}
                        >
                            Share
                        </Button>
                    </Box>
                </Collapse>

            </Box>
        </Box >
    );
}
