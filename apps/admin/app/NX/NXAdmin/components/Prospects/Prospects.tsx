'use client';
import * as React from 'react';
import {
  Box,
  Typography,
  List,
} from '@mui/material';
import { setNXAdmin, useNXAdmin } from '../../../NXAdmin';
import { useDispatch } from '../../../Uberedux';
import {
  initProspects,
  useSubscription,
  useProspect,
  useProspectTagSlug,
  useDoc,
} from '../Prospects';
import { createSlug } from '../../../lib/vanilla-js/createSlug';
import { Panel, Detail } from './components/Prospect';

const titleFromSlug = (slug: string) =>
  slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export default function Prospects() {
  const dispatch = useDispatch();
  const nxAdmin = useNXAdmin();
  const didInit = React.useRef(false);
  const tagSlug = useProspectTagSlug();
  const isTagRoute = Boolean(tagSlug);
  const { prospects, loading } = useSubscription(isTagRoute ? 1000 : 100, { tagSlug });
  const prospectId = useProspect();
  const doc = useDoc();

  const resolvedTagLabel = React.useMemo(() => {
    if (!tagSlug) {
      return null;
    }

    for (const prospect of prospects) {
      if (!Array.isArray((prospect as any).tags)) {
        continue;
      }

      const match = (prospect as any).tags.find((tag: unknown) => createSlug(String(tag ?? '')) === createSlug(tagSlug));
      if (match) {
        return String(match);
      }
    }

    return titleFromSlug(tagSlug);
  }, [prospects, tagSlug]);

  React.useEffect(() => {
    if (!didInit.current) {
      if (!nxAdmin || !nxAdmin.prospects) {
        dispatch(initProspects());
      }
      didInit.current = true;
    }
  }, [dispatch, nxAdmin]);

  React.useEffect(() => {
    if (isTagRoute && resolvedTagLabel) {
      dispatch(setNXAdmin('header', {
        title: `Tag: ${resolvedTagLabel}`,
        subheader: `Show all prospects who have the tag '${resolvedTagLabel}'.`,
        icon: 'tags',
      }));
      return;
    }

    dispatch(setNXAdmin('header', {
      title: 'Prospects°',
      icon: 'prospects',
    }));
  }, [dispatch, isTagRoute, resolvedTagLabel]);
  
  if (!isTagRoute && prospectId && doc) {
    return <Detail prospect={doc as any} />;
  }

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ p: 2 }}>
          {isTagRoute && resolvedTagLabel && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5">Tag: {resolvedTagLabel}</Typography>
              <Typography variant="body2" color="text.secondary">
                Show all prospects who have the tag '{resolvedTagLabel}'.
              </Typography>
            </Box>
          )}

          {loading ? (
            <Typography variant="body2">Loading...</Typography>
          ) : prospects.length === 0 ? (
            <Typography variant="body2">
              {isTagRoute && resolvedTagLabel
                ? `No prospects found for tag '${resolvedTagLabel}'.`
                : 'No prospects found.'}
            </Typography>
          ) : (
            <List disablePadding>
              {prospects.map((v: any) => (
                <Panel
                  key={v.id}
                  prospect={v}
                />
              ))}
            </List>
          )}
        </Box>
      </Box>
    </>
  );
}
