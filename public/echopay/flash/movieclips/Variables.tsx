'use client';
import * as React from 'react';
import {
  Box,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../app/NX/DesignSystem';

export default function Variables() {
  const [cto, setCto] = React.useState('1000000'); // CTO default: 1 million
  const [atv, setAtv] = React.useState('500');     // ATV default: 500

  return (
    <Box sx={{ overflow: 'visible', mt: 3 }}>
      <TextField
        fullWidth
        sx={{ my: 4 }}
        label="Card Turnover per month (CTO)"
        value={cto}
        onChange={e => setCto(e.target.value)}
        InputProps={{
          startAdornment: <span style={{ marginRight: 4 }}>£</span>
        }}
      />

      <TextField
        fullWidth
        label="Average Transaction Value (ATV)"
        value={atv}
        onChange={e => setAtv(e.target.value)}
        InputProps={{
          startAdornment: <span style={{ marginRight: 4 }}>£</span>
        }}
      />
    </Box>
  );
}
