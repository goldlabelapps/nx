<div>
    <h1 style="display: flex; align-items: center; gap: 4px;">
        <a href="https://goldlabel.pro" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center;">
        <img
            src="https://goldlabel.pro/favicons/favicon_dark.png"
            width="32"
            height="32"
        />
        </a>
        <span>NX° Developer</span>
    </h1>
</div>

NX repository documentation

> Tags: docs, engineering, developer

## Developer

As a logged-in GitHub user, go to [github.com/goldlabelapps/nx](https://github.com/goldlabelapps/nx) and click "Use this template."

This creates a new repository on your GitHub account. It can be public or private. Private is recommended.

Clone the new repository, change into its directory, and install the dependencies with Yarn. If you prefer, you can use npm or pnpm, but you may need to adjust some tooling accordingly.

If you don't have Yarn installed, you can install it globally:

```sh
npm install -g yarn
```

Then run:

```sh
git clone https://github.com/<you>/<repo-name>.git
cd <repo-name>
yarn
```

Once the JavaScript dependencies are installed, run `yarn dev` to start the Next.js development server. You will see the NX 404 page.

Now we need to set up the rest of our environment using an .env file.

```sh
cp .env.example .env
```