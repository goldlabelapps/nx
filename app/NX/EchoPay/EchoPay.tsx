'use client';
import * as React from 'react';
import { T_Config, T_Frontmatter } from '../types.d';
import { Box, Button } from '@mui/material';
import { useDispatch } from '../Uberedux';
import { setEchoPay, useEchopay } from '../EchoPay'
import { Icon } from '../DesignSystem';

export interface I_EchoPay {
  config: T_Config;
  frontmatter?: T_Frontmatter;
}

export default function EchoPay({ config }: I_EchoPay) {

  const dispatch = useDispatch();
  const echoPayCartridge = useEchopay();
  const eConfig = config.cartridges?.echopay || {};

  if (!eConfig.enabled) {
    return null;
  }

  React.useEffect(() => {
    dispatch(setEchoPay('initted', true));
    dispatch(setEchoPay('enabled', eConfig.enabled));
  }, [dispatch, eConfig]);


  return (
    <Box
      id="echopay"
      sx={{
      }}>
      <Button
        fullWidth
        endIcon={<Icon icon="right" />}
        color="secondary"
        variant="outlined">
        Start
      </Button>
      <pre style={{ padding: '1em', borderRadius: '8px' }}>
        {JSON.stringify(echoPayCartridge, null, 2)}
      </pre>
    </Box>
  );
}
