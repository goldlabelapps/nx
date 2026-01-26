'use client';
import * as React from 'react';
import { T_Config, T_Frontmatter } from '../types.d';
import { Grid } from '@mui/material';
import { useDispatch } from '../Uberedux';
import { useEchopay, setEchoPay, Terminal, PayNow } from '../EchoPay';

export interface I_EchoPay {
  config: T_Config;
}

export default function EchoPay({ config }: I_EchoPay) {

  const dispatch = useDispatch();
  const data = useEchopay();
  const eConfig = config.cartridges?.echopay || {};

  if (!eConfig.enabled) return null;

  React.useEffect(() => {
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
      <Grid size={{ xs: 12 }}>
        <pre>
          data {JSON.stringify(data, null, 2)}
        </pre>
      </Grid>
    </Grid>
  );
}
