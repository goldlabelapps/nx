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
import { setCRUD, useCRUD } from '../../../NXAdmin';

export interface I_UpdateDoc {
  collection: string;
}

export default function UpdateDoc({ collection }: I_UpdateDoc) {

  const dispatch = useDispatch();
  const crud = useCRUD();
  const state = crud[collection];
  const { typescript } = state;
  const { typeName } = typescript || {};

  const handleCancel = () => {
    dispatch(setCRUD(collection, 'mode', 'read'));
    dispatch(setCRUD(collection, 'selected', null));
  };

  return (
    <Box>
      <Box>
        <Typography variant="h6">
          Update
        </Typography>
        <pre>typeName: {JSON.stringify(typeName, null, 2)}</pre>
      </Box>


      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
      }}>
        <Box sx={{ flexGrow: 1 }} />

        <Box>
          <Button
            disabled
            startIcon={<Icon icon="save" />}
            variant="contained"
            color="primary">
            Save
          </Button>
        </Box>
      </Box>

    </Box>
  );
}
