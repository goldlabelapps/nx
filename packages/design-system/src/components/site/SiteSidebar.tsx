type SiteSidebarProps = {
  title?: string;
  text?: string;
};

export function SiteSidebar({
  title = 'Placeholder',
  text = 'Sidebar module intentionally muted for now.',
}: SiteSidebarProps) {
  return (
    <aside className="site-col site-col-right" aria-label="Sidebar placeholder">
      <section className="site-panel site-panel-sidebar site-sidebar-placeholder">
        <p className="site-sidebar-placeholder-label">{title}</p>
        <p className="site-sidebar-placeholder-text">{text}</p>
      </section>
    </aside>
  );
}
