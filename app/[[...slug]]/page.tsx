import type { I_NestedNav, T_Tenant, T_Frontmatter } from '../NX/types';
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
    Box,
    Container,
    Typography,
} from '@mui/material';
import { NX } from '../NX';
import {
    serverUseMDBySlug,
    serverUseAllMd,
    serverUseNav,
    getTenant,
    getMeta,
} from '../NX/lib/index.server';
import {
    Icon,
    Header,
    Hero,
    Footer,
    TreeNav,
} from '../NX/DesignSystem';
import { RenderMarkdown } from '../NX/Shortcodes';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    const resolvedParams = typeof params.then === 'function' ? await params : params;
    const slugArr = resolvedParams?.slug || [];
    const tenant = process.env.NEXT_PUBLIC_TENANT || "nx";
    const { config } = getTenant(tenant as T_Tenant);
    const filePath = serverUseMDBySlug(slugArr, tenant);
    let frontmatter: T_Frontmatter = {};
    if (filePath && fs.existsSync(filePath)) {
        const md = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(md);
        frontmatter = data;
    }
    let url = config.url || "";
    const themeMode: 'light' | 'dark' = 'light';
    let title = config.siteName || "";
    let description = config.description || "";
    let image = config.images?.[themeMode] || config.images?.light || "";
    let icon = null;
    if (filePath && fs.existsSync(filePath)) {
        const md = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(md);
        if (data?.title) title = data.title;
        if (data?.description) description = data.description;
        if (data?.url) url = data.url;
        if (typeof data?.image === 'string' && data.image.trim()) {
            image = data.image;
        }
        if (typeof data?.icon === 'string' && data.icon.trim()) {
            icon = data.icon;
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
    const tenant = process.env.NEXT_PUBLIC_TENANT || "nx";
    const { markdownDir } = getTenant(tenant as T_Tenant);
    let allSlugs = serverUseAllMd(markdownDir, tenant);
    return allSlugs.map((slugArr) => {
        const normalized = slugArr.filter(Boolean);
        return { slug: normalized.length ? normalized : undefined };
    });
}

export default async function Page(props: any) {
    const { params } = props;
    const resolvedParams = typeof params?.then === 'function' ? await params : params;
    let slugArr = resolvedParams?.slug || [];
    while (slugArr.length > 1 && slugArr[slugArr.length - 1] === "") slugArr.pop();
    const tenant = process.env.NEXT_PUBLIC_TENANT || "nx";
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
    const icon = (typeof data.icon === 'string' && data.icon.trim()) ? data.icon : null;
    const navItems = await serverUseNav();
    const themeMode: 'light' | 'dark' = (config?.cartridges?.designSystem?.defaultTheme 
            === 'dark') ? 'dark' : 'light';
    const themedImage = config?.images?.[themeMode] || config?.images?.light || null;

    // Use data.image if it's a non-empty string, otherwise fallback to themedImage
    const meta = getMeta({
        siteName: config.siteName,
        title,
        description,
        url: config.url || "",
        image: (typeof data.image === 'string' && data.image.trim()) ? data.image : themedImage,
    });

    return (
            <NX config={config} frontmatter={data}>
                <Header config={config} frontmatter={data} />
                {data.cartridge ? (
                    data.cartridge === 'orders-frontend' ? (
                        <Container id="main" maxWidth="lg" sx={{ mt: '100px', pb: '90px' }}>
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                OrdersFrontend
                            </Box>
                        </Container>
                    ) : data.cartridge === 'orders-admin' ? (
                        <Container id="main" maxWidth="lg" sx={{ mt: '100px', pb: '90px' }}>
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                OrdersAdmin
                            </Box>
                        </Container>
                    ) : data.cartridge === 'prospects' ? (
                        <Container id="main" maxWidth="lg" sx={{ mt: '100px', pb: '90px' }}>
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                Prospects Cartridge
                            </Box>
                        </Container>
                    ) : (
                        <Container id="main" maxWidth="lg" sx={{ mt: '100px', pb: '90px' }}>
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
                                    {data.title || title} (CARTRIDGE)
                                </Typography>
                                <Box>
                                    <RenderMarkdown config={config}>
                                        {content}
                                    </RenderMarkdown>
                                </Box>
                            </Box>
                        </Container>
                    )
                ) : (
                    <Container id="main" maxWidth="lg" 
                        sx={{ mt: '100px', pb: '90px' }}>
                        <Box sx={{ width: '100%', display: 'flex', gap: 1 }}>
                            <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column' }}>
                                <Box sx={{ flexGrow: 1, minHeight: 0, minWidth: 200 }}>
                                    <TreeNav navItems={navItems}/>
                                </Box>
                            </Box>
                            <Box component="main" sx={{ gridColumn: { lg: '1' }, width: '100%', minWidth: 0, pr: { xs: 2, lg: 3 }, pl: { xs: 2, lg: 0 }, flexGrow: 1 }}>
                                <Typography sx={{ display: 'flex', mt: 1 }} color='secondary' variant="h5" component="h2">
                                    <Box sx={{ display: 'flex', width: '100%' }}>
                                        {data.icon && <Box sx={{ mr: 2 }}><Icon icon={data.icon} color="primary" /></Box>}
                                        <Box sx={{ flexGrow: 1 }}>
                                            {description}
                                        </Box>
                                    </Box>
                                </Typography>
                                <Hero
                                    config={config}
                                    frontmatter={data}
                                    navItems={navItems as I_NestedNav["navItems"]}
                                />
                                <RenderMarkdown config={config}>
                                    {content}
                                </RenderMarkdown>
                            </Box>
                        </Box>
                    </Container>
                )}
                <footer>
                    <Footer
                        meta={meta as any}
                        frontmatter={data}
                        navItems={navItems as I_NestedNav["navItems"]}
                    >
                    </Footer>
                </footer>
            </NX>
    );
}
