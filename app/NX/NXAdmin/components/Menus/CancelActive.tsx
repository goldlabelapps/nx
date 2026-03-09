'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  IconButton,
  Button,
} from '@mui/material';
import { useDispatch } from '../../../../NX/Uberedux';
import { setNXAdmin, setCRUD, useCRUD } from '../../../NXAdmin'
import { Icon } from '../../../../NX/DesignSystem';

export default function CancelActive({ 
  collection 
}: { 
  collection: string
}) {

  const dispatch = useDispatch();
  const crud = useCRUD();
  const state = crud[collection];
  const handleClick = () => {
    console.log('collection', collection);
    dispatch(setNXAdmin('active', null));
  };
  // console.log('state', state);
  // Cancel
  return (
    <IconButton color="primary" onClick={handleClick}>
      <Icon icon="close" />
    </IconButton>
  );
}
