"use client";
import * as React from 'react';
import {
    Box,
    Collapse,
    Button,
} from '@mui/material';
import { useTheme, TextField } from '@mui/material';
import { RequiredTextAS } from './';

export interface I_RequiredTextOptions {
    label?: string;
    helper?: string;
    type?: string;
    error?: boolean;
}

export interface I_RequiredText {
    options?: I_RequiredTextOptions;
}

export default function RequiredText({ options }: I_RequiredText) {

    const defaultValues = {
        label: "Default Label",
        helper: "Default Helper Text",
        type: 'string',
        error: false,
    };

    const mergedOptions = { ...defaultValues, ...options };
    const theme = useTheme();
    const [inputValue, setInputValue] = React.useState("");
    const [touched, setTouched] = React.useState(false);

    const ActionScript = React.useRef<any>(null);
    const clipRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        ActionScript.current = new RequiredTextAS(clipRef);
        ActionScript.current.init();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleBlur = () => {
        setTouched(true);
    };

    // Validation: required field and min length for company name
    let errorText = "";
    let isError = false;
    if (touched) {
        if (inputValue.trim() === "") {
            errorText = "This field is required";
            isError = true;
        } else if (mergedOptions.type === "string" && inputValue.trim().length < 5) {
            errorText = "Company names must have at least 5 characters";
            isError = true;
        }
    }

    const isValid = !isError && inputValue.trim().length >= 5;

    return (
        <Box
            sx={{
                p: 2,
                bgcolor: 'rgba(255, 255, 255, 0.5)',
            }}
        >
            <Box
                ref={clipRef}
                sx={{
                    px: 1,
                    minHeight: 40,
                }}
            >
                <Box sx={{ py: 2 }}>
                    <TextField
                        fullWidth
                        autoFocus
                        variant='standard'
                        label={mergedOptions.label}
                        helperText={isError ? errorText : (isValid ? "" : mergedOptions.helper)}
                        error={isError || mergedOptions.error}
                        required
                        // type={mergedOptions.type}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        sx={{
                            '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.text.primary,
                            },
                            '& .MuiFormLabel-root.Mui-error': {
                                color: theme.palette.primary.main,
                            },
                            '& .MuiFormHelperText-root.Mui-error': {
                                color: theme.palette.divider,
                            },
                        }}
                    />
                    <Collapse in={isValid} sx={{ mt: 2 }}>
                        <Button
                            fullWidth
                            variant="contained"
                        >
                            Next
                        </Button>
                    </Collapse>
                </Box>
            </Box>
        </Box>
    );
}
