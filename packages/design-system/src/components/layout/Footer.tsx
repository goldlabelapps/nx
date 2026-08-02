import { Box } from '@mui/material';
import Heading from '../headings/Heading';

export default function Footer() {
  return (
    <Box
      component="footer"
      className="site-footer"
    >
      <Box
        component="nav"
        aria-label="Footer links"
        className="site-footer-columns"
      >
        <section aria-label="Company links" style={{ margin: 0 }}>
          <Heading as="h3" style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', lineHeight: 1.25 }}>
            Company
          </Heading>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </section>

        <section aria-label="Product links" style={{ margin: 0 }}>
          <Heading as="h3" style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', lineHeight: 1.25 }}>
            Features
          </Heading>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            <li>
              <a href="/features/design-system">Design System</a>
            </li>
          </ul>
        </section>

        <section aria-label="Resources links" style={{ margin: 0 }}>
          <Heading as="h3" style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', lineHeight: 1.25 }}>
            Techstack
          </Heading>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            <li>
              <a href="/techstack/nextjs">NextJS</a>
            </li>
          </ul>
        </section>

        <section aria-label="Legal links" style={{ margin: 0 }}>
          <Heading as="h3" style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', lineHeight: 1.25 }}>
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
    </Box>
  );
}
