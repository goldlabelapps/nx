'use client';
import * as React from 'react';
import { T_Config } from '../types.d';
import { Box, Grid, Button } from '@mui/material';
import { useDispatch } from '../Uberedux';
import { Icon } from '../DesignSystem';
import {
  useEchopay,
  setEchoPay,
  Terminal,
  Cart,
} from '../EchoPay';

export interface I_EchoPay {
  config: T_Config;
}

export default function EchoPay({ config }: I_EchoPay) {

  const dispatch = useDispatch();
  const data = useEchopay();
  const eConfig = config.cartridges?.echopay || {};

  if (!eConfig.enabled) return null;

  const handleShowTerminal = () => {
    dispatch(setEchoPay('hideTerminal', false));
  }

  React.useEffect(() => {
    dispatch(setEchoPay('hideTerminal', eConfig.hideTerminal ?? false));
  }, [dispatch, eConfig]);

  return (
    <Grid container id="echopay" spacing={2}>

      <Grid size={{ xs: 12, md: 6 }}>
        <Cart />
        {data?.hideTerminal && (
          <Button
            sx={{ mt: 2 }}
            startIcon={<Icon icon="show" />}
            color="primary"
            onClick={handleShowTerminal}
          >
            Show Output
          </Button>
        )}
      </Grid>


      {!data?.hideTerminal && (
        <Grid size={{ xs: 12, md: 6 }}>
          <Terminal />
        </Grid>
      )}

      {/* <Grid size={{ xs: 12 }}>
        <pre>
          data {JSON.stringify(data, null, 2)}
        </pre>
      </Grid> */}

    </Grid>
  );
}
