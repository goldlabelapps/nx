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
}: I_ReadDoc) {

  return <CardContent>
    LIST <strong>{collection}</strong> docs
  </CardContent>
}
