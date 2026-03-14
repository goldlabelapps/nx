'use client';
import * as React from 'react';
import {
  // Box,
  Card,
  CardHeader,
  // CardContent,
  // Typography,
} from '@mui/material';
import { Icon } from '../../../DesignSystem';
import {
  useAuthed,
  SignOutBtn,
} from '../../../Paywall'
// import { useDispatch } from '../../../Uberedux';

export default function Account() {
  // const dispatch = useDispatch();
  const authed = useAuthed();
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
        {/* <CardContent>
          <Typography variant="body2">
            {uid}
          </Typography>
        </CardContent> */}
      </Card>
    </>
  );
}

/* <pre>authed: {JSON.stringify(authed, null, 2)}</pre> */