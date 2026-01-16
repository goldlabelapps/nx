
# NX Goldlabel

```sh
  "scripts": {
    "dev": "yarn kill && yarn install && rm -rf .next && next dev -p 1999 --webpack & sleep 1 && yarn open",
    "build": "next build --webpack",
    "start": "next start",
    "lint": "eslint",
    "clean": "yarn kill && bash app/NX/lib/bash/clean.sh",
    "kill": "bash app/NX/lib/bash/kill.sh",
    "open": "node app/goldlabel/lib/openInBrowser.js",
    "firebase": "node app/goldlabel/lib/firebase-cli.js"
  },
```

> `lsof -i :1999 | awk 'NR>1 {print $2}' | xargs -r kill`

