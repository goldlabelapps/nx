"use client";
import * as React from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Typography,
} from '@mui/material';
import { Icon } from '../../../DesignSystem';
import { useDispatch } from '../../../Uberedux';
import { useNXAdmin, setNXAdmin, SoundPlayer } from '../../../NXAdmin';
import { initQueue, NextRecord, FilterSelect, useFilters, useNumbers } from './';

export default function Queue() {
  
  const dispatch = useDispatch();
  const nxAdmin = useNXAdmin();
  const queue = nxAdmin?.queue || {};
  const [playChaching, setPlayChaching] = React.useState(false);
  const didInitSoundRef = React.useRef(false);
  const lastResponseTokenRef = React.useRef('');
  const didInit = React.useRef(false);
  const numbers = useNumbers();
  const parseJsonFromString = React.useCallback((value: string) => {
    const trimmed = value.trim();
    const fencedMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
    const jsonCandidate = fencedMatch ? fencedMatch[1].trim() : trimmed;
    try {
      return JSON.parse(jsonCandidate);
    } catch {
      return null;
    }
  }, []);
  const scorePercent = React.useMemo(() => {
    const pythonResponse = queue?.pythonResponse;
    if (!pythonResponse) return null;

    const responseContent = typeof pythonResponse === 'string'
      ? pythonResponse
      : pythonResponse?.data?.completion
        ?? pythonResponse?.completion
        ?? pythonResponse?.data
        ?? pythonResponse;

    const parsedProspect = typeof responseContent === 'string'
      ? parseJsonFromString(responseContent)
      : responseContent;

    if (!parsedProspect || typeof parsedProspect !== 'object' || Array.isArray(parsedProspect)) {
      return null;
    }

    const scoreEntry = Object.entries(parsedProspect as Record<string, unknown>)
      .find(([key]) => key.replace(/[_\s-]/g, '').toLowerCase() === 'score');
    const rawScore = scoreEntry?.[1];

    let numeric: number | null = null;
    if (typeof rawScore === 'number' && Number.isFinite(rawScore)) {
      numeric = rawScore;
    } else if (typeof rawScore === 'string') {
      const parsed = Number.parseFloat(rawScore.replace('%', '').trim());
      numeric = Number.isFinite(parsed) ? parsed : null;
    }

    if (numeric == null) return null;

    const normalized = numeric >= 0 && numeric <= 1 ? numeric * 100 : numeric;
    return Math.max(0, Math.min(100, normalized));
  }, [parseJsonFromString, queue?.pythonResponse]);
  const responseToken = React.useMemo(() => {
    const pythonResponse = queue?.pythonResponse;
    if (!pythonResponse) return '';

    const next = queue?.table?.next;
    const nextKey = String(
      next?.id
      ?? next?._id
      ?? next?.queue_id
      ?? next?.queueId
      ?? ''
    );

    const responseKey = typeof pythonResponse === 'string'
      ? pythonResponse
      : JSON.stringify(pythonResponse);

    return `${nextKey}::${responseKey}`;
  }, [queue?.pythonResponse, queue?.table?.next]);

  

  React.useEffect(() => {
    if (!didInit.current) {
      if (!nxAdmin || !nxAdmin.queue) {
        dispatch(initQueue());
      }
      didInit.current = true;
    }
  }, [dispatch, nxAdmin]);

  React.useEffect(() => {
      dispatch(setNXAdmin('header', {
        title: numbers.total > 0 ? `Queue° (${numbers.total})` : 'Queue°',
        icon: 'queue',
      }));
  }, [dispatch, numbers.total]);

  React.useEffect(() => {
    document.title = numbers.total > 0 ? `Queue° (${numbers.total})` : 'Queue°';
    return () => {
      document.title = 'Queue°';
    };
  }, [numbers.total]);

  React.useEffect(() => {
    if (!didInitSoundRef.current) {
      didInitSoundRef.current = true;
      lastResponseTokenRef.current = responseToken;
      return;
    }

    if (!responseToken) {
      lastResponseTokenRef.current = '';
      return;
    }

    if (lastResponseTokenRef.current === responseToken) return;

    lastResponseTokenRef.current = responseToken;
    if (scorePercent != null && scorePercent > 90) {
      setPlayChaching(true);
    }
  }, [responseToken, scorePercent]);

  if (queue.error) {
    return (
          <Box sx={{ my: 1, maxWidth: 500 }}>
            <Alert
              severity="warning"
              action={
                <Button
                  variant="contained"
                  size="small"
                  endIcon={<Icon icon="reset" />}
                  onClick={() => dispatch(initQueue())}>
                  Retry
                </Button>
              }>
                <Typography variant='body1'>
                  Python° error
                </Typography>
                <Typography variant='body2'>
                  {queue.error}
                </Typography>
            </Alert>
          </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>  
      <SoundPlayer
        src="/nxadmin/mp3/mario/cherching.mp3"
        play={playChaching}
        volume={10}
        onFinishedPlaying={() => setPlayChaching(false)}
      />
      <NextRecord />
    </Box>
  );
}
