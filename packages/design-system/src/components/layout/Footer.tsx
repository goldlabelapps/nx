import { AppBar, Box, Toolbar } from '@mui/material';
import Heading from '../headings/Heading';

export default function Footer() {
  return (
    <AppBar
      component="footer"
      position="fixed"
      color="transparent"
      elevation={0}
      className="site-footer"
      sx={{
        top: 'auto',
        bottom: 0,
        backgroundColor: 'color-mix(in srgb, var(--surface-page) 72%, transparent)',
        backdropFilter: 'blur(14px) saturate(130%)',
        WebkitBackdropFilter: 'blur(14px) saturate(130%)',
      }}
    >
      <Toolbar disableGutters className="site-footer-toolbar">
        <Box
          component="nav"
          aria-label="Footer"
          className="site-footer-columns"
          
        >
          <section aria-label="Company links" className="site-footer-section" 
          style={{ margin: 0 }}>
            <Heading as="h3" style={{ margin: '0 0 0.2rem 0', fontSize: '0.8rem', lineHeight: 1.2 }}>
              Company
            </Heading>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', textAlign: 'left' }}>
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          </section>

          <section aria-label="Product links" className="site-footer-section" style={{ margin: 0 }}>
            <Heading as="h3" style={{ margin: '0 0 0.2rem 0', fontSize: '0.8rem', lineHeight: 1.2 }}>
              Features
            </Heading>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              <li>
                <a href="/features/design-system">Design System</a>
              </li>
            </ul>
          </section>

          <section aria-label="Resources links" className="site-footer-section" style={{ margin: 0 }}>
            <Heading as="h3" style={{ margin: '0 0 0.2rem 0', fontSize: '0.8rem', lineHeight: 1.2 }}>
              Techstack
            </Heading>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              <li>
                <a href="/techstack/nextjs">NextJS</a>
              </li>
            </ul>
          </section>

          <section aria-label="Legal links" className="site-footer-section" style={{ margin: 0 }}>
            <Heading as="h3" style={{ margin: '0 0 0.2rem 0', fontSize: '0.8rem', lineHeight: 1.2 }}>
              Download
            </Heading>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              <li>
                <a href="https://github.com/goldlabelapps/nx" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </section>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
