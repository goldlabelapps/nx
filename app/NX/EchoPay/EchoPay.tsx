'use client';
import * as React from 'react';
import { T_Config, T_Frontmatter } from '../types.d';
import { Box, Grid } from '@mui/material';
import { useDispatch } from '../Uberedux';
import { setEchoPay, Terminal, Controls, PayNow } from '../EchoPay';

export interface I_EchoPay {
  config: T_Config;
  frontmatter?: T_Frontmatter;
}

export default function EchoPay({ config }: I_EchoPay) {

  const dispatch = useDispatch();
  const eConfig = config.cartridges?.echopay || {};

  if (!eConfig.enabled) return null;

  React.useEffect(() => {
    dispatch(setEchoPay('initted', true));
    dispatch(setEchoPay('enabled', eConfig.enabled));
  }, [dispatch, eConfig]);

  return (
    <Grid container id="echopay" spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <PayNow />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Terminal />
      </Grid>
    </Grid>
  );
}
