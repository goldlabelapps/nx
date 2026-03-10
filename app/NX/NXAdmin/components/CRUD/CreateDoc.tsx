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
  const [fieldValues, setFieldValues] = React.useState<Record<string, string>>({});
  const crud = useCRUD();
  const state = crud?.[collection] || {};
  const typescript = state?.typescript;

  const requiredFields = React.useMemo(() => {
    if (!typescript) return [];
    const fields = Object.entries(typescript)
      .filter(([key, value]) =>
        !['typeName', 'id', 'typescript'].includes(key) &&
        typeof value === 'object' && value !== null && (value as any).required === true
      );
    fields.sort(([, a], [, b]) => {
      const orderA = typeof (a as any).order === 'number' ? (a as any).order : Infinity;
      const orderB = typeof (b as any).order === 'number' ? (b as any).order : Infinity;
      return orderA - orderB;
    });
    return fields.map(([key]) => key);
  }, [typescript]);

  // Validate fields whenever fieldValues or requiredFields change
  React.useEffect(() => {
    if (!typescript) {
      setValid(false);
      return;
    }
    // Check all required string fields are at least 5 chars
    const allValid = requiredFields.every(field => {
      const fieldConfig = typescript[field];
      if (fieldConfig.type === 'string') {
        return typeof fieldValues[field] === 'string' && fieldValues[field].length >= 5;
      }
      // For other types, skip validation for now
      return true;
    });
    setValid(allValid);
  }, [fieldValues, requiredFields, typescript]);
  const handleCancel = () => {
    dispatch(setCRUD(collection, 'mode', 'read'));
    dispatch(setCRUD(collection, 'selected', null));
  };

  return (
    <>
      <CardContent>
        <Typography variant="body1">
          Start with the required fields
        </Typography>
        <Box sx={{display: 'flex', gap: 1}}>
          {requiredFields.map((field, idx) => {
            const fieldConfig = typescript[field];
            const label = fieldConfig.label || field;
            const description = fieldConfig.description || field;
            const type = fieldConfig.type;
            const autoFocus = idx === 0;
            if (type === 'string') {
              return (
                <Strings
                  key={field}
                  description={description}
                  label={label}
                  field={field}
                  autoFocus={autoFocus}
                  onChange={value => {
                    setFieldValues(prev => ({ ...prev, [field]: value }));
                  }}
                />
              );
            }
            if (fieldConfig.options) {
              return <OptionSelect key={field} label={label} field={field} options={fieldConfig.options} />;
            }
            return (
              <Strings
                key={field}
                description={description}
                label={label}
                field={field}
                autoFocus={autoFocus}
                onChange={value => {
                  setFieldValues(prev => ({ ...prev, [field]: value }));
                }}
              />
            );
          })}
        </Box>
      </CardContent>
      <CardActions>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', gap: 1 }}>
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
            Save
          </Button>
        </Box>
      </CardActions>
    </>
  );
}
