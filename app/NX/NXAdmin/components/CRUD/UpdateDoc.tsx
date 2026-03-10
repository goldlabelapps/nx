'use client';
import * as React from 'react';
import {
  Box,
  Button,
  CardActions,
  CardContent,
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
  const { selected } = state;
  const { label } = selected || {};
  const [valid, setValid] = React.useState(false);

  const handleCancel = () => {
    dispatch(setCRUD(collection, 'mode', 'read'));
    dispatch(setCRUD(collection, 'selected', null));
  };

  const handleDelete = () => {
    dispatch(setCRUD(collection, 'mode', 'delete'));
  };

  return (
    <>
      <CardContent>
        <Box>
          <pre>label: {JSON.stringify(label, null, 2)}</pre>
        </Box>
      </CardContent>
      <CardActions>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{
        display: 'flex',
      }}>
        <Box sx={{ display: 'flex', gap: 1}}>
            <Button
              onClick={handleCancel}
              endIcon={<Icon icon="cancel" />}
              variant="text"
              color="primary">
              Cancel
            </Button>
          <Button
              onClick={handleDelete}
              endIcon={<Icon icon="delete" />}
              variant="text"
              color="primary">
              Delete
            </Button>
          <Button
            disabled={!valid}
            endIcon={<Icon icon="save" />}
            variant="contained"
            color="primary">
            Update
          </Button>
          
        </Box>
      </Box>
    </CardActions>
    </>
  );
}
