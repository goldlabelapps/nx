// /Users/goldlabel/GitHub/example-app/gl-core/cartridges/Shortcodes/components/LinkOut.tsx
'use client';
import React from 'react';
import {
  Box,
} from '@mui/material';
import { Icon } from '../../DesignSystem';

export default function FeedbackBtn({
  url,
  label = 'Buy Now',
  icon = 'link',
}: {
  url: string;
  label?: string;
  icon?: string;
}) {

  return (
    <Box>
      FeedbackBtn
      {label}
    </Box>
  );
}
