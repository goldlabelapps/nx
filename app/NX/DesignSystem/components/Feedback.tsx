'use client';
import * as React from 'react';
import { Snackbar, Alert, IconButton, Typography } from '@mui/material';
import { useDispatch } from '../../Uberedux'
import { Icon, useFeedback, setFeedback } from '../../DesignSystem';

export default function Feedback() {
  const feedback = useFeedback();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (feedback && !feedback.hidden) {
      const timer = setTimeout(() => {
        dispatch(setFeedback(null));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback, dispatch]);

  if (!feedback || feedback.hidden) return null;

  const { title, description, severity } = feedback;

  const handleClose = () => {
    dispatch(setFeedback(null));
  };

  return (
    <Snackbar
      open
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      onClose={handleClose}
    >
      <Alert
        variant="filled"
        severity={severity}
        sx={{ minWidth: 250 }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <Icon icon="close" />
          </IconButton>
        }
      >
        <Typography variant='body1'>
          {title}
        </Typography>
        <Typography variant='body2'>
          {description}
        </Typography>

      </Alert>
    </Snackbar>
  );
}
