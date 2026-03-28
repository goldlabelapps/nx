'use client';
import * as React from 'react';
import { T_Meta, T_Frontmatter } from '../types.d';
import { useRouter } from 'next/navigation';
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from 'react-share';
import { 
  Container,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Skeleton,
  Box, 
  Typography, 
  ButtonBase, 
  Popover, 
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from '@mui/material';
import { Icon, useConfig, navigateTo } from '../../NX/DesignSystem';
import { useDispatch } from '../../NX/Uberedux';
import { useIsMobile } from '../Flash/lib/hooks/useIsMobile';

export default function Virus({
  meta,
  frontmatter,
}: {
  meta?: T_Meta,
  frontmatter?: T_Frontmatter
}) {
  const config = useConfig();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const router = useRouter();
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

  // Fallback to config image if image is empty, undefined, or whitespace
  const themeMode = (config?.theme?.mode || config?.theme?.palette?.mode || 'light').toLowerCase();
  if (!image || typeof image !== 'string' || image.trim() === '') {
    if (config?.images) {
      image = config.images[themeMode] || config.images.light || '';
    }
  }

  // Preloader state for image
  const [imgLoaded, setImgLoaded] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (frontmatter) {
        const port = window.location.port ? ':' + window.location.port : '';
        setUrl(window.location.protocol + '//' + window.location.hostname + port + (frontmatter.slug || '/'));
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

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="xs" 
        fullWidth
        fullScreen={isMobile}
      >
      <DialogContent>
        <Box id="virus">
          
          <Box sx={{mx: 0, mt: 0}}>

            {/* Show CardMedia with Skeleton preloader if image is a non-empty string */}
            {typeof image === 'string' && image.trim() ? (
              <Box sx={{ width: '100%', m: 0, p: 0, position: 'relative', overflow: 'hidden' }}>
                {!imgLoaded && (
                  <Skeleton variant="rectangular" width="100%" height={175} />
                )}

                  <CardHeader
                    sx={{ mx: 2 }}
                    title={title || 'No title'}
                    subheader={description || 'No description'}
                    avatar={icon ? <Icon icon={icon as any} color="primary" /> : null}
                    action={<IconButton
                      color="primary"
                      onClick={() => dispatch(navigateTo(router, url, '_blank'))}
                    >
                      <Icon icon="link" />
                    </IconButton>}
                  />
                <CardMedia
                  component="img"
                  image={image}
                  alt={title || 'image'}
                  sx={{
                    display: imgLoaded ? 'block' : 'none',
                    width: '100%',
                    height: 175,
                    objectFit: 'contain',
                    objectPosition: 'center',
                    borderRadius: 0,
                    mt: 1
                  }}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgLoaded(true)}
                />
              </Box>
            ) : null}

            
            </Box>
            <CardContent>
              
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

            </CardContent>

            
        </Box>
          </DialogContent>

          <DialogActions>
            <IconButton
              onClick={() => setOpen(false)}
              color="primary"
            >
              <Icon icon="close" />
            </IconButton>
          </DialogActions>
          
        
      </Dialog>
    </>
  );
}
