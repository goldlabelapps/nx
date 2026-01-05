#!/usr/bin/env node

const { exec } = require('child_process');
const http = require('http');

const url = 'http://localhost:1975';
const maxRetries = 30;
const retryDelay = 1000; // 1 second

function checkServer(retries = 0) {
    http.get(url, (res) => {
        if (res.statusCode === 200 || res.statusCode === 404) {
            // Server is ready (404 is fine, it means server is responding)
            console.log(`\n🚀 Opening browser at ${url}...`);

            // Open browser based on platform
            const command = process.platform === 'darwin'
                ? `open ${url}`
                : process.platform === 'win32'
                    ? `start ${url}`
                    : `xdg-open ${url}`;

            exec(command, (error) => {
                if (error) {
                    console.error('Failed to open browser:', error.message);
                    process.exit(1);
                }
                process.exit(0);
            });
        }
    }).on('error', () => {
        if (retries < maxRetries) {
            setTimeout(() => checkServer(retries + 1), retryDelay);
        } else {
            console.error(`\n❌ Could not connect to ${url} after ${maxRetries} attempts`);
            process.exit(1);
        }
    });
}

console.log('⏳ Waiting for Next.js dev server to be ready...');
checkServer();
