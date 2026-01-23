import type { I_NestedNav, T_Config } from '../NX/types';
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { serverUseNav } from "../NX/lib/";
import fs from "fs";
import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";
import {
    AppBar,
    Avatar,
    Box,
    CardHeader,
    Container,
    IconButton,
    Typography,
} from '@mui/material';
import {
    serverUseMDBySlug,
    serverUseAllMd,
    serverUsePhoto,
} from '../NX/lib';
import { NX } from '../NX';
import { Icon, Nav, Footer } from '../NX/DesignSystem';
// import { FeaturedImage } from '../NX/Images';
import { Commerce } from '../NX/Commerce';
import { RenderMarkdown } from '../NX/Shortcodes';


import nxConfig from '../../public/nx/config.json';
import mcukConfig from '../../public/mcuk/config.json';
import echopayConfig from '../../public/echopay/config.json';
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

    const photo = await serverUsePhoto(config, frontmatter);
    console.log('photo', photo)

    let title = config.title || project.toUpperCase();
    let description = config.description || "";
    let image = "/shared/target.jpg";
    if (config.image) image = config.image;

    let url = config.url || "";
    if (filePath && fs.existsSync(filePath)) {
        const md = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(md);
        if (data.title) title = data.title;
        if (data.description) description = data.description;
        if (data.image) image = data.image;
        if (data.url) url = data.url;
    }
    const slugPath = Array.isArray(slugArr) && slugArr.length ? slugArr.join("/") : "";
    const pageUrl = url.replace(/\/$/, "") + (slugPath ? `/${slugPath}` : "");
    return {
        title,
        description,
        openGraph: {
            title: `${title}, ${description}`,
            description,
            url: pageUrl,
            siteName: config.title,
            images: [image, photo], // include photo in images array
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image, photo], // include photo in images array
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
    } else if (project === 'edtech') {
        config = edtechConfig as T_Config;
    } else {
        config = nxConfig as T_Config;
    }
    const bg = config.cartridges?.designSystem?.themes['light'].background || '#ffffff';
    const filePath = serverUseMDBySlug(slugArr, project);
    const navItems = await serverUseNav();
    if (!filePath || !fs.existsSync(filePath)) {
        notFound();
    };
    let title = project.toUpperCase();
    let description = "";
    let image = "/shared/jpg/target.jpg";
    if (config.image) image = config.image;
    const md = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(md);
    const photo = await serverUsePhoto(config, data);
    if (data.title) title = data.title;
    if (data.description) description = data.description;
    if (data.image) image = data.image;

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
                                    sx={{
                                    }}
                                    color='secondary'
                                    variant="h4"
                                    component="h1"
                                >
                                    {title}
                                </Typography>}
                                action={
                                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>

                                        <Nav
                                            mode="mobile"
                                            navItems={navItems as I_NestedNav["navItems"]}
                                            currentPath={slugPath || '/'}
                                            config={config}
                                        />
                                    </Box>
                                }
                            />
                        </Container>
                    </AppBar>
                </Box>
            </header>
            <Container maxWidth="xl" sx={{ my: '60px' }}>
                <Box sx={{ minHeight: { xs: 56, sm: 64 }, my: 1 }}></Box>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            lg: '250px 1fr 400px'
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
                            width: { lg: '250px' },
                            minWidth: { lg: '250px' },
                            maxWidth: { lg: '250px' },
                            gridColumn: { lg: '1' },
                        }}
                    >
                        <Nav
                            config={config}
                            navItems={navItems as I_NestedNav["navItems"]}
                            currentPath={slugPath || '/'}
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

                        {/* {(data.image || data.flickr || photo) && (
                            <FeaturedImage
                                frontmatter={{ ...data, image: photo }}
                                config={config}
                            />
                        )} */}
                        <RenderMarkdown config={config}>
                            {content}
                        </RenderMarkdown>
                    </Box>

                    <Box
                        sx={{
                            display: { xs: 'none', lg: 'block' },
                            width: { lg: '400px' },
                            minWidth: { lg: '400px' },
                            maxWidth: { lg: '400px' },
                            gridColumn: { lg: '3' },
                            pr: 3,
                        }}
                    >
                        <Box sx={{}}>
                            {data.cartridge && (
                                <Typography color="primary" variant="body1">
                                    cartridge: {data.cartridge}
                                </Typography>
                            )}
                            <Commerce config={config} />
                        </Box>
                    </Box>
                </Box>
            </Container>
            <footer>
                <Footer
                    config={config}
                    frontmatter={data}
                />
            </footer>
        </NX>
    );
}
