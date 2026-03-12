'use client';
import * as React from 'react';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  IconButton,
} from '@mui/material';
import { Icon } from '../../../DesignSystem';
import { useDispatch } from '../../../Uberedux';
import { setCRUD, useCRUD, InputString, JSONInput, edit } from '../../../NXAdmin';

export interface I_UpdateDoc {
  collection: string;
}

export default function UpdateDoc({ collection }: I_UpdateDoc) {

  const dispatch = useDispatch();
  const crud = useCRUD();
  const state = crud[collection];
  const { selected, typescript, saving } = state;

  
  const [fieldValues, setFieldValues] = React.useState<Record<string, string | number>>(() => {
    const initial: Record<string, string | number> = {};
    if (selected && typescript) {
      Object.keys(typescript).forEach(key => {
        if (!['typeName', 'id', 'typescript'].includes(key)) {
          initial[key] = selected[key] ?? '';
        }
      });
    }
    return initial;
  });
  const [valid, setValid] = React.useState(false);

  // Validate fields whenever fieldValues or typescript change
  React.useEffect(() => {
    if (!typescript) {
      setValid(false);
      return;
    }
    // Check all required fields for their type
    const allValid = Object.entries(typescript)
      .filter(([key, value]) => typeof value === 'object' && value !== null && (value as any).required === true)
      .every(([key, value]) => {
        const fieldConfig = value as any;
        const val = fieldValues[key];
        if (fieldConfig.type === 'string') {
          return typeof val === 'string' && val.length >= 1;
        }
        if (fieldConfig.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return typeof val === 'string' && emailRegex.test(val);
        }
        // For other types, skip validation for now
        return true;
      });
    setValid(allValid);
  }, [fieldValues, typescript]);

  const handleUpdate = () => {

    const data = { ...selected, ...fieldValues };
    // console.log('edit document with data:', data);
    dispatch(edit(collection, data));
    dispatch(setCRUD(collection, 'saving', true));

    // const updated = { ...selected, ...fieldValues };
    // updated.updated = Date.now();
    // dispatch(setCRUD(collection, 'selected', updated));
    // dispatch(setCRUD(collection, 'mode', 'read'));
  };


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
          {/* Separate fields into required and optional, order by 'order' */}
          {typescript && (() => {
            const entries = Object.entries(typescript)
              .filter(([key]) => !['typeName', 'id', 'typescript'].includes(key));
            // Group and sort
            const requiredFields = entries
              .filter(([_, config]) => (config as any).required)
              .sort(([, a], [, b]) => {
                const orderA = typeof (a as any).order === 'number' ? (a as any).order : Infinity;
                const orderB = typeof (b as any).order === 'number' ? (b as any).order : Infinity;
                return orderA - orderB;
              });
            const optionalFields = entries
              .filter(([_, config]) => !(config as any).required)
              .sort(([, a], [, b]) => {
                const orderA = typeof (a as any).order === 'number' ? (a as any).order : Infinity;
                const orderB = typeof (b as any).order === 'number' ? (b as any).order : Infinity;
                return orderA - orderB;
              });
            const allFields = [...requiredFields, ...optionalFields];
            return allFields.map(([field, fieldConfig], idx) => {
              const config = fieldConfig as any;
              const label = config.label || field;
              const description = config.description || '';
              const type = config.type;
              const required = config.required;
              const autoFocus = idx === 0;
               
              if (type === 'json') {
                return (
                  <JSONInput key={`${field}_${idx}`} label={label} />
                );
              }

              if (type === 'string' || type === 'email') {
                return (
                  <InputString
                    type={type}
                    key={`${ field}_${idx}`}
                    required={required}
                    description={description}
                    label={label}
                    field={field}
                    autoFocus={autoFocus}
                    value={fieldValues[field] as string}
                    onChange={value => {
                      setValid(false);
                      setFieldValues(prev => ({ ...prev, [field]: value }));
                    }}
                    disabled={!!saving}
                  />
                );
              }
              
              return <Box key={`${field}_${idx}`} sx={{my:2}}>
                Create field type
                <strong>
                {type}</strong></Box>;
            });
          })()}
        </Box>
      </CardContent>
      <CardActions>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={handleCancel}
            color="primary"
            disabled={!!saving}
          >
            <Icon icon="cancel" />
          </IconButton>
          <IconButton
            onClick={handleDelete}
            color="primary"
            disabled={!!saving}
          >
            <Icon icon="delete" />
          </IconButton>
          <Button
            onClick={handleUpdate}
            disabled={!valid || !!saving}
            endIcon={<Icon icon="save" />}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </Box>
      </CardActions>
    </>
  );
}
