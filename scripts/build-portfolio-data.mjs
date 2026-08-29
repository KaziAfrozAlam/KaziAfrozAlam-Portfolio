// Build step: serialize the single source of truth (src/data/portfolio.ts) into
// public/portfolio-data.json. The site regenerates this on every deploy, so the
// AI agent (edge function) can fetch it and stay in sync with the portfolio
// without any manual knowledge-base or prompt edits.
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const entry = path.join(root, 'src', 'data', 'portfolio.ts');
const outFile = path.join(root, 'public', 'portfolio-data.json');
const tmpBundle = path.join(root, 'scripts', '.portfolio-bundle.mjs');

const result = await build({
  entryPoints: [entry],
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false,
  logLevel: 'silent',
});

fs.writeFileSync(tmpBundle, result.outputFiles[0].text);
let mod;
try {
  mod = await import('file://' + tmpBundle);
} finally {
  fs.rmSync(tmpBundle, { force: true });
}

const snapshot = {};
for (const [key, value] of Object.entries(mod)) {
  if (typeof value === 'function' || value === undefined) continue;
  try {
    JSON.stringify(value);
    snapshot[key] = value;
  } catch {
    // skip non-serializable exports
  }
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(snapshot, null, 2));
console.log(`build-portfolio-data: wrote ${outFile} (${Object.keys(snapshot).length} exports)`);
