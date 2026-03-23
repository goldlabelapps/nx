---
order: 1 
slug: /
title: NX
description: EchoPay Orders™ Summer 2026
tags: NX, Goldlabel, Multi-tenant, Tenant, JavaScript, Vanilla JavaScript, TypeScript, React, Material UI, Flash, Server Side JavaScript, Node, NextJS, Headless CMS
icon: home
image: /nx/png/nx-trans.png
---




#### Vot iss?

NX is a multi-tenant Next.js platform for building and deploying high-performance web applications quickly.
It delivers built-in SEO optimisation, accessibility, and scalable architecture so teams can launch modern web products without rebuilding the foundations each time.

It provides a pre-built architecture for accessibility, performance, and modern frontend best practices, allowing teams to deploy production-ready applications quickly without rebuilding the same infrastructure each time.

#### Cartridges

- Design System
- Uberedux
- Shortcodes
- Paywall

# Public Folder

The `public/` directory contains all static assets that are publicly available when the app is deployed. This includes images, favicons, manifest files, and project-specific folders.

## Purpose
- All files in `public/` are served at the root of your deployed site (e.g., `/public/logo.png` is available at `https://yourdomain.com/logo.png`).
- Assets in this folder are not protected and can be accessed by anyone.
- Use this folder for images, icons, manifest files, and any other static files required by your app or by individual projects.

# Multi-Project Support in NX

This NX install supports running multiple projects from a single codebase by using the `NEXT_PUBLIC_PROJECT` environment variable.

## How it works
- Set the required `NEXT_PUBLIC_PROJECT` variable in your `.env.local` (defaults to `goldlabel` if not set).
- When set (e.g. `mcuk`), the app will use assets from `/public/projects/<project>`.
- Project-specific files such as `manifest.json`, `styles.css`, favicons, and other assets should be placed in `/public/projects/<project>/`.
- This allows you to maintain multiple branded projects (e.g. `goldlabel`, `mcuk`, etc.) in a single NX install.

## Example
```
NEXT_PUBLIC_PROJECT=mcuk
```
This will load assets from `/public/projects/mcuk/`.

## Required assets per project
- `manifest.json`
- `styles.css`
- Favicons and other static assets

## Folder structure
```
/public/projects/<project>/manifest.json
/public/projects/<project>/styles.css
/public/projects/<project>/favicon.ico
...etc
```
