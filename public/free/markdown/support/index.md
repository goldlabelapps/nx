---
order: 1000
title: Support
description: Get it right quickly
slug: /support
icon: info
tags: help, support
---
## Getting started

These instructions help you spin up a new working NX tenant on vercel.

- Go to https://github.com/goldlabelapps/nx
- Click Use this template

This will create a new repo on your github account. It can be public or private. Private is recommended.

- Clone the new repo, cd into it and install the dependencies with yarn. It's possible to use npm or pnpm if you wish, but you may need to adjust some tooling

```sh
git clone https://github.com/<you>/<repo-name>.git
cd <repo-name>
yarn
```

- Once the javascript dependencies are installed, run `yarn dev` to start the NextJS dev server. You will see the NX 404 page. 

Now we need to setup the rest of our environment using an .env file. 

```sh
cp .env.example .env
```