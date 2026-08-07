const path = require('path');
const { resolveMarkdownRoot } = require('./app/NX/lib/markdownRoots.ts');
console.log('resolved', resolveMarkdownRoot());
