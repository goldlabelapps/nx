'use client';
import * as React from 'react';
import {
  Box,
  Typography,
  CardContent,
} from '@mui/material';

export interface I_ReadDoc {
  collection: string;
  doc?: Record<string, any>;
  typescript?: Record<string, any>;
}

export default function ReadDoc({
  collection,
  doc,
}: I_ReadDoc) {

  if (!doc) return <CardContent>
    LIST <strong>{collection}</strong> docs
  </CardContent>;

  return (
    <Box sx={{}}>
      <Typography>
        {doc?.title || doc?.siteName}
      </Typography>
    </Box>
  );
}
