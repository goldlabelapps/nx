"use client";
import type { I_NewCompany } from '../../types'
import * as React from 'react';
import { NewCompanyAS } from './';
import {
    useTheme,
    Box,
    darken,
    TextField,
    Button,
    Collapse,
} from '@mui/material';
import { CleverText } from '../';
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
        name: '',
        cto: '1000000', // Card Turnover per month
        atv: '500',     // Average transaction value
        biz: '75',      // Business card ratio (percentage)
    });

    // Individual field validation (must be after fields is declared)
    const isNameValid = fields.name.trim() !== '';
    const ctoNum = parseFloat(fields.cto);
    const atvNum = parseFloat(fields.atv);
    const bizNum = parseFloat(fields.biz);
    const isCtoValid = fields.cto.trim() !== '' && !isNaN(ctoNum) && ctoNum > 0;
    const isAtvValid = fields.atv.trim() !== '' && !isNaN(atvNum) && atvNum > 0 && atvNum <= ctoNum;
    const isBizValid = fields.biz.trim() !== '' && !isNaN(bizNum) && bizNum > 0 && bizNum <= 100;

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
        // All fields must be non-empty
        if (
            fields.name.trim() === '' ||
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
        let step = null;
        if (thisStep.num === 1) {
            dispatch(setFlash('thisStep', {
                num: 2,
                description: 'Reveal fields',
            }));
            // Focus company name input if not already focused
            setTimeout(() => {
                if (nameInputRef.current && document.activeElement !== nameInputRef.current) {
                    nameInputRef.current.focus();
                }
            }, 100);
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
            <Box
                ref={clipRef}
                sx={{
                    bgcolor: darken(theme.palette.background.paper, 0.15),
                    borderRadius: 2,
                    p: 2,
                }}
            >
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
                        <Box sx={{ display: 'flex', mb: 3 }}>
                            <TextField
                                fullWidth
                                id="input_name"
                                label="Company name"
                                variant="standard"
                                value={fields.name}
                                inputRef={nameInputRef}
                                onChange={e => {
                                    const value = e.target.value;
                                    setFields(f => ({ ...f, name: value }));
                                    dispatch(setFlash('name', value));
                                    setTimeout(validate, 0);
                                }}
                            />
                            {isNameValid && <Icon icon="tick" color="success" />}
                        </Box>

                        <Box sx={{ display: 'flex', my: 2 }}>
                            <TextField
                                fullWidth
                                id="input_cto"
                                label="Card acquisition per month"
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
                            />
                            {isCtoValid && <Icon icon="tick" color="success" />}
                        </Box>

                        <Box sx={{ display: 'flex', my: 2 }}>
                            <TextField
                                fullWidth
                                id="input_atv"
                                label="Average transaction value"
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
                            />
                            {isAtvValid && <Icon icon="tick" color="success" />}
                        </Box>

                        <Box sx={{ display: 'flex', my: 2 }}>
                            <TextField
                                fullWidth
                                id="input_biz"
                                label="Business card ratio as a percentage"
                                variant="standard"
                                type="number"
                                inputProps={{ min: 0, max: 100, step: 'any' }}
                                value={fields.biz}
                                onChange={e => {
                                    const value = e.target.value;
                                    setFields(f => ({ ...f, biz: value }));
                                    dispatch(setFlash('biz', value));
                                    setTimeout(validate, 0);
                                }}
                            />
                            {isBizValid && <Icon icon="tick" color="success" />}
                        </Box>

                        <Box sx={{ display: 'flex', my: 2 }}>
                            <Button
                                onClick={nextStep}
                                fullWidth
                                type="submit"
                                variant="contained"
                                sx={{ mt: 2 }}
                                startIcon={<Icon icon="maths" />}
                                disabled={!valid}
                            >
                                Do the maths
                            </Button>
                        </Box>
                    </Box>
                </Collapse>

                {/* Step 3: Response CleverText */}
                <Collapse in={thisStep.num === 3}>
                    <Box sx={{ px: 2 }}>
                        {thisStep.num === 3 ? <CleverText
                            key={response}
                            options={{
                                id: 'response_mc',
                                markdown: response,
                            }}
                        /> : null}

                    </Box>
                </Collapse>
            </Box>
        </Box>
    );
}
