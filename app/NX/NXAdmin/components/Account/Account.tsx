'use client';
import * as React from 'react';
import {
  // Box,
  Card,
  CardHeader,
  CardContent,
  // Typography,
} from '@mui/material';
import { Icon } from '../../../DesignSystem';
import {
  useAuthed,
  SignOutBtn,
} from '../../../Paywall'
import { useAsync } from '../../../Async';

export default function Account() {
  // const dispatch = useDispatch();
  const authed = useAuthed();
  const async = useAsync();

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
          action={<>
            <SignOutBtn />
          </>}
        />
        <CardContent>
          <pre>async: {JSON.stringify(async, null, 2)}</pre>
          
        </CardContent>
      </Card>
    </>
  );
}

/* */