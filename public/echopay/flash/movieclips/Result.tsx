'use client';
import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  // Avatar,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Icon } from '../../../../app/NX/DesignSystem';
import { useFlash } from '../../../../app/NX/Flash';

import Graph from './Graph';


export default function Result() {

  const flash = useFlash();
  const data = flash?.echopayCalculator || {};

  const {
    icon,
    name,
    atv,
    biz,
    cto,
  } = data;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // For demo, Dialog is always open. In real use, control open/close via props or state.
  return (
    <Dialog
      open
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      aria-labelledby="result-dialog-title"
    >
      <DialogTitle id="result-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* <Avatar src={icon} /> */}
        <Typography variant='h6' component="span">{name}</Typography>
        <span style={{ flex: 1 }} />
        <IconButton color='secondary'>
          <Icon icon='menu' />
        </IconButton>

      </DialogTitle>

      <DialogContent>
        {/* <Typography variant='body2' gutterBottom>
          ATV: {atv}
        </Typography>
        <Typography variant='body2' gutterBottom>
          BIZ: {biz}
        </Typography>
        <Typography variant='body2' gutterBottom>
          CTO: {cto}
        </Typography> */}

        <Graph />
      </DialogContent>

      <DialogActions>
        <span style={{ flex: 1 }} />
        <Button
          variant='outlined'
          color="secondary"
          startIcon={<Icon icon='share' />}
        >
          Share
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/*
        <pre>
          data: {JSON.stringify(data, null, 2)}
        </pre>
*/