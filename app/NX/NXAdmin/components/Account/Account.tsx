'use client';
import * as React from 'react';
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Badge,
} from '@mui/material';
import { Icon } from '../../../DesignSystem';
import {
  useAuthed,
  SignOutBtn,
} from '../../../Paywall';
import { useDispatch } from '../../../Uberedux';
import { useNXAdmin, subscribeUser } from '../../../NXAdmin';

export default function Account() {
  
  const dispatch = useDispatch();
  const authed = useAuthed();
  const nxAdmin = useNXAdmin();
  const { subscribedUser } = nxAdmin || {};
    const {
      uid,
      email,
    } = authed || {};

  const {name, avatar, level} = subscribedUser || {};
  
  React.useEffect(() => {
    if (uid && (!subscribedUser || subscribedUser.uid !== uid)) {
      dispatch(subscribeUser());
    }
  }, [dispatch, uid]);

  return (
    <>
      <Card variant="outlined">
        <CardHeader 
          avatar={<Badge badgeContent={level} color='primary'>
            <Avatar src={avatar} />
          </Badge>}
          title={name}
          subheader={email}
          action={<SignOutBtn />}
        />
        <CardContent>
          Additional content can be added here
        </CardContent>
      </Card>
    </>
  );
}
