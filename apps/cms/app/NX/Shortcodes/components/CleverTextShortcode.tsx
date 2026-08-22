'use client';
import React from 'react';
import {
  Box,
} from '@mui/material';
import { CleverText } from '../../DesignSystem';

export default function CleverTextShortcode({
  text = null
}: {
  text?: string | null;
}) {
  if (!text) return null;
  
  return (
    <Box>
      <CleverText options={{ 
        id: 'cleverText', 
        markdown: text,
        onFinish: () => {
          console.log('CleverTextShortcode');
        },
      }} />
    </Box>
  );
}
