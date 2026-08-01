import type { SiteHeaderProps } from '../../types';

export default function Header({
  title,
  description,
  breadcrumbItems,
  homeHref,
  logoSrc,
  logoAlt = '',
  navItems,
}: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header-top" aria-label="Main header bar">
        <div className="site-brand" aria-label="Brand and overview">
          <div className="site-header-title-row">
            <a className="site-home-link" href={homeHref} aria-label="Home">
              <img src={logoSrc} alt={logoAlt} aria-hidden={true} />
            </a>
            <div className="site-header-text-stack">
              <h1>{title}</h1>
              {breadcrumbItems.length ? (
                <nav className="site-breadcrumbs" aria-label="Breadcrumb">
                  <ol>
                    {breadcrumbItems.map((item, index) => {
                      const isCurrent = index === breadcrumbItems.length - 1 || !item.href;
                      return (
                        <li key={`${item.label}-${index}`}>
                          {isCurrent ? <span aria-current="page">{item.label}</span> : <a href={item.href}>{item.label}</a>}
                        </li>
                      );
                    })}
                  </ol>
                </nav>
              ) : (
                <span className="site-header-description">{description}</span>
              )}
            </div>
          </div>
        </div>

        <details className="site-header-mobile-nav" aria-label="Mobile navigation">
          <summary className="site-mobile-nav-trigger">Menu</summary>
          <nav className="site-mobile-nav-panel" aria-label="Primary navigation">
            {navItems}
          </nav>
        </details>
      </div>
    </header>
  );
}
