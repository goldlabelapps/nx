'use client';
import * as React from 'react';
import { 
  Box, 
  Alert,
} from '@mui/material';
// import { Icon, useConfig, navigateTo } from '../../NX/DesignSystem';
// import { useDispatch } from '../../NX/Uberedux';

export default function Orders() {

  return (<>
      <Box>
        <Alert severity="info">
          Orders requires level 3 paywall access
        </Alert>
      </Box>
    </>
  );
}
