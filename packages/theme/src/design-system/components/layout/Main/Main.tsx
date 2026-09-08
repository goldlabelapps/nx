import type { SiteMainProps } from './types';

export default function Main({ children, featuredImage }: SiteMainProps) {
  return (
    <section aria-label="Page content" className="site-main-content">
      {featuredImage ? (
        <div aria-label="Featured image" aria-hidden="true">
          <img src={featuredImage} alt="" />
        </div>
      ) : null}

      {children}
    </section>
  );
}
