import type { T_Tenant } from '../NX/types';
import type { Metadata } from "next";
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import {
    Breadcrumb,
    DesktopOnly,
    FeaturedImage,
    Heading,
    SiteFooter,
    Header,
    SiteMain as DesignSystemSiteMain,
    SiteNav,
    type T_NavNode,
} from '@nx/design-system';
import nxConfig from '../../nx.config.json';
import HeaderActions from '../NX/DesignSystem/HeaderActions';
import RoutedSiteNav from '../NX/DesignSystem/RoutedSiteNav';
import { ThemeModeProvider } from '../NX/DesignSystem/ThemeModeContext';
import {
    serverUseMDBySlug,
    serverUseAllMd,
    serverUseNav,
    getTenant,
    getMeta,
} from '../NX/lib/index.server';
import { normalizeTenant } from '../NX/lib/normalizeTenant';
import { RenderMarkdown } from '../NX/Shortcodes';

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
    const pageDescription = description || config?.description || '';
    const featuredImageSrc = typeof data.image === 'string' && data.image.trim()
        ? data.image
        : config.images?.light || '';
    const navItems = (await serverUseNav()) as T_NavNode[];
    const breadcrumbItems = slugArr.length
        ? [
            { label: 'Home', href: '/' },
            ...slugArr.map((segment, index) => {
                const path = `/${slugArr.slice(0, index + 1).join('/')}`;
                const isCurrent = index === slugArr.length - 1;
                const label = isCurrent ? (data.title || title) : segment.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
                return isCurrent ? { label } : { label, href: path };
            }),
        ]
        : [];

    const designSystemConfig = nxConfig?.cartridges?.designSystem;
    const defaultThemeName = typeof designSystemConfig?.defaultTheme === 'string' && designSystemConfig.defaultTheme.trim()
        ? designSystemConfig.defaultTheme
        : 'light';
    const themes = designSystemConfig?.themes as Record<string, {
        mode?: string;
        primary?: string;
        secondary?: string;
        background?: string;
        paper?: string;
        text?: string;
        textSecondary?: string;
    }> | undefined;
    const selectedTheme = (themes?.[defaultThemeName] ?? themes?.light);
    const themeMode = selectedTheme?.mode === 'dark' ? 'dark' : 'light';
    const themeConfigs = {
        light: themes?.light
            ? {
                primary: themes.light.primary,
                secondary: themes.light.secondary,
                background: themes.light.background,
                paper: themes.light.paper,
                text: themes.light.text,
                textSecondary: themes.light.textSecondary,
            }
            : undefined,
        dark: themes?.dark
            ? {
                primary: themes.dark.primary,
                secondary: themes.dark.secondary,
                background: themes.dark.background,
                paper: themes.dark.paper,
                text: themes.dark.text,
                textSecondary: themes.dark.textSecondary,
            }
            : undefined,
    };

    return (
        <ThemeModeProvider initialMode={themeMode} themeConfigs={themeConfigs}>
            <div className="site-shell">
                
                <Header
                    title={data.title || title}
                    description={slugArr.length ? '' : (config?.description || '')}
                    homeHref="/"
                    logoSrc="/nx/png/favicon.png"
                    navItems={<RoutedSiteNav items={navItems} />}
                    actions={<HeaderActions navItems={<RoutedSiteNav items={navItems} />} />}
                />

                <main className="site-main" id="main">
                    <DesktopOnly>
                        <aside 
                            className="site-col site-col-left" 
                            style={{ marginTop: 50 }}
                            aria-label="NX°  Navigation">
                            <RoutedSiteNav items={navItems} />
                        </aside>
                    </DesktopOnly>

                    <DesignSystemSiteMain>

                        {pageDescription ? (
                            <Heading variant="h2" style={{ marginBottom: '1rem' }} tone="secondary">
                                {pageDescription}
                            </Heading>
                        ) : null}

                        
                        {featuredImageSrc ? (
                            <FeaturedImage
                                image={{
                                    src: featuredImageSrc,
                                    alt: [data.title, data.description]
                                        .filter((part): part is string => typeof part === 'string' && part.trim().length > 0)
                                        .join(', ') || null,
                                }}
                            />
                        ) : null}
                        
                        {breadcrumbItems.length ? (
                            <div style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                                <Breadcrumb items={breadcrumbItems} />
                            </div>
                        ) : null}

                        <RenderMarkdown config={config}>{content}</RenderMarkdown>
                    </DesignSystemSiteMain>
                    {/* <aside aria-label="NX°  Sidebar">
                        Aside, share
                    </aside> */}
                </main>
                
                <SiteFooter />

            </div>
        </ThemeModeProvider>
    );
}
