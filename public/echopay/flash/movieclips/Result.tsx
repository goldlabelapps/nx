'use client';
import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Icon } from '../../../../app/NX/DesignSystem';
import { useFlash } from '../../../../app/NX/Flash';


export default function Result() {

  const flash = useFlash();
  const data = flash?.echopayCalculator || {};

  const {
    icon,
    name,
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
        <Avatar src={icon} />
        <Typography variant='h6' component="span">{name}</Typography>
        <span style={{ flex: 1 }} />
        <IconButton color='primary'>
          <Icon icon='menu' />
        </IconButton>

      </DialogTitle>

      <DialogContent>
        <Typography variant='body1' gutterBottom>
          This is the result of the calculation animation. It can be styled and animated as needed.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          fullWidth
          variant='contained'
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