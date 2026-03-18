'use client';
import * as React from 'react';
// import type { I_ReadDoc } from '../../types';

export interface I_ReadDoc {
  collection: string;
}
import {
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  Avatar,
} from '@mui/material';
import {
  useCRUD,
  setCRUD,
} from '../../../NXAdmin';
import {
  useDispatch,
} from '../../../Uberedux';
import {
  Icon,
} from '../../../DesignSystem';

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
    icon,
  } = doc || {};

  const handleSelect = () => {
    dispatch(setCRUD(collection, 'selected', doc));
    dispatch(setCRUD(collection, 'mode', 'update'));
  }

  return <ListItemButton onClick={handleSelect}>
      { avatar ? (
        <ListItemAvatar>
          <Avatar
            src={avatar}
            alt={label}
          />
        </ListItemAvatar>
      ) : icon ? (
        <ListItemIcon>
          <Icon icon={icon as any} color="primary" />
        </ListItemIcon>
      ) : null }
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
  const { docs } = crud[collection];
  
  return <>
    {docs.map((doc: any, i: number) => (
      <SingleDoc 
        key={`doc_${i}`} 
        collection={collection} 
        doc={doc} 
      />
    ))  }
  </>;
}
