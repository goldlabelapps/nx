'use client';
import * as React from 'react';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { Icon } from '../../../DesignSystem';
import { useDispatch } from '../../../Uberedux';
import { setCRUD, useCRUD, OptionSelect, Strings } from '../../../NXAdmin';

export interface I_CreateDoc {
  collection: string;
}

export default function CreateDoc({ collection }: I_CreateDoc) {
  const dispatch = useDispatch();
  const [valid, setValid] = React.useState(false);
  const crud = useCRUD();
  const state = crud?.[collection] || {};
  const typescript = state?.typescript;
  const typeName = typescript?.typeName || '';

  // Extract required fields from typescript (after typescript is initialized)
  const requiredFields = React.useMemo(() => {
    if (!typescript) return [];
    return Object.entries(typescript)
      .filter(([key, value]) =>
        !['typeName', 'id', 'typescript'].includes(key) &&
        typeof value === 'object' && value !== null && (value as any).required === true
      )
      .map(([key]) => key);
  }, [typescript]);

  const handleCancel = () => {
    dispatch(setCRUD(collection, 'mode', 'read'));
    dispatch(setCRUD(collection, 'selected', null));
  };

  return (
    <>
      <CardContent>
        <Typography variant="h6">
          Start with the required fields
        </Typography>
        <Box sx={{display: 'flex', gap: 1}}>
          {requiredFields.map((field) => {
            const fieldConfig = typescript[field];
            const label = fieldConfig.label || field;
            const type = fieldConfig.type;
            if (type === 'string') {
              return <Strings key={field} label={label} field={field} />;
            }
            if (type === 'email') {
              return <Strings key={field} label={label} field={field} type="email" />;
            }
            if (type === 'number') {
              return <Strings key={field} label={label} field={field} type="number" />;
            }
            if (fieldConfig.options) {
              return <OptionSelect key={field} label={label} field={field} options={fieldConfig.options} />;
            }
            // Default fallback
            return <Strings key={field} label={label} field={field} />;
          })}
        </Box>
      </CardContent>
      <CardActions>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Button
            disabled={!valid}
            startIcon={<Icon icon="save" />}
            variant="contained"
            color="primary">
            Save
          </Button>
        </Box>
      </CardActions>
    </>
  );
}
