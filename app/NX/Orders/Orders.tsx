'use client';
import * as React from 'react';
import { T_Meta, T_Frontmatter } from '../types.d';
import { useRouter } from 'next/navigation';
import { 
  Box, 
  Alert,
} from '@mui/material';
// import { Icon, useConfig, navigateTo } from '../../NX/DesignSystem';
// import { useDispatch } from '../../NX/Uberedux';

export default function Orders({
  meta,
  frontmatter,
}: {
  meta?: T_Meta,
  frontmatter?: T_Frontmatter
}) {

  return (<>
      <Box>
        <Alert severity="info">
          Orders requires level 3 paywall access
        </Alert>
      </Box>
    </>
  );
}
