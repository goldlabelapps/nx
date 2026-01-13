#!/bin/bash

# Clean build and dependency artifacts for the project
set -e

echo "Cleaning .next, .yarn, node_modules, next-env.d.ts, and yarn.lock..."
rm -rf .next .yarn node_modules next-env.d.ts yarn.lock
echo "Clean complete."
