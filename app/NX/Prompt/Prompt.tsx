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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    setHelperText(validate(val));
  };

  // const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   const val = e.clipboardData.getData('Text');
  //   // Use setTimeout to ensure only clipboard data is set, avoiding race with native paste
  //   setTimeout(() => {
  //     setInput(val);
  //     setHelperText(validate(val));
  //   }, 100);
  // };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper 
        variant="outlined" 
        elevation={3} 
        sx={{ 
          p: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2 
        }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title || 'Paste LinkedIn Profile'}
        </Typography>
        <TextField
          value={input}
          onChange={handleInputChange}
          // onPaste={handlePaste}
          placeholder="https://www.linkedin.com/in/username"
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="link" color="primary" />
              </InputAdornment>
            ),
            sx: {
              py: 1.5,
              px: 2,
            },
          }}
          helperText={helperText}
          FormHelperTextProps={{ 
            sx: { 
              color: helperText === 'LinkedIn URL looks good!' ? 'primary.main' : 'text.secondary' 
            } }}
        />
      </Paper>
    </Box>
  );
}
