'use client';
import * as React from 'react';
import { T_Config } from '../../types.d';
import { Box, Grid, Button, Container } from '@mui/material';
import { useDispatch } from '../../Uberedux';
import { Icon } from '../../DesignSystem';
import {
  useEchopay,
  setEchoPay,
  Terminal,
  Cart,
} from '../../EchoPay';

export interface I_EchoPayPlugin {
  config: T_Config;
}

export default function EchoPayPlugin({ config }: I_EchoPayPlugin) {

  const dispatch = useDispatch();
  const data = useEchopay();
  const eConfig = config.cartridges?.echopay || {};

  if (!eConfig.enabled) return null;

  const handleRestart = () => {
    window.open('/', '_self');
  }

  const handleOpenDashboard = () => {
    window.open('https://dev-dashboard.a2apay.co.uk/', '_blank');
  }

  const handleShowTerminal = () => {
    dispatch(setEchoPay('hideTerminal', false));
  }

  React.useEffect(() => {
    dispatch(setEchoPay('hideTerminal', eConfig.hideTerminal ?? false));
  }, [dispatch, eConfig]);

  return (
    <Container sx={{ mt: 2 }}>
      <Grid container id="echopay" spacing={2}>

        <Grid size={{ xs: 12 }}>

          <Button
            sx={{ mr: 1 }}
            variant='contained'
            startIcon={<Icon icon="reset" />}
            color="primary"
            onClick={handleRestart}
          >
            Reset
          </Button>

          <Button
            sx={{ mr: 1 }}
            variant='outlined'
            startIcon={<Icon icon="link" />}
            color="primary"
            onClick={handleOpenDashboard}
          >
            EchoPay Dashboard
          </Button>
          {data?.hideTerminal && (
            <Button
              sx={{ mr: 1 }}
              variant='outlined'
              startIcon={<Icon icon="bug" />}
              color="primary"
              onClick={handleShowTerminal}
            >
              Debugger
            </Button>
          )}
        </Grid>

        {!data?.hideTerminal && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Terminal />
          </Grid>
        )}

        <Grid size={{ xs: 12, md: 6 }}>
          <Cart />
        </Grid>

      </Grid>
    </Container>
  );
}
