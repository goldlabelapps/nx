'use client';
import React from 'react';
import {
  Button,
} from '@mui/material';
import { setFeedback } from '../../DesignSystem';
import { useDispatch } from '@nx/uberedux';

export default function FeedbackBtn({
  url,
  label = 'Buy Now',
}: {
  url: string;
  label?: string;
}) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setFeedback({
      severity: 'success',
      title: 'Feedback',
      description: `You clicked the feedback button for ${url}`,
    }));
  };

  return (
    <Button variant='contained' onClick={handleClick}>
      {label}
    </Button>
  );
}
