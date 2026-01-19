import type { I_NestedNav, T_Config } from '../NX/types';
import { Metadata } from "next";
import { Footer } from "../NX/DesignSystem";
import { getNavigationTree } from "../NX/lib/server/navigation-tree.server";
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
    let description = "by Goldlabel";
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
import { notFound } from "next/navigation";


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

    // Theme detection logic
    const bg = config.cartridges?.designSystem?.themes['light'].background || '#ffffff';
    const filePath = findMarkdownBySlug(slugArr, project);
    const navItems = await getNavigationTree();
    if (!filePath || !fs.existsSync(filePath)) {
        console.error("[PAGE DEBUG] Not found for slugArr:", slugArr, "filePath:", filePath);
        notFound();
    }
    let htmlContent = "<p>404, bro:(</p>";
    let title = project.toUpperCase();
    let description = "by Goldlabel";
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
                                </Box>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" component="h1" color="primary">
                                        {title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="secondary"
                                        sx={{
                                            display: {
                                                xs: 'none',
                                                sm: 'block',
                                            }
                                        }}>
                                        {description}
                                    </Typography>
                                </Box>
                                {/* Optionally add icon or actions here */}
                                {icon && (
                                    <Box sx={{ ml: 2 }}>
                                        <img src={config.favicon}
                                            alt="icon"
                                            style={{ height: 32 }} />
                                    </Box>
                                )}
                            </Box>
                        </Container>
                    </AppBar>
                </Box>

            </header>
            <Container maxWidth="xl">
                <Box
                    sx={{
                        minHeight: { xs: 56, sm: 64 },
                        my: 1
                    }}
                ></Box>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 3, md: 4 }}>
                        <nav>
                            <Nav navItems={navItems as I_NestedNav["navItems"]} currentPath={filePath} />
                        </nav>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3, md: 4 }}>
                        <main>
                            <FeaturedImage image={featuredImage} flickrSlug={flickrSlug} alt={title} />
                            <h2>{description}</h2>
                            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                        </main>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3, md: 4 }}>
                        {/* CTA Alert at top of column */}
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, alignItems: 'flex-start', mb: 2 }}>
                            <a href="/cta" style={{ textDecoration: 'none', width: '100%' }}>
                                <Alert
                                    severity="info"
                                    sx={{
                                        cursor: 'pointer',
                                        width: '100%',
                                        fontWeight: 'bold',
                                        fontSize: { xs: '1rem', md: '1.1rem' },
                                        boxShadow: 2,
                                        transition: 'box-shadow 0.2s',
                                        '&:hover': {
                                            boxShadow: 6,
                                        },
                                    }}
                                >
                                    🚀 Check out our Call To Action!
                                </Alert>
                            </a>
                        </Box>
                    </Grid>
                </Grid>

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
