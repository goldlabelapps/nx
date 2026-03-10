import type { I_NestedNav, T_Tenant, T_Frontmatter } from '../NX/types';
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
    Box,
    AppBar,
    IconButton,
    CardHeader,
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
} from '../NX/lib';
import {
    Icon,
    Nav,
    Hero,
    Footer,
    // Settings,
    ThemedIcon,
} from '../NX/DesignSystem';
import { RenderMarkdown } from '../NX/Shortcodes';
import { Virus } from '../NX/Virus';

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
    let image = config.images?.[themeMode] || "";
    if (filePath && fs.existsSync(filePath)) {
        const md = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(md);
        if (data?.title) title = data.title;
        if (data?.description) description = data.description;
        if (data?.url) url = data.url;
        if (data?.image) image = data.image;
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
    const themedImage = config?.images?.[themeMode] || null;

    const backgroundColor = config?.cartridges?.designSystem?.themes?.[themeMode]?.background;


    const meta = getMeta({
        siteName: config.siteName,
        title,
        description,
        url: config.url || "",
        image: themedImage || data.image,
    });

    return (
        <NX config={config} frontmatter={data}>
            <header>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar
                        position="fixed"
                        sx={{
                            top: 0,
                            boxShadow: 0,
                            // background: backgroundColor,
                            background: 0,
                        }}>
                        <Container maxWidth="lg">
                            <CardHeader
                                avatar={<IconButton href='/'>
                                    <ThemedIcon config={config} />
                                </IconButton>}
                                title={<Typography
                                    color='secondary'
                                    variant="h4"
                                    component="h1"
                                >
                                    {title}
                                </Typography>}
                                action={<>
                                </>}
                            />
                        </Container>
                    </AppBar>
                </Box>
            </header>

            <Container id="main" maxWidth="lg" sx={{ mt: '100px', pb: '90px' }}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        gap: 2,
                    }}
                >

                    <Box
                        sx={{
                            display: { xs: 'none', lg: 'flex' },
                            flexDirection: 'column',
                        }}
                    >
                        {/* Virus at top */}
                        <Box>
                            <Virus frontmatter={data} />
                        </Box>
                        {/* Spacer fills remaining space */}
                        <Box sx={{
                            flexGrow: 1,
                            minHeight: 0, overflow: 'auto'
                        }}>
                            <Nav
                                navItems={navItems as I_NestedNav["navItems"]}
                                frontmatter={data}
                                mode="desktop"
                            />
                        </Box>
                    </Box>

                    <Box
                        component="main"
                        sx={{
                            gridColumn: { lg: '1' },
                            width: '100%',
                            minWidth: 0,
                            pr: { xs: 2, lg: 3 },
                            pl: { xs: 2, lg: 0 },
                            flexGrow: 1,
                        }}>
                        <Typography
                            sx={{
                                display: 'flex',
                                mt: 1
                            }}
                            color='secondary'
                            variant="h5"
                            component="h2">

                            <Box sx={{ display: 'flex', width: '100%' }}>

                                <Box sx={{ mx: 1 }}>
                                    {data.icon && (
                                        <Icon icon={data.icon} color="primary" />
                                    )}
                                </Box>
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
            <footer>
                <Footer
                    meta={meta as any}
                    frontmatter={data}
                    navItems={navItems as I_NestedNav["navItems"]}
                />
            </footer>
        </NX >
    );
}
