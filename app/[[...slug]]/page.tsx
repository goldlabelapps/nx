import type { I_NestedNav } from '../NX/types';
import { Metadata } from "next";
import { NX } from '../NX';
import nxConfig from '../../public/nx/config.mjs';
import mcukConfig from '../../public/mcuk/config.mjs';
import edTechConfig from '../../public/ed-tech/config.mjs';
import { NestedNav, FeaturedImage } from '../NX/DesignSystem';
import { findMarkdownBySlug, getAllMarkdownSlugsFromFrontmatter } from '../NX/lib';

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
        case 'ed-tech':
            markdownDir = path.resolve(process.cwd(), "public", "ed-tech", "markdown");
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

import { Header, Footer } from "../NX/DesignSystem";
import { getNavigationTree } from "../NX/lib/server/navigation-tree.server";
import fs from "fs";
import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";

export default async function Page(props: any) {
    const { params } = props;
    const resolvedParams = typeof params?.then === 'function' ? await params : params;
    let slugArr = resolvedParams?.slug || [];
    while (slugArr.length > 1 && slugArr[slugArr.length - 1] === "") {
        slugArr.pop();
    }
    const project = process.env.NEXT_PUBLIC_PROJECT || "nx";
    let config;
    switch (project) {
        case 'mcuk':
            config = mcukConfig;
            break;
        case 'ed-tech':
            config = edTechConfig;
            break;
        case 'nx':
        default:
            config = nxConfig;
    }

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
            <div className="page-layout">
                <header className="page-header">
                    <div className="header-content">
                        <Header title={title} description={description} icon={icon} />
                    </div>

                    <nav className="col col-right desktop-nav mobile-nav-border mobile-menu-content">
                        <div className="ccta-nav-stack">
                            <div className="medium-nav">
                                <NestedNav navItems={navItems as I_NestedNav["navItems"]} currentPath={filePath} />
                            </div>
                        </div>
                    </nav>
                </header>
                <main className="page-main container">
                    <div className="col col-left">
                        Left column intentionally left empty for 900px
                        layout; content moved to right column
                    </div>
                    <div className="col col-center">
                        <FeaturedImage image={featuredImage} flickrSlug={flickrSlug} alt={title} />
                        <h2>{description}</h2>
                        <div className="markdown-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                        {title.startsWith("404") && (
                            <div className="not-found-message">
                                <h2>404 bro :(</h2>
                                <p>Sorry, the page you are looking for does not exist.</p>
                            </div>
                        )}
                    </div>
                </main>
                <footer className="page-footer">
                    <Footer />
                </footer>
            </div>
        </NX>
    );
}
