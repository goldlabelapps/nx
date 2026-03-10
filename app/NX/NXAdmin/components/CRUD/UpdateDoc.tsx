'use client';
import * as React from 'react';
import {
  Box,
  Button,
  CardActions,
  IconButton,
  Typography,
} from '@mui/material';
import { Icon } from '../../../DesignSystem';
import { useDispatch } from '../../../Uberedux';
import { setCRUD, useCRUD, TypeScript } from '../../../NXAdmin';

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
    <CardActions>
      {/* Render TypeScript panel for the current collection */}
      <Box sx={{ flexGrow: 1 }} />
      {/* <Box>
        <pre>typescript: {JSON.stringify(typescript, null, 2)}</pre>
      </Box> */}
      <Box sx={{
        display: 'flex',
      }}>
        <Box sx={{ display: 'flex', gap: 1}}>
          <TypeScript typescript={typescript} />
          <Button
            startIcon={<Icon icon="save" />}
            variant="contained"
            color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </CardActions>
  );
}
