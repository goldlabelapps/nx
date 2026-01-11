// Opens the default browser to http://localhost:1999
const open = require('open');

const url = 'http://localhost:1999';
open(url).catch((err) => {
    console.error('Failed to open browser:', err);
    process.exit(1);
});
