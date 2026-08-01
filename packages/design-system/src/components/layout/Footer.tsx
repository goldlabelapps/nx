export default function Footer() {
  return (
    <footer>
      <nav aria-label="Footer links">
        <section aria-label="Company links">
          <h3>Company</h3>
          <ul>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </section>

        <section aria-label="Product links">
          <h3>Features</h3>
          <ul>
            <li>
              <a href="/features/design-system">Design System</a>
            </li>
          </ul>
        </section>

        <section aria-label="Resources links">
          <h3>Techstack</h3>
          <ul>
            <li>
              <a href="/techstack/nextjs">NextJS</a>
            </li>
          </ul>
        </section>

        <section aria-label="Legal links">
          <h3>Download</h3>
          <ul>
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
