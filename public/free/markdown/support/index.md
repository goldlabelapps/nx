---
order: 1000
title: Support
description: Getting started
slug: /support
icon: info
tags: help, support, install
---

> Spin up a new NX° tenant on Vercel.

As a logged in GitHub user, go to [github.com/goldlabelapps/nx](https://github.com/goldlabelapps/nx) & click Use this template

This creates a new repo on your github account. It can be public or private. Private is recommended.

Clone the new repo, cd into it and install the dependencies with yarn. It's possible to use npm or pnpm if you wish, but you may need to adjust some tooling

```sh
git clone https://github.com/<you>/<repo-name>.git
cd <repo-name>
yarn
```

Once the javascript dependencies are installed, run `yarn dev` to start the NextJS dev server. You will see the NX 404 page. 

Now we need to setup the rest of our environment using an .env file. 

```sh
cp .env.example .env
```

