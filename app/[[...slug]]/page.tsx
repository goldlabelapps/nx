import Header from "../goldlabel/components/Header";
import Footer from "../goldlabel/components/Footer";
import { Navigation } from "../goldlabel/components";
import { getNavigationTree } from "../goldlabel/lib/navigation-tree.server";

import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";

export default async function Page({ params }: any) {
    const navItems = getNavigationTree();
    // Determine markdown file path from slug
    let mdPath = "app/goldlabel/markdown";
    if (params?.slug && params.slug.length > 0) {
        mdPath += "/" + params.slug.join("/");
    }
    // Try index.md first, then .md
    let filePath = path.join(process.cwd(), mdPath + ".md");
    if (!fs.existsSync(filePath)) {
        filePath = path.join(process.cwd(), mdPath, "index.md");
    }
    let htmlContent = "<p>Page not found.</p>";
    let title = "NX";
    let description = "by Goldlabel";
    if (fs.existsSync(filePath)) {
        const md = fs.readFileSync(filePath, "utf-8");
        const { content, data } = matter(md);
        if (data.title) title = data.title;
        if (data.description) description = data.description;
        const result = await remark().use(html).process(content);
        htmlContent = result.toString();
    }
    return (
        <div className="page-layout">
            <header className="page-header">
                <Header title={title} description={description} />
            </header>
            <main className="page-main">
                <nav className="col col-left desktop-nav">
                    <Navigation items={navItems} />
                </nav>
                <div className="col col-center">
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </div>
                <div className="col col-right">Right Column</div>
            </main>
            <footer className="page-footer">
                <Footer />
            </footer>
        </div>
    );
}
