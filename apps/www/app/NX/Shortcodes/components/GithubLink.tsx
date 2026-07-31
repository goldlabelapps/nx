'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Typography,
  Paper,
  ButtonBase,
} from '@mui/material';
import { Icon, navigateTo } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';

export default function GithubLink({
  url = '',
  label = 'No label'
}: {
  url?: string;
  label?: string;
}) {

  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    if (url) {
      dispatch(navigateTo(router, url, '_blank'));
    }
  };

  return (
    <ButtonBase onClick={handleClick}>
      <Paper variant="outlined">
        <Icon icon="github" color="primary" />
        <Typography variant="h6">
          {label}
        </Typography>
      </Paper>
    </ButtonBase>
  );
}
