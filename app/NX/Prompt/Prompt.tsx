'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Typography,
  Paper,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Icon, navigateTo } from '../DesignSystem';
import { useDispatch } from '../Uberedux';
import VerticalLinearStepper from './components/VerticalLinearStepper';

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


  // LinkedIn input state and validation
  const [input, setInput] = React.useState('');
  const [helperText, setHelperText] = React.useState('Paste a LinkedIn profile URL');

  // LinkedIn URL validation regex
  const linkedInRegex = /^https?:\/\/(www\.)?linkedin\.com\/(in|pub|company)\/[A-Za-z0-9_-]+\/?/i;

  const validate = (val: string) => {
    if (!val) return 'Paste a LinkedIn profile URL';
    if (!linkedInRegex.test(val)) return 'Please enter a valid LinkedIn profile URL.';
    return 'LinkedIn URL looks good!';
  };

  return (
    <Box sx={{ width: '100%' }}>
        <VerticalLinearStepper />
    </Box>
  );
}
