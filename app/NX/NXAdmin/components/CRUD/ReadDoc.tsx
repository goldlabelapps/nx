'use client';
import * as React from 'react';
import type { I_ReadDoc } from '../../types';
import {
  Box,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  CardContent,
  Typography,
  List,
  Avatar,
} from '@mui/material';
import {
  useCRUD,
  setCRUD,
} from '../../../NXAdmin';
import {
  useDispatch,
} from '../../../Uberedux';

function SingleDoc({
  collection,
  doc
}: {
  collection: string;
  doc?: Record<string, any>
}) {
  const dispatch = useDispatch();
  const {
    avatar,
    name,
    email,
    // id, authId, level, tenant,
  } = doc || {};

  const handleSelect = () => {
    console.log('Selected doc:', doc);
    dispatch(setCRUD(collection, 'selected', doc));
    dispatch(setCRUD(collection, 'mode', 'update'));
  }

  return <ListItemButton onClick={handleSelect}>
    {/* <pre>SingleDoc {JSON.stringify(doc, null, 2)}</pre> */}

    <ListItemAvatar>
      <Avatar src={avatar} alt={name || 'No Name'} sx={{ width: 64, height: 64, mb: 2 }} />
    </ListItemAvatar>
    <ListItemText
      primary={name || 'No Name'}
      secondary={email || 'No Email'}
    />
  </ListItemButton>
}

export default function ReadDoc({
  collection,
}: I_ReadDoc) {

  const crud = useCRUD();
  const { docs, typescript } = crud[collection];
  const firstDoc = docs?.[0];

  return <List dense>
    <SingleDoc doc={firstDoc} collection={collection} />
  </List>
}
