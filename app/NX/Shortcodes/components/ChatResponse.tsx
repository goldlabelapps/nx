'use client';
import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { CleverText } from '../../DesignSystem';


export default function ChatResponse({
  text = '',
}: {
  text?: string;
}) {

  return (
    <Box>
      <CleverText options={{ 
        id: 'cleverText', 
        markdown: text,
        onFinish: () => {
          console.log('Finished typing');
        },
      }} />
    </Box>
  );
}
