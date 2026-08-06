import Link from 'next/link';
import type { ChildPageLink } from '../NX/lib/serverHooks/serverUseChildPages';

type ChildPagesAsideProps = {
  items: ChildPageLink[];
};

export default function ChildPagesAside({ items }: ChildPagesAsideProps) {
  if (!items.length) {
    return null;
  }

  return (
    <aside className="site-col site-col-right" aria-label="Child pages">
      <section className="site-panel">
        <h3 className="site-sidebar-placeholder-label">
            Child Pages
        </h3>
        <ul className="site-nav-list">
          {items.map((item) => (
            <li key={item.path} className="site-nav-item">
              <Link href={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
