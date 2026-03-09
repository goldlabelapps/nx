'use client';
import * as React from 'react';
import {
  Box,
  Card,
  Button,
  CardActions,
} from '@mui/material';
import { Icon } from '../../../DesignSystem';

export interface I_UpdateDoc {
  collection: string;
}

export default function UpdateDoc({ collection }: I_UpdateDoc) {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 1,
    }}>
      <Box sx={{ flexGrow: 1 }} />
      <Box>
        <Button
          startIcon={<Icon icon="cancel" />}
          variant="outlined" color="primary">
          Cancel
        </Button>
      </Box>
      <Box>
        <Button
          startIcon={<Icon icon="save" />}
          variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
  );
}
