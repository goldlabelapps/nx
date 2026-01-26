'use client';
import * as React from 'react';
import { T_Config, T_Frontmatter } from '../types.d';
import { Box } from '@mui/material';
import { useDispatch } from '../Uberedux';
import { setEchoPay, Terminal, Controls } from '../EchoPay';

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
    <Box id="echopay">
      <Controls />
      <Terminal />
    </Box>
  );
}
