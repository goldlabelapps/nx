'use client';
import * as React from 'react';
import {
  Card,
  Box,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@mui/material';
import { collectionDelete, useCRUD } from '../../../NXAdmin';
import { useDispatch } from '../../../Uberedux';
import { Icon } from '../../../DesignSystem';

export interface I_DeleteDoc {
  collection: string;
};

export default function DeleteDoc({ collection }: I_DeleteDoc) {

  const dispatch = useDispatch();
  const crud = useCRUD();
  const state = crud[collection];
  const { selected } = state;
  const { label } = selected || {};

  const handleDelete = () => {
    dispatch(collectionDelete(collection, selected));
  }

  const handleCancel = () => {
    dispatch(collectionDelete(collection, selected));
  }
  
  return (
    <>
      <CardContent>
        <Typography variant="body1" component="div" gutterBottom>
          Permanently delete <strong>{label || 'this item'}</strong>? 
          This action cannot be undone.
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          endIcon={<Icon icon="cancel" />}
          variant="text"
          color="primary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          endIcon={<Icon icon="delete" />}
          variant="outlined"
          color="primary"
          onClick={handleDelete}
        >
          Yes
        </Button>
        </Box>
      </CardActions>
    </>
  );
}
