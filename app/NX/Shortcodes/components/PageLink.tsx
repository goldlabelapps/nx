'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Typography,
  Paper,
  ButtonBase,
  CardHeader,
} from '@mui/material';
import { Icon, navigateTo } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';

export default function PageLink({
  url = null,
  icon = null,
  title = null,
  description = null
}: {
  url?: string;
  icon?: string | null;
  title?: string | null;
  description?: string | null;
}) {

  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    if (url) {
      dispatch(navigateTo(router, url, '_self'));
    }
  };

  return (
    <ButtonBase 
      onClick={handleClick}
      sx={{
        textAlign: 'left', 
        width: '100%',
      }}
    >
      <Paper variant="outlined" sx={{ width: '100%' }}>
        <CardHeader 
          sx={{
            width: '100%',
          }}
          title={title}
          subheader={description}
          avatar={<Icon icon={icon as any} color="primary" />}
        />
      </Paper>
    </ButtonBase>
  );
}
