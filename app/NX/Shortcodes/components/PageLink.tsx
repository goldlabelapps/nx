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
  icon = 'link',
  title = null,
  description = null
}: {
  url?: string | null;
  icon?: string | null;
  title?: string | null;
  description?: string | null;
}) {

  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    if (url) {
      const isExternal = url.startsWith('http');
      dispatch(navigateTo(router, url, isExternal ? '_blank' : '_self'));
    }
  };

  return (
    <ButtonBase 
      onClick={handleClick}
      sx={{
        textAlign: 'left', 
        width: '100%',
        mb:1
      }}
    >
      <Paper variant="outlined" sx={{ width: '100%' }}>
        <CardHeader 
          sx={{
            width: '100%',
            alignItems: 'flex-start',
            '.MuiCardHeader-avatar': {
              marginTop: 0,
            },
          }}
          title={title}
          subheader={description}
          avatar={<Icon icon={icon as any} color="primary" />}
        />
      </Paper>
    </ButtonBase>
  );
}
