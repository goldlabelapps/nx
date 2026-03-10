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

  const [valid, setValid] = React.useState(false);

  const handleCancel = () => {
    dispatch(setCRUD(collection, 'mode', 'read'));
    dispatch(setCRUD(collection, 'selected', null));
  };

  return (
    <>
      <CardContent>
        <Box>
          <pre>typeName: {JSON.stringify(typeName, null, 2)}</pre>
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
            startIcon={<Icon icon="cancel" />}
            variant="outlined"
            color="primary">
            Cancel
          </Button>
          <Button
            disabled={!valid}
            startIcon={<Icon icon="save" />}
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
