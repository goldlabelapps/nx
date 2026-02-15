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
import { DesignSystem, Icon, Nav, Settings, SmartImage } from '../NX/DesignSystem';
import { Commerce } from '../NX/Commerce';
import { RenderMarkdown } from '../NX/Shortcodes';
import nxConfig from '../../public/nx/config.json';
import mcukConfig from '../../public/mcuk/config.json';
import echopayConfig from '../../public/echopay/config.json';
import { EchoPay } from '../NX/EchoPay';
import akiConfig from '../../public/aki/config.json';
import flashConfig from '../../public/flash/config.json';
import edtechConfig from '../../public/edtech/config.json';
import { Example } from '../NX/Flash';

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
    const navItems = await serverUseNav();
    if (!filePath || !fs.existsSync(filePath)) {
        notFound();
    };
    let title = project.toUpperCase();
    let description = "";
    const md = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(md);
    const smartImage = await serverUseSmartImage(config, data);
    if (data.title) title = data.title;
    if (data.description) description = data.description;



    // Remove cartridge flag logic. Prepare for flash prop logic below.
    const themeMode = 'light';
    const theme = config?.cartridges?.designSystem?.themes?.[themeMode];

    // If a flash prop is present in frontmatter, use its value to select the Scene
    const flashScene = data.flash;

    // If flashScene is present, dynamically import and render the correct Scene
    if (flashScene) {
        // Only import React components from known scenes
        let SceneComponent: React.ComponentType | null = null;
        if (flashScene.toLowerCase() === 'example') {
            SceneComponent = (await import('../NX/Flash/Scenes/Example')).Example;
        } else if (flashScene.toLowerCase() === 'goldlabel') {
            SceneComponent = (await import('../NX/Flash/Scenes/Goldlabel')).Goldlabel;
        }
        if (SceneComponent) {
            return <DesignSystem theme={theme}>
                <SceneComponent />
            </DesignSystem>;
        }
    }

    // ...existing code...
    return (
        <NX config={config}>
            {/* ...existing code... */}
        </NX>
    );
}
