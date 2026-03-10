'use client';
import * as React from 'react';
import type { I_ReadDoc } from '../../types';
import {
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
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
    { avatar && <>
      <ListItemAvatar>
        <Avatar
          src={avatar}
          alt={label}
        />
      </ListItemAvatar>
      </>}

    { icon && <>
      <ListItemIcon>
        <Icon icon={icon as any} color="primary" />
      </ListItemIcon>
    </>}

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
  const firstDoc = {
    avatar: '/shared/svg/goldlabel_favicon.svg',
    name: 'Display Name',
    email: 'test@test.com',

  };
  return <>
    {docs.map((doc: any, i: number) => (
      <SingleDoc key={`doc_${i}`} collection={collection} doc={doc} />
    ))  }
  </>;
}
