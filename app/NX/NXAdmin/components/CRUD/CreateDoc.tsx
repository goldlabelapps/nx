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
import { saveNewDoc, setCRUD, useCRUD, OptionSelect, InputString } from '../../../NXAdmin';

export interface I_CreateDoc {
  collection: string;
  icon?: string;
}

  export default function CreateDoc({ collection, icon }: I_CreateDoc) {
  const dispatch = useDispatch();
  const [valid, setValid] = React.useState(false);
  const [fieldValues, setFieldValues] = React.useState<Record<string, string | number>>({});
  const crud = useCRUD();
  const state = crud?.[collection] || {};
  const {
    typescript,
    saving,
    
  } = state;

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
    // Check all required fields for their type
    const allValid = requiredFields.every(field => {
      const fieldConfig = typescript[field];
      const value = fieldValues[field];
      if (fieldConfig.type === 'string') {
        return typeof value === 'string' && value.length >= 5;
      }
      if (fieldConfig.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return typeof value === 'string' && emailRegex.test(value);
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

  const handleSave = () => {
    dispatch(setCRUD(collection, 'saving', true));
    const extended = { ...fieldValues };
    if (requiredFields.length > 0) {
      extended.label = fieldValues[requiredFields[0]] || '';
    }
    if (requiredFields.length > 1) {
      extended.description = fieldValues[requiredFields[1]] || '';
    }
    const now = Date.now();
    extended.created = now;
    extended.updated = now;
    extended.icon = icon ?? '';
    dispatch(saveNewDoc(collection, extended));
  }

  return (
    <>
      <CardContent>
        {/* <Typography variant="h2">
          mode {mode}
        </Typography> */}
        <Box sx={{
          // display: 'flex', gap: 1,
        }}>
          {requiredFields.map((field, idx) => {
            const fieldConfig = typescript[field];
            const label = fieldConfig.label || field;
            const description = fieldConfig.description || '';
            const type = fieldConfig.type;
            const autoFocus = idx === 0;
            if (type === 'string' || type === 'email') {
              return (
                <InputString
                  type={type}
                  key={field}
                  description={description}
                  label={label}
                  field={field}
                  autoFocus={autoFocus}
                  onChange={value => {
                    setValid(false);
                    setFieldValues(prev => ({ ...prev, [field]: value }));
                  }}
                  disabled={!!saving}
                />
              );
            }
            return null;
          })}
        </Box>
      </CardContent>
      <CardActions>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            onClick={handleCancel}
            disabled={!!saving}
            endIcon={<Icon icon="cancel" />}
            variant="text"
            color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!valid || !!saving}
            endIcon={<Icon icon="save" />}
            variant="contained"
            color="primary">
            Save
          </Button>
          
        </Box>
      </CardActions>
    </>
  );
}
