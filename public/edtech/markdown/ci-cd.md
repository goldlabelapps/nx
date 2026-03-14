# CI/CD

I was getting bored of my CI/CD pipeline failing. Entirely my fault. I didn't run lint/build/test before committing so vercel fails

I thought; What would Chuck Gentry do? He'd do it properly.

So I installed [husky](https://github.com/typicode/husky) and set up a precommit script that runs all the same scripts as vercel does and does not let me commit anything that is not going to work further down the CI/CD pipeline. Importantly this means that I don't need to remember some isoteric procedure or pass that on to some new dev. Husky is standard and entirely understandable to all. Solves the problem too
