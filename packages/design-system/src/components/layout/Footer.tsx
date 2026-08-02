export default function Footer() {
  return (
    <footer style={{ paddingBlock: '0.75rem' }}>
      <nav
        aria-label="Footer links"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '0.5rem 1rem',
          alignItems: 'start',
        }}
      >
        <section aria-label="Company links" style={{ margin: 0 }}>
          <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', lineHeight: 1.25 }}>Company</h3>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </section>

        <section aria-label="Product links" style={{ margin: 0 }}>
          <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', lineHeight: 1.25 }}>Features</h3>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            <li>
              <a href="/features/design-system">Design System</a>
            </li>
          </ul>
        </section>

        <section aria-label="Resources links" style={{ margin: 0 }}>
          <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', lineHeight: 1.25 }}>Techstack</h3>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            <li>
              <a href="/techstack/nextjs">NextJS</a>
            </li>
          </ul>
        </section>

        <section aria-label="Legal links" style={{ margin: 0 }}>
          <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', lineHeight: 1.25 }}>Download</h3>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            <li>
              <a href="https://github.com/goldlabelapps/nx" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </section>
      </nav>
    </footer>
  );
}
