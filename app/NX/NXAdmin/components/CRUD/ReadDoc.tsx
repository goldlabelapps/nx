'use client';
import * as React from 'react';
import type { I_ReadDoc } from '../../types';
import {
  ListItemButton,
  ListItemText,
  ListItemAvatar,
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
    label,
    description,
    avatar,
    name,
    email,
    // id, authId, level, tenant,
  } = doc || {};

  const handleSelect = () => {
    // console.log('Selected doc:', doc);
    dispatch(setCRUD(collection, 'selected', doc));
    dispatch(setCRUD(collection, 'mode', 'update'));
  }

  return <ListItemButton onClick={handleSelect}>
    {/* <pre>SingleDoc {JSON.stringify(doc, null, 2)}</pre> */}

    {/* <ListItemAvatar>
      <Avatar
        src={avatar}
        alt={name || 'No Name'}
      />
    </ListItemAvatar> */}
    <ListItemText
      primary={label}
      secondary={description}
    />
  </ListItemButton>
}

export default function ReadDoc({
  collection,
}: I_ReadDoc) {

  const crud = useCRUD();
  const { docs, typescript } = crud[collection];
  return <>
    {docs.map((doc: any) => (
      <SingleDoc key={doc.id} collection={collection} doc={doc} />
    ))}
  </>;
}
