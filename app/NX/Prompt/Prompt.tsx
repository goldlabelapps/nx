'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Typography,
  Box,
  TextField,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Icon } from '../DesignSystem';
import { useDispatch } from '../Uberedux';

export default function Prompt({
  url = null,
  icon = 'link',
  title = null,
  description = null
}: {
  url?: string | null;
  icon?: string | null;
  title?: string | null;
  description?: string | null;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [input, setInput] = React.useState('');
  const [helperText, setHelperText] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const linkedInRegex = /^https?:\/\/(www\.)?linkedin\.com\/(in|pub|company)\/[A-Za-z0-9_-]+\/?/i;

  const validate = (val: string) => {
    if (!val) return '';
    if (!linkedInRegex.test(val)) return 'Invalid LinkedIn profile URL.';
    return '';
  };

  return (
    <Stepper 
      activeStep={activeStep}
      orientation="vertical"
      sx={{ 
        mx: 2,
      }}>
        <Step>
          <StepLabel>  
            <Typography variant="h6">
              Analyse
            </Typography>
          </StepLabel>
          <StepContent>
            <Typography variant="body2">
              Judges whether the LinkedIn profile belongs to a person who is technical or business-oriented.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                variant="standard"
                placeholder='Paste LinkedIn URL here...'
                helperText={helperText}
                value={input}
                onChange={(e) => {
                  const val = e.target.value;
                  setInput(val);
                  setHelperText(validate(val));
                  setIsValid(linkedInRegex.test(val));
                }}
                InputProps={{
                  endAdornment: (
                    input ? (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="clear input"
                          onClick={() => {
                            setInput('');
                            setHelperText(validate(''));
                            setIsValid(false);
                          }}
                          edge="end"
                        >
                          <Icon icon="close" />
                        </IconButton>
                      </InputAdornment>
                    ) : null
                  )
                }}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <Button
                variant="contained"
                startIcon={<Icon icon="google" />}
                endIcon={<Icon icon="right" />}
                sx={{ mt: 1, mr: 1 }}
                disabled={!isValid}
                onClick={() => setActiveStep(1)}
              >
                Analyse
              </Button>
            </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <Typography variant="h6">
            Engineer Prompt
            </Typography>
          </StepLabel>
          <StepContent>
            <Typography variant="body2">
              Here we'll brief Gemini on what we want
            </Typography>
            <Box sx={{ my: 2 }}>
              <Button
                variant="outlined"
                startIcon={<Icon icon="left" />}
                onClick={() => setActiveStep(0)}
              >
                Back
              </Button>
            </Box>
          </StepContent>
        </Step>
      </Stepper>
    );
}

/*
What we aim to do is take a LinkedIn profile and save ourselves the time 
of analysing ourselves by having AI (in this case Google's Gemini) do it for us. We're 
interested in whether the profile belongs to a person who is technical or business-oriented. 
This judgement will determine how the app behaves. Paste a LinkedIn profile URL to begin
*/