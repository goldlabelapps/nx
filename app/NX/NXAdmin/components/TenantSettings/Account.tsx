'use client';
import * as React from 'react';
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
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

  const {name, avatar} = subscribedUser || {};
  
  React.useEffect(() => {
    if (uid && (!subscribedUser || subscribedUser.uid !== uid)) {
      dispatch(subscribeUser());
    }
  }, [dispatch, uid]);

  return (
    <>
      <Card variant="outlined">
        <CardHeader 
          avatar={avatar ? <Avatar src={avatar} /> : <Icon icon="account" />}
          title={name}
          subheader={email}
          action={<SignOutBtn />}
        />
      </Card>
    </>
  );
}
