'use client';
import * as React from 'react';
import { T_Config } from '../types.d';
import { Button } from '@mui/material';
import { useDispatch } from '../Uberedux';
import { Icon } from '../DesignSystem';
import {
  useEchopay,
  setEchoPay,
} from '../EchoPay';
import { Flash } from '../Flash';

export interface I_EchoPay {
  config: T_Config;
}

export default function EchoPay({ config }: I_EchoPay) {

  const dispatch = useDispatch();
  const echoPayState = useEchopay();
  const { initted } = echoPayState;
  const eConfig = config.cartridges?.echopay || {};
  if (!eConfig.enabled) return null;

  const handleRestart = () => {
    window.open('/', '_self');
  }

  React.useEffect(() => {
    if (!initted) {
      dispatch(setEchoPay('initted', true));
    }
  }, [dispatch, initted]);

  return (
    <Flash>
      <Button
        startIcon={<Icon icon="reset" />}
        color="primary"
        onClick={handleRestart}
      >
        Restart
      </Button>
      <pre>
        {JSON.stringify(echoPayState, null, 2)}
      </pre>
    </Flash>
  );
}
