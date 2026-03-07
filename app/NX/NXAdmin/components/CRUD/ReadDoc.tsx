'use client';
import * as React from 'react';
import {
  Box,
  Typography
} from '@mui/material';

export interface I_ReadDoc {
  doc: Record<string, any>;
  typescript: Record<string, any>;
}

export default function ReadDoc({ doc, typescript }: I_ReadDoc) {

  const { title } = doc || {};

  return (
    <Box sx={{}}>
      <Typography>
        {doc.title || doc.siteName}
      </Typography>
    </Box>
  );
}
