// /Users/goldlabel/GitHub/example-app/gl-core/cartridges/Shortcodes/components/LinkOut.tsx
'use client';
import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Typography,
  Grid,
} from '@mui/material';
import { Icon } from '../../DesignSystem';

export default function BuyNow({
  url,
  label = 'Buy Now',
  icon = 'link',
}: {
  url: string;
  label?: string;
  icon?: string;
}) {
  const handleClick = () => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card variant="outlined">
      <CardActionArea onClick={handleClick}>
        <CardHeader
          sx={{ alignItems: 'flex-start' }}
          avatar={<Icon icon={"shop"} color="primary" />}
          title={<Typography variant="h6">{label}</Typography>}
        />
      </CardActionArea>
    </Card>
  );
}
