// Next.js App Router: set page metadata
import { Metadata } from "next";
// Generate metadata for dynamic title/description
export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    // Find the markdown file by matching frontmatter.slug
    const fs = require("fs");
    const path = require("path");
    const matter = require("gray-matter");
    function findMarkdownBySlug(slugArr: string[] = []) {
        let foundPath: string | null = null;
        const walk = (dir: string) => {
            if (!fs.existsSync(dir)) return;
            const entries = fs.readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
                if (entry.isDirectory()) {
                    walk(path.join(dir, entry.name));
                } else if (entry.name.endsWith(".md")) {
                    const filePath = path.join(dir, entry.name);
                    const { data } = matter(fs.readFileSync(filePath, "utf-8"));
                    let slug = data.slug;
                    if (typeof slug === "string") {
                        slug = slug.replace(/^\/+/, "");
                        if ((slugArr.length === 0 && (slug === "" || slug === undefined)) || slugArr.join("/") === slug) {
                            foundPath = filePath;
                        }
                    }
                }
            }
        };
        // Use the NEXT_PUBLIC_PROJECT env variable to determine markdown folder location
        const project = process.env.NEXT_PUBLIC_PROJECT || "goldlabel";
        const markdownDir = `public/${project}/markdown`;
        walk(markdownDir);
        return foundPath;
    }
    const resolvedParams = typeof params.then === 'function' ? await params : params;
    const filePath = findMarkdownBySlug(resolvedParams?.slug || []);
    let title = "NX";
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
// Recursively collect all slugs for markdown files using frontmatter.slug
function getAllMarkdownSlugsFromFrontmatter(dir = `public/${process.env.NEXT_PUBLIC_PROJECT || "goldlabel"}/markdown`): string[][] {
    const fs = require("fs");
    const path = require("path");
    const matter = require("gray-matter");
    let slugs: string[][] = [];
    if (!fs.existsSync(dir)) {
        // Directory does not exist, return empty array
        return slugs;
    }
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory()) {
            slugs = slugs.concat(getAllMarkdownSlugsFromFrontmatter(path.join(dir, entry.name)));
        } else if (entry.name.endsWith(".md")) {
            const filePath = path.join(dir, entry.name);
            const { data } = matter(fs.readFileSync(filePath, "utf-8"));
            let slug = data.slug;
            if (typeof slug === "string") {
                slug = slug.replace(/^\/+/, ""); // remove leading slash
                if (slug === "") {
                    slugs.push([]); // root
                } else {
                    slugs.push(slug.split("/"));
                }
            }
        }
    }
    return slugs;
}

export async function generateStaticParams() {
    const slugs = getAllMarkdownSlugsFromFrontmatter();
    return slugs.map((slugArr) => ({ slug: slugArr.length ? slugArr : undefined }));
}

import Header from "../goldlabel/components/Header";
import Footer from "../goldlabel/components/Footer";
import { Navigation } from "../goldlabel/components";
// No useEffect/useState in server components
import { getNavigationTree } from "../goldlabel/lib/navigation-tree.server";
import Image from "next/image";
import goldlabelConfig from "../goldlabel/goldlabel.config.mjs";
import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";
import CallToAction from "../goldlabel/components/CallToAction";

export default async function Page({ params }: any) {
    // Unwrap params if it's a Promise (Next.js app router)
    const resolvedParams = typeof params.then === 'function' ? await params : params;
    const navItems = await getNavigationTree();
    // Find the markdown file by matching frontmatter.slug
    function findMarkdownBySlug(slugArr: string[] = []) {
        const fs = require("fs");
        const path = require("path");
        const matter = require("gray-matter");
        let foundPath: string | null = null;
        const walk = (dir: string) => {
            if (!fs.existsSync(dir)) return;
            const entries = fs.readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
                if (entry.isDirectory()) {
                    walk(path.join(dir, entry.name));
                } else if (entry.name.endsWith(".md")) {
                    const filePath = path.join(dir, entry.name);
                    const { data } = matter(fs.readFileSync(filePath, "utf-8"));
                    let slug = data.slug;
                    if (typeof slug === "string") {
                        slug = slug.replace(/^\/+/, "");
                        if ((slugArr.length === 0 && (slug === "" || slug === undefined)) || slugArr.join("/") === slug) {
                            foundPath = filePath;
                        }
                    }
                }
            }
        };
        // Use the project prop from config to determine markdown folder location
        const project = process.env.NEXT_PUBLIC_PROJECT || "goldlabel";
        const markdownDir = `public/${project}/markdown`;
        walk(markdownDir);
        return foundPath;
    }

    const filePath = findMarkdownBySlug(resolvedParams?.slug || []);
    if (!filePath || !fs.existsSync(filePath)) {
        notFound();
    }
    let htmlContent = "<p>Page not found.</p>";
    let title = "NX";
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
        <div className="page-layout">
            <header className="page-header">
                <Header title={title} description={description} icon={icon} />
            </header>
            <main className="page-main container">
                <div className="col col-left">
                    {/* Left column intentionally left empty for 900px layout; content moved to right column */}
                </div>
                <div className="col col-center">
                    {featuredImage && (
                        <div className="featured-image" style={{ width: '100%', height: 315, overflow: 'hidden', marginBottom: '1.5rem', borderRadius: '1rem' }}>
                            <Image
                                src={featuredImage}
                                alt={title}
                                width={1200}
                                height={315}
                                style={{ objectFit: 'cover', width: '100%', height: '100%', display: 'block', borderRadius: '1rem' }}
                                priority
                            />
                        </div>
                    )}
                    <div className="markdown-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    {title.startsWith("404") && (
                        <div className="not-found-message">
                            <h2>404 - Page Not Found</h2>
                            <p>Sorry, the page you are looking for does not exist.</p>
                        </div>
                    )}
                </div>
                <nav className="col col-right desktop-nav">
                    <div className="ccta-nav-stack">

                        <div className="medium-nav">
                            <Navigation items={navItems} />
                        </div>



                    </div>
                    <CallToAction label="Buy Cannabis Online" />
                </nav>
            </main>
            <footer className="page-footer">
                <Footer />
            </footer>
        </div>
    );
}
