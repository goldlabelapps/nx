import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = __dirname;
const outputJsonPath = path.join(baseDir, 'og-images.json');

/**
 * Extract image dimensions (width & height) using `sips` on macOS or buffer parsing fallback.
 */
function getImageDimensions(filePath) {
  try {
    const out = execSync(`sips -g pixelWidth -g pixelHeight "${filePath}"`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString();
    const wMatch = out.match(/pixelWidth:\s*(\d+)/);
    const hMatch = out.match(/pixelHeight:\s*(\d+)/);
    if (wMatch && hMatch) {
      return {
        width: parseInt(wMatch[1], 10),
        height: parseInt(hMatch[1], 10)
      };
    }
  } catch {
    // Fallback or ignore
  }

  // Fast binary fallback for JPEG / PNG dimensions
  try {
    const buffer = fs.readFileSync(filePath);
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
      // PNG
      return {
        width: buffer.readUInt32BE(16),
        height: buffer.readUInt32BE(20)
      };
    } else if (buffer[0] === 0xff && buffer[1] === 0xd8) {
      // JPEG
      let offset = 2;
      while (offset < buffer.length) {
        const marker = buffer.readUInt16BE(offset);
        if (marker >= 0xffc0 && marker <= 0xffc3) {
          return {
            height: buffer.readUInt16BE(offset + 5),
            width: buffer.readUInt16BE(offset + 7)
          };
        }
        offset += 2 + buffer.readUInt16BE(offset + 2);
      }
    }
  } catch {
    // ignore
  }

  return { width: null, height: null };
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  const kb = bytes / 1024;
  if (kb < 1024) return kb.toFixed(1) + ' KB';
  return (kb / 1024).toFixed(2) + ' MB';
}

function deriveTheme(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes('light')) return 'light';
  if (lower.includes('dark')) return 'dark';
  if (lower.includes('chatgpt') || lower.includes('ref')) return 'reference';
  return 'standard';
}

function buildImageMeta(filePath) {
  const relPath = path.relative(baseDir, filePath).replace(/\\/g, '/');
  const filename = path.basename(filePath);
  const stat = fs.statSync(filePath);
  const dims = getImageDimensions(filePath);

  let aspectRatioStr = null;
  if (dims.width && dims.height) {
    const ratio = dims.width / dims.height;
    if (Math.abs(ratio - 16 / 9) < 0.05) aspectRatioStr = '16:9';
    else if (Math.abs(ratio - 1.91) < 0.05) aspectRatioStr = '1.91:1';
    else if (Math.abs(ratio - 1) < 0.02) aspectRatioStr = '1:1';
    else aspectRatioStr = ratio.toFixed(2);
  }

  return {
    filename: filename,
    path: `/jpg/${relPath}`,
    relativePath: relPath,
    mimeType: filename.endsWith('.png') ? 'image/png' : 'image/jpeg',
    dimensions: {
      width: dims.width,
      height: dims.height,
      aspectRatio: aspectRatioStr
    },
    fileSize: {
      bytes: stat.size,
      formatted: formatBytes(stat.size)
    },
    updatedAt: stat.mtime.toISOString()
  };
}

function scanGroupedImages(dir) {
  const groups = {};
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const category = entry.name;
      const categoryFiles = fs.readdirSync(fullPath, { withFileTypes: true });

      const group = {
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1),
        category: category,
        versions: {}
      };

      for (const fileEntry of categoryFiles) {
        if (fileEntry.name.startsWith('.')) continue;
        if (/\.(jpg|jpeg|png|webp|avif)$/i.test(fileEntry.name)) {
          const filePath = path.join(fullPath, fileEntry.name);
          const meta = buildImageMeta(filePath);
          const theme = deriveTheme(fileEntry.name);

          if (theme === 'reference') {
            group.referenceImage = meta.path;
          } else if (theme === 'light' || theme === 'dark') {
            group.versions[theme] = meta;
          } else {
            // fallback version key using sanitized filename
            const key = path.parse(fileEntry.name).name.toLowerCase().replace(/[^a-z0-9_-]+/g, '_');
            group.versions[key] = meta;
          }
        }
      }

      groups[category] = group;
    }
  }

  return Object.values(groups);
}

const groupedItems = scanGroupedImages(baseDir);
const manifest = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Open Graph Images Manifest',
  updatedAt: new Date().toISOString(),
  totalCount: groupedItems.length,
  items: groupedItems
};

fs.writeFileSync(outputJsonPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log(`Successfully generated OG images manifest at ${outputJsonPath} with ${groupedItems.length} categories.`);

const themeJsonPath = path.resolve(__dirname, '../../../../packages/theme/src/data/og-images.json');
if (fs.existsSync(path.dirname(themeJsonPath))) {
  fs.writeFileSync(themeJsonPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`Successfully updated theme OG images manifest at ${themeJsonPath}.`);
}
