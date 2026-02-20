import type { I_NestedNav, T_Config } from '../NX/types';
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { serverUseNav } from "../NX/lib/";
import fs from "fs";
import matter from "gray-matter";
import {
    Box,
    AppBar,
    Avatar,
    CardHeader,
    Container,
    IconButton,
    Typography,
} from '@mui/material';
import {
    serverUseMDBySlug,
    serverUseAllMd,
    serverUseSmartImage,
} from '../NX/lib';
import { NX } from '../NX';
import { Icon, Nav, Settings, SmartImage } from '../NX/DesignSystem';
import { Commerce } from '../NX/Commerce';
import { RenderMarkdown } from '../NX/Shortcodes';
import nxConfig from '../../public/nx/config.json';
import mcukConfig from '../../public/mcuk/config.json';
import echopayConfig from '../../public/echopay/config.json';
import akiConfig from '../../public/aki/config.json';
import flashConfig from '../../public/flash/config.json';
import edtechConfig from '../../public/edtech/config.json';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    const fs = require("fs");
    const matter = require("gray-matter");
    const resolvedParams = typeof params.then === 'function' ? await params : params;
    const slugArr = resolvedParams?.slug || [];
    const project = process.env.NEXT_PUBLIC_PROJECT || "nx";
    let config: T_Config;
    if (project === 'mcuk') {
        config = mcukConfig as T_Config;
    } else if (project === 'echopay') {
        config = echopayConfig as T_Config;
    } else if (project === 'edtech') {
        config = edtechConfig as T_Config;
    } else if (project === 'aki') {
        config = akiConfig as T_Config;
    } else if (project === 'flash') {
        config = flashConfig as T_Config;
    } else {
        config = nxConfig as T_Config;
    }
    const filePath = serverUseMDBySlug(slugArr, project);
    let frontmatter = {};
    if (filePath && fs.existsSync(filePath)) {
        const md = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(md);
        frontmatter = data;
    }
    let url = config.url || "";
    const smartImage = await serverUseSmartImage(config, frontmatter);
    let title = config.title || project.toUpperCase();
    let description = config.description || "";

    const themeMode = 'light';
    const theme = config?.cartridges?.designSystem?.themes?.[themeMode];


    if (filePath && fs.existsSync(filePath)) {
        const md = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(md);
        if (data.title) title = data.title;
        if (data.description) description = data.description;
        if (data.url) url = data.url;
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
            images: [smartImage.src],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [smartImage.src],
            site: config.title,
        },
    };
}


export async function generateStaticParams() {
    const path = require("path");
    const project = process.env.NEXT_PUBLIC_PROJECT || "nx";
    let markdownDir;
    switch (project) {
        case 'mcuk':
            markdownDir = path.resolve(process.cwd(), "public", "mcuk", "markdown");
            break;
        case 'echopay':
            markdownDir = path.resolve(process.cwd(), "public", "echopay", "markdown");
            break;
        case 'edtech':
            markdownDir = path.resolve(process.cwd(), "public", "edtech", "markdown");
            break;
        case 'aki':
            markdownDir = path.resolve(process.cwd(), "public", "aki", "markdown");
            break;
        case 'flash':
            markdownDir = path.resolve(process.cwd(), "public", "flash", "markdown");
            break;
        case 'nx':
        default:
            markdownDir = path.resolve(process.cwd(), "public", "nx", "markdown");
    }

    let allSlugs = serverUseAllMd(markdownDir, project);

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
    // Define slugPath for use as currentPath
    const slugPath = Array.isArray(slugArr) && slugArr.length ? slugArr.join("/") : "";
    const project = process.env.NEXT_PUBLIC_PROJECT || "nx";
    let config: T_Config;
    if (project === 'mcuk') {
        config = mcukConfig as T_Config;
    } else if (project === 'echopay') {
        config = echopayConfig as T_Config;
    } else if (project === 'aki') {
        config = akiConfig as T_Config;
    } else if (project === 'edtech') {
        config = edtechConfig as T_Config;
    } else if (project === 'flash') {
        config = flashConfig as T_Config;
    } else {
        config = nxConfig as T_Config;
    }
    const bg = config.cartridges?.designSystem?.themes['light'].background || '#ffffff';
    const filePath = serverUseMDBySlug(slugArr, project);

    if (!filePath || !fs.existsSync(filePath)) {
        notFound();
    };
    let title = project.toUpperCase();
    let description = "";
    const md = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(md);
    if (data.title) title = data.title;
    if (data.description) description = data.description;

    const navItems = await serverUseNav(data.slug || "/");

    // Remove cartridge flag logic. Prepare for flash prop logic below.
    const themeMode = 'light';
    const theme = config?.cartridges?.designSystem?.themes?.[themeMode];

    // If a flash prop is present in frontmatter, use its value to select the Scene
    const flashScene = data.flash;

    // If flashScene is present, dynamically import and render the correct Scene
    if (flashScene) {
        // Only import React components from known scenes
        let SceneComponent: React.ComponentType<{ config: T_Config }> | null = null;
        if (flashScene.toLowerCase() === 'nxmc') {
            SceneComponent = (await import('../../public/nx/flash')).NXMC;
        } else if (flashScene.toLowerCase() === 'echopay') {
            SceneComponent = (await import('../../public/echopay/flash')).EchoPay;
        }
        if (SceneComponent) {
            // Pass config prop if available
            return <SceneComponent config={config} />;

        }
    }

    // ...existing code...
    return (
        <NX config={config}>
            <header>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar
                        position="fixed"
                        sx={{
                            top: 0,
                            boxShadow: 0,
                            bgcolor: bg,
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
                                            src={config.icon}
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
                                action={
                                    <Box sx={{
                                        display: "flex"
                                    }}>

                                        <Settings
                                            config={config}
                                            frontmatter={data}
                                        />
                                        <Nav
                                            mode="mobile"
                                            navItems={navItems as I_NestedNav["navItems"]}
                                            currentPath={data.slug || '/'}
                                            config={config}
                                        />
                                    </Box>
                                }
                            />
                        </Container>
                    </AppBar>
                </Box>
            </header>
            {/* Start Main */}
            <Container id="main" maxWidth="xl" sx={{ mt: '100px', pb: '80px' }}>
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
                        }}
                    >
                        <Typography
                            sx={{
                                display: 'flex',
                            }}
                            color='secondary'
                            variant="h5"
                            component="h2"
                        >
                            {data.icon && (
                                <Box sx={{ mr: 2 }}>
                                    <Icon icon={data.icon} color="primary" />
                                </Box>
                            )}
                            {description}
                        </Typography>
                        {/* smartImage functionality removed */}

                        <RenderMarkdown config={config}>
                            {content}
                        </RenderMarkdown>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', lg: 'block' },
                            width: { lg: '320px' },
                            minWidth: { lg: '320px' },
                            maxWidth: { lg: '320px' },
                            gridColumn: { lg: '3' },
                            pr: 3,
                        }}
                    >
                        <Box sx={{}}>
                            <Commerce config={config} />
                        </Box>
                    </Box>
                </Box>
            </Container>
            {/* End Main */}
            <footer>

            </footer>
        </NX >
    );
}
