'use client';
import * as React from 'react';
import { T_Config, T_Frontmatter } from '../types.d';
import { Box, Button } from '@mui/material';
import { useAll, useDispatch } from '../Uberedux';
import { setEchoPayKey } from '../EchoPay';

export interface I_EchoPay {
  config: T_Config;
  frontmatter?: T_Frontmatter;
}

export default function EchoPay({ config }: I_EchoPay) {
  const dispatch = useDispatch();
  const echopay = config.cartridges?.echopay;
  if (!echopay || !echopay.enabled) return null;
  const redux = useAll();

  const handleClick = () => {
    console.log('handleClick');

  };

  return (
    <Box
      id="echopay"
      sx={{
        border: '1px solid black',
      }}>
      <Button onClick={handleClick} sx={{ m: 2 }} variant="contained">
        Button
      </Button>
      <pre style={{ padding: '1em', borderRadius: '8px' }}>
        redux: {JSON.stringify(redux, null, 2)}
      </pre>
    </Box>
  );
}
