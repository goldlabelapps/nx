import type { I_NestedNav, T_Tenant } from '../NX/types';
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
    Box,
    AppBar,
    Avatar,
    CardHeader,
    Container,
    IconButton,
    Typography,
} from '@mui/material';
import { NX } from '../NX';
import {
    serverUseMDBySlug,
    serverUseAllMd,
    serverUseSmartImage,
    serverUseNav,
    getTenant,
} from '../NX/lib';
import {
    Icon,
    Nav,
    Hero,
    Footer,
} from '../NX/DesignSystem';
import { Commerce } from '../NX/Commerce';
import { RenderMarkdown } from '../NX/Shortcodes';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    const resolvedParams = typeof params.then === 'function' ? await params : params;
    const slugArr = resolvedParams?.slug || [];
    const tenant = process.env.NEXT_PUBLIC_TENANT || "nx";
    const { config } = getTenant(tenant as T_Tenant);
    const filePath = serverUseMDBySlug(slugArr, tenant);
    let frontmatter: Record<string, any> = {};
    if (filePath && fs.existsSync(filePath)) {
        const md = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(md);
        frontmatter = data;
    }
    let url = config.url || "";
    const featuredImage = await serverUseSmartImage(config, frontmatter);
    if (!featuredImage) {
        console.log("No image for", frontmatter?.title);
    }

    let title = config.title || "";
    let description = config.description || "";
    const themeMode: 'light' | 'dark' = 'light';
    const themes = config?.cartridges?.designSystem?.themes;
    let theme = themes && themeMode in themes ? themes[themeMode as keyof typeof themes] : undefined;
    if (theme) {
        theme = { ...theme, mode: themeMode };
    }

    if (filePath && fs.existsSync(filePath)) {
        const md = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(md);
        if (data?.title) title = data.title;
        if (data?.description) description = data.description;
        if (data?.url) url = data.url;
    }
    const slugPath = Array.isArray(slugArr) && slugArr.length ? slugArr.join("/") : "";
    const pageUrl = url.replace(/\/$/, "") + (slugPath ? `/${slugPath}` : "");

    return {
        title: `${title}, ${description}`,
        description,
        openGraph: {
            title: `${title}, ${description}`,
            description,
            url: pageUrl,
            siteName: config.title,
            images: [featuredImage.src],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [featuredImage.src],
            site: config.title,
        },
    };
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
    while (slugArr.length > 1 && slugArr[slugArr.length - 1] === "") {
        slugArr.pop();
    }
    const tenant = process.env.NEXT_PUBLIC_TENANT || "nx";
    const { config } = getTenant(tenant as T_Tenant);
    const filePath = serverUseMDBySlug(slugArr, tenant);
    if (!filePath || !fs.existsSync(filePath)) notFound();
    let title = tenant.toUpperCase();
    let description = "";
    const md = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(md);
    if (data.title) title = data.title;
    if (data.description) description = data.description;
    const navItems = await serverUseNav(data.slug || "/");
    const themeMode: 'light' | 'dark' = (config?.cartridges?.designSystem?.defaultTheme === 'dark') ? 'dark' : 'light';
    const themes = config?.cartridges?.designSystem?.themes;
    let theme = themes && themeMode in themes ? themes[themeMode as keyof typeof themes] : undefined;
    if (theme) {
        theme = { ...theme, mode: themeMode };
    }
    const bgCol = theme?.background || '#000';
    let themedIcon = config?.icon || null;
    if (themeMode === 'dark' && 'darkIcon' in config && typeof config.darkIcon === 'string') {
        themedIcon = config.darkIcon || themedIcon;
    }
    const validScenes = ['EchoPay', 'NXMC'];
    let sceneSlug: string | undefined = undefined;
    if (data.flash && validScenes.includes(data.flash)) {
        sceneSlug = data.flash;
    }

    return (
        <NX config={config}
            frontmatter={data}
            flash={sceneSlug}>
            <header>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar
                        position="fixed"
                        sx={{
                            top: 0,
                            boxShadow: 0,
                            background: bgCol,
                        }}>
                        <Container maxWidth="xl">
                            <CardHeader
                                avatar={<a href='/'>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        aria-label={title}
                                        sx={{}}>
                                        <Avatar
                                            alt={config.title}
                                            src={themedIcon || ''}
                                        />
                                    </IconButton>
                                </a>}
                                title={<Typography
                                    color='secondary'
                                    variant="h4"
                                    component="h1"
                                >
                                    {title}
                                </Typography>}
                            />
                        </Container>
                    </AppBar>
                </Box>
            </header>

            <Container id="main" maxWidth="xl" sx={{ mt: '100px', pb: '90px' }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            lg: '200px 1fr 320px'
                        },
                        gap: 2,
                        alignItems: 'start',
                        width: '100%'
                    }}
                >
                    <Box
                        component="nav"
                        sx={{
                            display: { xs: 'none', lg: 'block' },
                            width: { lg: '200px' },
                            minWidth: { lg: '200px' },
                            maxWidth: { lg: '200px' },
                            gridColumn: { lg: '1' },
                        }}
                    >
                        <Nav
                            config={config}
                            navItems={navItems as I_NestedNav["navItems"]}
                            currentPath={data.slug || '/'}
                            mode="desktop"
                        />
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            gridColumn: { lg: '2' },
                            width: '100%',
                            minWidth: 0,
                            pr: { xs: 2, lg: 3 },
                            pl: { xs: 2, lg: 0 },
                        }}>
                        <Hero
                            config={config}
                            frontmatter={data}
                            navItems={navItems as I_NestedNav["navItems"]}
                        />
                        <Typography
                            sx={{
                                display: 'flex',
                            }}
                            color='secondary'
                            variant="h5"
                            component="h2">
                            {data.icon && (
                                <Box sx={{ mr: 2 }}>
                                    <Icon icon={data.icon} color="inherit" />
                                </Box>
                            )}
                            {description}
                        </Typography>

                        <RenderMarkdown config={config}>
                            {content}
                        </RenderMarkdown>
                    </Box>
                    <Box sx={{
                        display: { xs: 'none', lg: 'block' },
                        width: { lg: '320px' },
                        minWidth: { lg: '320px' },
                        maxWidth: { lg: '320px' },
                        gridColumn: { lg: '3' },
                        pr: 3,
                    }}>
                        <Box sx={{}}>
                            <Commerce config={config} />
                        </Box>
                    </Box>
                </Box>
            </Container>
            <footer>
                <Footer
                    config={config}
                    frontmatter={data}
                    navItems={navItems as I_NestedNav["navItems"]}
                />
            </footer>
        </NX >
    );
}
