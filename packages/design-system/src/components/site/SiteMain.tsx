import type { ReactNode } from 'react';

type SiteMainProps = {
  children: ReactNode;
  featuredImage?: string | null;
};

export function SiteMain({ children, featuredImage }: SiteMainProps) {
  return (
    <section className="site-col site-col-center" aria-label="Page content">
      <div className="site-panel site-panel-main">
        {featuredImage ? (
          <div className="site-featured-image" aria-label="Featured image" aria-hidden="true">
            <img className="site-featured-image-bg" src={featuredImage} alt="" />
          </div>
        ) : null}

        {children}
      </div>
    </section>
  );
}
