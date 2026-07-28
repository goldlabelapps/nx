type T_SiteSidebarProps = {
    title?: string;
    text?: string;
};

export default function SiteSidebar({
    title = 'Placeholder',
    text = 'Sidebar module intentionally muted for now.',
}: T_SiteSidebarProps) {
    return (
        <aside className="site-col site-col-right" aria-label="Sidebar placeholder">
            <section className="site-panel site-panel-sidebar site-sidebar-placeholder">
                <p className="site-sidebar-placeholder-label">{title}</p>
                <p className="site-sidebar-placeholder-text">{text}</p>
            </section>
        </aside>
    );
}

/*

[PageLink icon="github" description="Free, open source NextJS app framework for rapid fullstack development" title="goldlabelapps/nx" url="https://github.com/goldlabelapps/nx"]  

[PageLink icon = "github" description = "Open Source, production ready Python FastAPI/Postgres app for NX" title = "goldlabelapps/python" url = "https://github.com/goldlabelapps/python"]  

*/
