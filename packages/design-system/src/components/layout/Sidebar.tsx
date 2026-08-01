import type { SiteSidebarProps } from '../../types';

export default function Sidebar({
  title = 'Placeholder',
  text = 'Sidebar module intentionally muted for now.',
}: SiteSidebarProps) {
  return (
    <aside aria-label="Sidebar placeholder">
      <section>
        <p>{title}</p>
        <p>{text}</p>
      </section>
    </aside>
  );
}
