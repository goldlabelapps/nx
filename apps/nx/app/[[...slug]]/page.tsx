import type { T_Tenant } from '../NX/types';
import type { ReactNode } from 'react';
import type { Metadata } from "next";
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { NX } from '../NX';
import {
    serverUseMDBySlug,
    serverUseAllMd,
    serverUseNav,
    getTenant,
    getMeta,
} from '../NX/lib/index.server';
import { normalizeTenant } from '../NX/lib/normalizeTenant';
import { RenderMarkdown } from '../NX/Shortcodes';
import { ShareVirus } from '../../public/shared/flash';

type T_NavNode = {
    title?: string;
    slug?: string;
    path?: string;
    children?: T_NavNode[];
};

type T_PageParams = {
    slug?: string[];
};

type T_PageProps = {
    params: Promise<T_PageParams>;
};

function getNavHref(item: T_NavNode): string {
    if (typeof item.slug === 'string' && item.slug.trim()) {
        return item.slug;
    }
    if (typeof item.path === 'string' && item.path.trim()) {
        return item.path;
    }
    return '#';
}

function renderNavItems(items: T_NavNode[], keyPrefix = 'nav'): ReactNode {
    if (!Array.isArray(items) || !items.length) {
        return null;
    }

    return (
        <ul className="site-nav-list">
            {items.map((item, index) => {
                const key = `${keyPrefix}-${index}-${item.title || item.slug || item.path || 'node'}`;
                const hasChildren = Array.isArray(item.children) && item.children.length > 0;
                const label = item.title || 'Untitled';
                return (
                    <li key={key} className={hasChildren ? 'site-nav-item site-nav-item-branch' : 'site-nav-item'}>
                        {hasChildren ? (
                            <details className="site-nav-branch">
                                <summary className="site-nav-branch-summary">
                                    <a href={getNavHref(item)}>{label}</a>
                                    <span className="site-nav-branch-toggle" aria-hidden="true">+</span>
                                </summary>
                                {renderNavItems(item.children as T_NavNode[], key)}
                            </details>
                        ) : (
                            <a href={getNavHref(item)}>{label}</a>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

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
    const siteName = config?.siteName || tenant.toUpperCase();
    const pageDescription = description || config?.description || '';

    return (
            <div className="site-shell">
                <header className="site-header">
                    <div className="site-header-top" aria-label="Main header bar">
                        <div className="site-brand">
                            <a className="site-home-reset" href="/" aria-label="Home and reset to root">
                                <img
                                    src="/nx/png/favicon.png"
                                    alt=""
                                    aria-hidden={true}
                                    width={30}
                                    height={30}
                                />
                            </a>
                        </div>
                    </div>

                    <div className="site-header-hero" aria-label="Page introduction">
                        <div className="site-header-copy">
                            <p className="site-header-eyebrow">{data.title || title}</p>
                            <p>{pageDescription}</p>
                        </div>
                    </div>
                </header>

                <details className="site-floating-nav" aria-label="Mobile navigation">
                    <summary className="site-mobile-nav-trigger">Menu</summary>
                    <nav className="site-mobile-nav-panel" aria-label="Primary navigation">
                        {renderNavItems(navItems)}
                    </nav>
                </details>

                <main className="site-main" id="main">
                    <aside className="site-col site-col-left" aria-label="Primary navigation">
                        <div className="site-panel site-panel-nav">
                            {renderNavItems(navItems)}
                        </div>
                    </aside>

                    <section className="site-col site-col-center" aria-label="Page content">
                        <div className="site-panel site-panel-main">
                            {featuredImage ? (
                                <div className="site-featured-image" aria-label="Featured image" aria-hidden="true">
                                    <img className="site-featured-image-bg" src={featuredImage} alt="" />
                                </div>
                            ) : null}
                            {data.cartridge ? (
                                data.cartridge === 'virus' ? (
                                    <ShareVirus config={config} />
                                ) : (
                                    <>
                                        <h2>{data.title || title} (CARTRIDGE)</h2>
                                        <RenderMarkdown config={config}>
                                            {content}
                                        </RenderMarkdown>
                                    </>
                                )
                            ) : (
                                <RenderMarkdown config={config}>
                                    {content}
                                </RenderMarkdown>
                            )}
                        </div>
                    </section>

                    <aside className="site-col site-col-right" aria-label="Sidebar placeholder">
                        <section className="site-panel site-panel-sidebar site-sidebar-placeholder">
                            <p className="site-sidebar-placeholder-label">Placeholder</p>
                            <p className="site-sidebar-placeholder-text">
                                Sidebar module intentionally muted for now.
                            </p>
                        </section>
                    </aside>
                </main>

                <footer className="site-footer">
                    <div className="site-footer-top">
                        <div className="site-footer-brand" aria-label="Brand and overview">
                            <h2>{siteName}</h2>
                            <p>{config?.description || 'Docs, updates, and product resources in one place.'}</p>
                        </div>

                        <nav className="site-footer-columns" aria-label="Footer links">
                            <section className="site-footer-section" aria-label="Product links">
                                <h3>Product</h3>
                                <ul>
                                    <li><a href="/">Overview</a></li>
                                    <li><a href="/NX">Features</a></li>
                                    <li><a href="/account">Account</a></li>
                                    <li><a href="/settings">Settings</a></li>
                                </ul>
                            </section>

                            <section className="site-footer-section" aria-label="Resources links">
                                <h3>Resources</h3>
                                <ul>
                                    <li><a href="/shared">Documentation</a></li>
                                    <li><a href="/free">Free tools</a></li>
                                    <li><a href="/shared">Templates</a></li>
                                    <li><a href="/history">Release notes</a></li>
                                </ul>
                            </section>

                            <section className="site-footer-section" aria-label="Company links">
                                <h3>Company</h3>
                                <ul>
                                    <li><a href="/about">About</a></li>
                                    <li><a href="/contact">Contact</a></li>
                                    <li><a href="/careers">Careers</a></li>
                                    <li><a href="/status">Status</a></li>
                                </ul>
                            </section>

                            <section className="site-footer-section" aria-label="Legal links">
                                <h3>Legal</h3>
                                <ul>
                                    <li><a href="/privacy">Privacy</a></li>
                                    <li><a href="/terms">Terms</a></li>
                                    <li><a href="/security">Security</a></li>
                                    <li><a href="/cookies">Cookies</a></li>
                                </ul>
                            </section>
                        </nav>
                    </div>

                    <div className="site-footer-bottom">
                        <ul className="site-footer-social" aria-label="Social links">
                            <li>
                                <a
                                    href="https://github.com/goldlabelapps/nx-turbo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Open source on GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>
    );
}
