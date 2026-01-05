#!/bin/bash

# cleanInstall.sh - Complete clean install script
# Removes all build artifacts, caches, and dependencies, then reinstalls

echo "🧹 Starting clean install..."

# Navigate to project root
cd "$(dirname "$0")/../.."

# Remove dependencies
echo "Removing node_modules..."
rm -rf node_modules

# Remove build outputs
echo "Removing .next build directory..."
rm -rf .next

# Remove Yarn cache and artifacts
echo "Removing Yarn artifacts..."
rm -rf .yarn
rm -rf .pnp.*
rm -f yarn.lock

# Remove package manager locks
echo "Removing other lock files..."
rm -f package-lock.json
rm -f pnpm-lock.yaml

# Remove common cache directories
echo "Removing cache directories..."
rm -rf .cache
rm -rf .turbo
rm -rf dist
rm -rf build
rm -rf out

# Clear Yarn cache
echo "Clearing Yarn cache..."
yarn cache clean

echo ""
echo "✨ Clean complete! Installing dependencies..."
echo ""

# Install dependencies
yarn install

echo ""
echo "📦 Building production artifacts..."
echo ""

# Build the project
yarn build

# Clear terminal for clean output
clear

echo "✅ Clean install and build complete!"
echo ""
echo "Running yarn run..."
echo ""

# Run the project
yarn run
