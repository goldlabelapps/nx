'use client';
import * as React from 'react';
import { T_Meta, T_Frontmatter } from '../types.d';
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from 'react-share';
import { 
  CardMedia,
  CardHeader,
  CardContent,
  Skeleton,
  Box, Typography, ButtonBase, Popover, Dialog,
} from '@mui/material';
import { Icon } from '../../NX/DesignSystem';

export default function Virus({
  meta,
  frontmatter,
}: {
  meta?: T_Meta,
  frontmatter?: T_Frontmatter
}) {
  let title = meta?.title || '';
  let description = meta?.description || '';
  let image = '';
  let icon = '';
  const [copied, setCopied] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [url, setUrl] = React.useState('');
  const [open, setOpen] = React.useState(false);

  if (frontmatter) {
    title = frontmatter.title || title;
    description = frontmatter.description || description;
    image = frontmatter.image || '';
    icon = frontmatter.icon || '';
  } else if (meta) {
    image = meta.openGraph?.images?.[0] || '';
  }

  // Preloader state for image
  const [imgLoaded, setImgLoaded] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (frontmatter) {
        setUrl(window.location.protocol + '//' + window.location.hostname + (frontmatter.slug || '/'));
      } else if (meta?.openGraph?.url) {
        setUrl(meta.openGraph.url);
      } else {
        setUrl(window.location.href);
      }
    }
  }, [frontmatter, meta]);

  return (
    <>
      <ButtonBase onClick={() => setOpen(true)} sx={{ }}>
        <Icon icon="share" color="primary" />
      </ButtonBase>

      
      <Popover
        open={copied}
        anchorEl={anchorEl}
        onClose={() => {
          setCopied(false);
          setAnchorEl(null);
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        disableRestoreFocus
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="body1">
            {url} copied to clipboard
          </Typography>
        </Box>
      </Popover>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>

        <Box id="virus">
            {/* Show CardMedia with Skeleton preloader if image is a non-empty string */}
            {typeof image === 'string' && image.trim() ? (
              <Box sx={{ width: '100%', maxWidth: 400, m: 2 }}>
                {!imgLoaded && (
                  <Skeleton variant="rectangular" width="100%" height={200} />
                )}
                <CardMedia
                  component="img"
                  image={image}
                  alt={title || 'image'}
                  sx={{ display: imgLoaded ? 'block' : 'none', width: '100%', height: 200, objectFit: 'cover', borderRadius: 2 }}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgLoaded(true)}
                />
              </Box>
            ) : null}

            <CardHeader
              sx={{mx: 2}}
              title={title || 'No title'}
              subheader={description || 'No description'}
              avatar={icon ? <Icon icon={icon as any} color="primary" /> : null}
            />

            <CardContent>
              <Box sx={{ ml: 2 }}>
                <ButtonBase
                  onClick={e => {
                    navigator.clipboard.writeText(url);
                    setCopied(true);
                    setAnchorEl(e.currentTarget);
                    setTimeout(() => {
                      setCopied(false);
                      setAnchorEl(null);
                    }, 3500);
                  }}
                >
                  <Icon icon="copy" color="primary" />
                  <Typography
                    variant="body2"
                    sx={{
                      ml: 1,
                    }}
                  >
                    Copy link
                  </Typography>
                </ButtonBase>
              </Box>
              <Box sx={{ m: 2 }}>
                <TwitterShareButton url={url}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon icon="twitter" color={'primary'} />
                    <Typography variant="body2" sx={{ mx: 1 }}>
                      X/Twitter
                    </Typography>
                  </Box>
                </TwitterShareButton>
              </Box>

              <Box sx={{ m: 2 }}>
                <FacebookShareButton url={url} >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon icon="facebook" color={'primary'} />
                    <Typography variant="body2" sx={{ mx: 1 }}>
                      Facebook
                    </Typography>
                  </Box>
                </FacebookShareButton>
              </Box>

              <Box sx={{ m: 2 }}>
                <LinkedinShareButton
                  url={url}
                  summary={description}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon icon="linkedin" color={'primary'} />
                    <Typography variant="body2" sx={{ mx: 1 }}>
                      LinkedIn
                    </Typography>
                  </Box>
                </LinkedinShareButton>
              </Box>
              <Box sx={{ m: 2 }}>
                <WhatsappShareButton
                  url={url}
                  separator=" - "
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon icon="whatsapp" color={'primary'} />
                    <Typography variant="body2" sx={{ mx: 1 }}>
                      WhatsApp
                    </Typography>
                  </Box>
                </WhatsappShareButton>
              </Box>

            </CardContent>

            
        </Box>
      </Dialog>
    </>
  );
}
