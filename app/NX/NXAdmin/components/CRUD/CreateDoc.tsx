'use client';
import * as React from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import { Icon } from '../../../DesignSystem';
import { useDispatch } from '../../../Uberedux';
import { setCRUD } from '../../../NXAdmin';

export interface I_CreateDoc {
  collection: string;
}

export default function CreateDoc({ collection }: I_CreateDoc) {

  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(setCRUD(collection, 'mode', 'read'));
    dispatch(setCRUD(collection, 'selected', null));
  };


  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 1,
    }}>
      <Typography variant="h6">
        Create Document
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Box>
        <Button
          startIcon={<Icon icon="save" />}
          variant="contained"
          color="primary">
          Save
        </Button>
      </Box>

    </Box>
  );
}
