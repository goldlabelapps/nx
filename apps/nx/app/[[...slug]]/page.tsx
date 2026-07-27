import type { T_Tenant } from '../NX/types';
import type { Metadata } from "next";
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import {
    serverUseMDBySlug,
    serverUseAllMd,
    serverUseNav,
    getTenant,
    getMeta,
} from '../NX/lib/index.server';
import { normalizeTenant } from '../NX/lib/normalizeTenant';
import {
    SiteFooter,
    SiteHeader,
    SiteMain,
    SiteNav,
} from '../components';
import type { T_NavNode } from '../components';

type T_PageParams = {
    slug?: string[];
};

type T_PageProps = {
    params: Promise<T_PageParams>;
};

export async function generateMetadata({ params }: T_PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const slugArr = Array.isArray(resolvedParams?.slug) ? resolvedParams.slug : [];
    const tenant = normalizeTenant();
    const { config } = getTenant(tenant as T_Tenant);
    const filePath = serverUseMDBySlug(slugArr, tenant);
    let url = config.url || "";
    const themeMode: 'light' | 'dark' = 'light';
    let title = config.siteName || "";
    let description = config.description || "";
    let image = config.images?.[themeMode] || config.images?.light || "";
    if (filePath && fs.existsSync(filePath)) {
        const md = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(md);
        if (data?.title) title = data.title;
        if (data?.description) description = data.description;
        if (data?.url) url = data.url;
        if (typeof data?.image === 'string' && data.image.trim()) {
            image = data.image;
        }
    }
    const slugPath = Array.isArray(slugArr) && slugArr.length ? slugArr.join("/") : "";
    const pageUrl = url.replace(/\/$/, "") + (slugPath ? `/${slugPath}` : "");

    return getMeta({
        siteName: title,
        title: `${title}, ${description}`,
        description,
        image,
        url: pageUrl,
    });
}

export async function generateStaticParams() {
    const tenant = normalizeTenant();
    const { markdownDir } = getTenant(tenant as T_Tenant);
    const allSlugs = serverUseAllMd(markdownDir, tenant);
    return allSlugs.map((slugArr) => {
        const normalized = slugArr.filter(Boolean);
        return { slug: normalized.length ? normalized : undefined };
    });
}

export default async function Page({ params }: T_PageProps) {
    const resolvedParams = await params;
    const slugArr = Array.isArray(resolvedParams?.slug) ? [...resolvedParams.slug] : [];
    while (slugArr.length > 1 && slugArr[slugArr.length - 1] === "") slugArr.pop();
    const tenant = normalizeTenant();
    const { config: rawConfig } = getTenant(tenant as T_Tenant);
    const config = { ...rawConfig, tenant: tenant as T_Tenant };
    const filePath = serverUseMDBySlug(slugArr, tenant);
    if (!filePath || !fs.existsSync(filePath)) notFound();
    let title = tenant.toUpperCase();
    let description = "";
    const md = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(md);
    if (data.title) title = data.title;
    if (data.description) description = data.description;
    const featuredImage = typeof data.image === 'string' && data.image.trim() ? data.image : null;
    const navItems = (await serverUseNav()) as T_NavNode[];
    const siteName = config?.siteName || 'NX°';

    return (
        <div className="site-shell">
            <SiteHeader
                siteName={siteName}
                description={config?.description || 'Template'}
                homeHref="/"
                logoSrc="/nx/png/favicon.png"
                logoAlt=""
            />

            <details className="site-floating-nav" aria-label="Mobile navigation">
                <summary className="site-mobile-nav-trigger">Menu</summary>
                <nav className="site-mobile-nav-panel" aria-label="Primary navigation">
                    <SiteNav items={navItems} />
                </nav>
            </details>

            <main className="site-main" id="main">
                <aside className="site-col site-col-left" aria-label="Primary navigation">
                    <div className="site-panel site-panel-nav">
                        <SiteNav items={navItems} />
                    </div>
                </aside>

                <SiteMain
                    title={data.title || title}
                    cartridge={data.cartridge}
                    config={config}
                    content={content}
                    featuredImage={featuredImage}
                />

                {/* <aside className="site-col site-col-right" aria-label="Sidebar placeholder">
                    <section className="site-panel site-panel-sidebar site-sidebar-placeholder">
                        <p className="site-sidebar-placeholder-label">Placeholder</p>
                        <p className="site-sidebar-placeholder-text">
                            Sidebar module intentionally muted for now.
                        </p>
                    </section>
                </aside> */}
            </main>

            <SiteFooter />
        </div>
    );
}
