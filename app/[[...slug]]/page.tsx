import type { I_NestedNav, T_Config } from '../NX/types';
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getNav } from "../NX/lib/server/getNav";
import fs from "fs";
import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";
import {
    findMarkdownBySlug,
    getAllMarkdownSlugsFromFrontmatter,
} from '../NX/lib';
import { NX } from '../NX';
import { Nav, FeaturedImage } from '../NX/DesignSystem';
import {
    AppBar,
    Avatar,
    Box,
    Container,
    Divider,
    IconButton,
    Typography,
    Grid,
    Alert,
} from '@mui/material';

import nxConfig from '../../public/nx/config.json';
import mcukConfig from '../../public/mcuk/config.json';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    const fs = require("fs");
    const matter = require("gray-matter");
    const resolvedParams = typeof params.then === 'function' ? await params : params;
    const slugArr = resolvedParams?.slug || [];
    const project = process.env.NEXT_PUBLIC_PROJECT || "nx";
    const filePath = findMarkdownBySlug(slugArr, project);
    let title = project.toUpperCase();
    let description = "";
    if (filePath && fs.existsSync(filePath)) {
        const md = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(md);
        if (data.title) title = data.title;
        if (data.description) description = data.description;
    }
    return {
        title: `${title}, ${description}`,
        description,
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
        case 'nx':
        default:
            markdownDir = path.resolve(process.cwd(), "public", "nx", "markdown");
    }

    let allSlugs = getAllMarkdownSlugsFromFrontmatter(markdownDir, project);

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
    const project = process.env.NEXT_PUBLIC_PROJECT || "nx";
    const config: T_Config = project === 'mcuk' ? (mcukConfig as T_Config) : (nxConfig as T_Config);
    const bg = config.cartridges?.designSystem?.themes['light'].background || '#ffffff';
    const filePath = findMarkdownBySlug(slugArr, project);
    const navItems = await getNav();
    if (!filePath || !fs.existsSync(filePath)) {
        console.error("[PAGE DEBUG] Not found for slugArr:", slugArr, "filePath:", filePath);
        notFound();
    }
    let htmlContent = "<p>404, bro:(</p>";
    let title = project.toUpperCase();
    let description = "";
    let featuredImage = undefined;
    let flickrSlug = undefined;
    let icon = undefined;
    const md = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(md);
    if (data.title) title = data.title;
    if (data.description) description = data.description;
    if (data.image) featuredImage = data.image;
    if (data.flickrSlug) flickrSlug = data.flickrSlug;
    if (data.icon) icon = data.icon;
    const result = await remark().use(html).process(content);
    htmlContent = result.toString();

    return (
        <NX config={config}>
            <header>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="fixed" sx={{ top: 0, boxShadow: 0, bgcolor: bg }}>
                        <Container maxWidth="xl" sx={{ py: 1 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    minHeight: { xs: 56, sm: 64 }
                                }}
                            >
                                <Box>
                                    <a href='/'>
                                        <IconButton
                                            edge="start"
                                            color="inherit"
                                            aria-label={title}
                                            sx={{ mr: 1 }}>
                                            <Avatar
                                                alt={config.title}
                                                src={config.favicon}
                                                sx={{ width: 40, height: 40 }}
                                            />
                                        </IconButton>
                                    </a>
                                </Box>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography
                                        sx={{
                                            mt: 0.5,
                                        }}
                                        color='secondary'
                                        variant="h6"
                                        component="h1"
                                    >
                                        {title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="secondary"
                                        sx={{
                                            mt: -1,
                                            display: {
                                                xs: 'none',
                                                sm: 'block',
                                            }
                                        }}>
                                        {description}
                                    </Typography>
                                </Box>
                            </Box>
                        </Container>
                    </AppBar>
                </Box>
            </header>
            <Container maxWidth="xl">
                <Box sx={{ minHeight: { xs: 56, sm: 64 }, my: 1 }}></Box>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: '250px 1fr 250px'
                        },
                        gap: 2,
                        alignItems: 'start',
                        width: '100%'
                    }}
                >
                    {/* Left nav */}
                    <Box
                        component="nav"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            width: { md: '250px' },
                            minWidth: { md: '250px' },
                            maxWidth: { md: '250px' },
                            gridColumn: { md: '1' },
                        }}
                    >
                        <Nav
                            navItems={navItems as I_NestedNav["navItems"]}
                            currentPath={filePath}
                        />
                    </Box>

                    <Box
                        component="main"
                        sx={{
                            gridColumn: { md: '2' },
                            width: '100%',
                            minWidth: 0,
                        }}
                    >
                        <FeaturedImage image={featuredImage} flickrSlug={flickrSlug} alt={title} />
                        <Typography variant='h2'>{description}</Typography>
                        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </Box>


                    <Box
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            width: { md: '250px' },
                            minWidth: { md: '250px' },
                            maxWidth: { md: '250px' },
                            gridColumn: { md: '3' },
                        }}
                    >
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', mb: 2 }}>
                            <a href="/cta" style={{ textDecoration: 'none', width: '100%' }}>
                                <Alert
                                    variant='filled'
                                    severity="success"
                                    sx={{
                                        cursor: 'pointer',
                                        width: '100%',
                                        '&:hover': {
                                            background: 'black',
                                        },
                                    }}
                                >
                                    <Typography variant='h6'>
                                        Call To Action!
                                    </Typography>

                                </Alert>
                            </a>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <Box
                sx={{
                    width: '100%',
                    position: 'sticky',
                    bottom: 0,
                    left: 0,
                    mt: 'auto',
                    zIndex: 1300,
                }}
            >
                <Divider />
                <footer></footer>
            </Box>
        </NX>
    );
}
