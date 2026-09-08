'use client';

import * as React from 'react';
import { Box, Popover, Stack, Typography } from '@mui/material';
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  XShareButton,
} from 'react-share';
import type { ShareProps } from './types';
import Button from '../../buttons/Button/Button';
import IconButton from '../../buttons/IconButton/IconButton';
import Icon from '../../icons/Icon/Icon';

type ShareChannel = {
  key: 'x' | 'facebook' | 'linkedin' | 'whatsapp';
  label: string;
  icon: 'twitter' | 'facebook' | 'linkedin' | 'whatsapp';
  render: (children: React.ReactNode, shareUrl: string, description: string, ariaLabel: string) => React.ReactElement;
};

const CHANNELS: ShareChannel[] = [
  {
    key: 'x',
    label: 'X/Twitter',
    icon: 'twitter',
    render: (children, shareUrl, _description, ariaLabel) => (
      <XShareButton url={shareUrl} aria-label={ariaLabel}>
        {children}
      </XShareButton>
    ),
  },
  {
    key: 'facebook',
    label: 'Facebook',
    icon: 'facebook',
    render: (children, shareUrl, _description, ariaLabel) => (
      <FacebookShareButton url={shareUrl} aria-label={ariaLabel}>
        {children}
      </FacebookShareButton>
    ),
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: 'linkedin',
    render: (children, shareUrl, description, ariaLabel) => (
      <LinkedinShareButton url={shareUrl} summary={description} aria-label={ariaLabel}>
        {children}
      </LinkedinShareButton>
    ),
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    icon: 'whatsapp',
    render: (children, shareUrl, _description, ariaLabel) => (
      <WhatsappShareButton url={shareUrl} aria-label={ariaLabel}>
        {children}
      </WhatsappShareButton>
    ),
  },
];

function renderShareContent(label: string, icon: ShareChannel['icon'], showLabels: boolean) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 1,
        minHeight: showLabels ? 42 : 'auto',
        width: '100%',
        px: showLabels ? 1.25 : 0.75,
        py: showLabels ? 0.75 : 0.5,
        borderRadius: '3px',
        '&:hover': {
          backgroundColor: 'rgba(25, 118, 210, 0.08)',
        },
      }}
    >
      <Icon icon={icon} color="secondary" />
      {showLabels ? <Typography variant="body2">{label}</Typography> : null}
    </Box>
  );
}

function getSizeStyles(size: NonNullable<ShareProps['size']>) {
  if (size === 'small') {
    return {
      iconButtonSize: 'sm' as const,
      gap: 1,
    };
  }

  if (size === 'large') {
    return {
      iconButtonSize: 'lg' as const,
      gap: 1.5,
    };
  }

  return {
    iconButtonSize: 'md' as const,
    gap: 1,
  };
}

export default function Share({
  size = 'medium',
  url,
  title,
  description,
}: ShareProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [copiedAnchorEl, setCopiedAnchorEl] = React.useState<HTMLElement | null>(null);
  const [shareData, setShareData] = React.useState({
    url: url ?? '',
    title: title ?? '',
    description: description ?? '',
  });
  const resetTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (url && title !== undefined && description !== undefined) {
      setShareData({ url, title, description });
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;

    setShareData({
      url: url ?? window.location.href,
      title: title ?? window.document.title,
      description: description ?? meta?.content ?? '',
    });
  }, [description, title, url]);

  React.useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const { iconButtonSize, gap } = getSizeStyles(size);
  const open = Boolean(anchorEl);
  const copiedOpen = copied && Boolean(copiedAnchorEl);

  const handleCopy = async () => {
    if (!shareData.url || typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
      return;
    }

    await navigator.clipboard.writeText(shareData.url);
    setCopied(true);
    setCopiedAnchorEl(containerRef.current);

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setCopied(false);
      setCopiedAnchorEl(null);
      resetTimerRef.current = null;
    }, 2500);

    setAnchorEl(null);
  };

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    const nextAnchor = event.currentTarget as HTMLButtonElement;
    setAnchorEl(current => (current ? null : nextAnchor));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopiedClose = () => {
    setCopied(false);
    setCopiedAnchorEl(null);

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  };

  return (
    <Box id="share" ref={containerRef} aria-label="Share" sx={{ display: 'flex', flexDirection: 'column', gap }}>
      <IconButton
        size={iconButtonSize}
        ariaLabel="Open share menu"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? 'share-menu' : undefined}
        icon={<Icon icon="share" color="secondary" />}
        onClick={handleToggle}
      />

      <Popover
        id="share-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box sx={{ p: 1.5, minWidth: 220 }}>
          <Stack spacing={gap} role="menu" aria-label="Share menu">
            {CHANNELS.map(channel => {
              const content = renderShareContent(channel.label, channel.icon, true);

              return (
                <Box
                  key={channel.key}
                  role="none"
                  sx={{
                    display: 'flex',
                    width: '100%',
                    '& > button': {
                      width: '100%',
                      display: 'flex',
                    },
                  }}
                >
                  {channel.render(content, shareData.url, shareData.description, `Share on ${channel.label}`)}
                </Box>
              );
            })}

            <Button
              variant="ghost"
              size={iconButtonSize}
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                },
              }}
              startIcon={<Icon icon="copy" color="secondary" />}
              onClick={() => {
                void handleCopy();
              }}
              ariaLabel="Copy link"
              disabled={!shareData.url}
            >
              Copy link
            </Button>
          </Stack>
        </Box>
      </Popover>

      <Popover
        open={copiedOpen}
        anchorEl={copiedAnchorEl}
        onClose={handleCopiedClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        disableRestoreFocus
      >
        <Box role="status" sx={{ px: 1.5, py: 1 }}>
          <Typography variant="body2">Copied {shareData.url} to clipboard.</Typography>
        </Box>
      </Popover>
    </Box>
  );
}
