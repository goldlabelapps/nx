'use client';
import * as React from 'react';
import {
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
import { useNXAdmin, setNXAdmin, subscribeUser } from '../../../NXAdmin';

export default function Account() {
  
  const dispatch = useDispatch();
  const authed = useAuthed();
  const nxAdmin = useNXAdmin();
  const { subscribedUser } = nxAdmin || {};
  
  React.useEffect(() => {
    if (!subscribedUser){
      dispatch(subscribeUser());
    }
  }, [dispatch, subscribedUser]);

  const {
    uid, 
    email,
  } = authed || {};


  return (
    <>
      <Card variant="outlined">
        <CardHeader 
          avatar={<Icon icon="account" />}
          title={uid}
          subheader={email}
        />
        <CardContent>
          <SignOutBtn />
          <pre>nxAdmin: {JSON.stringify(nxAdmin, null, 2)}</pre>
        </CardContent>
      </Card>
    </>
  );
}

/* */