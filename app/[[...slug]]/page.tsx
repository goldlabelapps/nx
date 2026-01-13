// Next.js App Router: set page metadata
import { Metadata } from "next";
import { NX } from '../NX';
import type { I_NestedNav } from '../NX/types';
import { NestedNav } from '../NX/Nav';
import { findMarkdownBySlug, getAllMarkdownSlugsFromFrontmatter } from '../NX/lib';

// Generate metadata for dynamic title/description
export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    const fs = require("fs");
    const path = require("path");
    const matter = require("gray-matter");

    const resolvedParams = typeof params.then === 'function' ? await params : params;
    const slugArr = resolvedParams?.slug || [];
    // Always use the project from .env, not hardcoded
    const project = process.env.NEXT_PUBLIC_PROJECT || "nx";
    // Use the correct markdown directory for the project
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
    console.log("[generateStaticParams] Generating static params for all projects...");
    const fs = require("fs");
    const path = require("path");
    const publicDir = path.resolve(process.cwd(), "public");
    const project = process.env.NEXT_PUBLIC_PROJECT || "nx";
    const markdownDir = path.resolve(process.cwd(), "public", project, "markdown");
    let allSlugs = getAllMarkdownSlugsFromFrontmatter(markdownDir, project);
    return allSlugs.map((slugArr) => ({ slug: slugArr.length ? slugArr : undefined }));
}

import Header from "../goldlabel/components/Header";
import Footer from "../goldlabel/components/Footer";
import { getNavigationTree } from "../goldlabel/lib/navigation-tree.server";
import Image from "next/image";
import fs from "fs";
import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";
import CallToAction from "../goldlabel/components/CallToAction";

export default async function Page({ params }: any) {


    const resolvedParams = typeof params.then === 'function' ? await params : params;
    const slugArr = resolvedParams?.slug || [];
    const project = process.env.NEXT_PUBLIC_PROJECT || "nx";
    // Use the correct markdown directory for the project
    const filePath = findMarkdownBySlug(slugArr, project);
    const navItems = await getNavigationTree();
    if (!filePath || !fs.existsSync(filePath)) {
        notFound();
    }
    let htmlContent = "<p>404, bro:(</p>";
    let title = project.toUpperCase();
    let description = "by Goldlabel";
    let featuredImage = undefined;
    let icon = undefined;
    const md = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(md);
    if (data.title) title = data.title;
    if (data.description) description = data.description;
    if (data.image) {
        featuredImage = data.image;
    } else {
        featuredImage = undefined;
    }
    if (data.icon) icon = data.icon;
    const result = await remark().use(html).process(content);
    htmlContent = result.toString();

    return (
        <NX>
            <div className="page-layout">
                <header className="page-header">
                    <Header title={title} description={description} icon={icon} />
                </header>
                <main className="page-main container">
                    <div className="col col-left">
                        Left column intentionally left empty for 900px
                        layout; content moved to right column
                    </div>
                    <div className="col col-center">
                        {featuredImage && (
                            <div className="featured-image" style={{ width: '100%', height: 315, overflow: 'hidden', marginBottom: '1.5rem', borderRadius: '1rem' }}>
                                <Image
                                    src={featuredImage}
                                    alt={title}
                                    width={1200}
                                    height={315}
                                    style={{ objectFit: 'cover', width: '100%', height: 'auto', display: 'block', borderRadius: '1rem' }}
                                    priority
                                />
                            </div>
                        )}
                        <h2>{description}</h2>
                        <div className="markdown-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                        {title.startsWith("404") && (
                            <div className="not-found-message">
                                <h2>404 bro :(</h2>
                                <p>Sorry, the page you are looking for does not exist.</p>
                            </div>
                        )}
                    </div>
                    <nav className="col col-right desktop-nav">
                        <div className="ccta-nav-stack">
                            <div className="medium-nav">
                                <NestedNav navItems={navItems as I_NestedNav["navItems"]} currentPath={filePath} />
                            </div>
                        </div>
                        <CallToAction label="Call To Action" />
                    </nav>
                </main>
                <footer className="page-footer">
                    <Footer />
                </footer>
            </div>
        </NX>
    );
}
