'use client';
import * as React from 'react';
import { T_Config, T_Frontmatter } from '../types.d';
import { Box, Button } from '@mui/material';
// import { setEchoPayCartridge } from '../EchoPay';

export interface I_EchoPay {
  config: T_Config;
  frontmatter?: T_Frontmatter;
}

export default function EchoPay({ config }: I_EchoPay) {
  const echopay = config.cartridges?.echopay;
  if (!echopay || !echopay.enabled) return null;

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
        Start Paying
      </Button>
      {/* <pre style={{ padding: '1em', borderRadius: '8px' }}>
        all: {JSON.stringify(all, null, 2)}
      </pre> */}
    </Box>
  );
}
