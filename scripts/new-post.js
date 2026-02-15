#!/usr/bin/env node
/**
 * Create a new blog post (Hugo-style).
 * Usage: bun run post <slug> [title]
 * Example: bun run post my-awesome-post "My Awesome Post"
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: bun run post <slug> [title]');
  console.error('Example: bun run post my-new-post "My New Post"');
  process.exit(1);
}

const title = process.argv[3] || slug
  .split('-')
  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  .join(' ');

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const pubDate = now.toISOString().slice(0, 10);

const dir = path.join(process.cwd(), 'content', 'blog', String(year), month);
const filePath = path.join(dir, `${slug}.md`);

const frontmatter = `---
title: "${title}"
description: ""
pubDate: ${pubDate}
draft: true
---

# ${title}

`;

if (fs.existsSync(filePath)) {
  console.error(`Post already exists: ${filePath}`);
  process.exit(1);
}

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(filePath, frontmatter, 'utf8');

console.log(`Created: content/blog/${year}/${month}/${slug}.md`);
console.log('Edit the file and set draft: false when ready to publish.');

const absolutePath = path.resolve(filePath);
const editor = process.env.EDITOR || process.env.VISUAL;

if (editor) {
  spawn(editor, [absolutePath], { stdio: 'inherit' });
} else if (process.platform === 'darwin') {
  spawn('open', ['-t', absolutePath], { stdio: 'inherit' });
} else if (process.platform === 'win32') {
  spawn('start', ['', absolutePath], { stdio: 'inherit', shell: true });
} else {
  spawn('xdg-open', [absolutePath], { stdio: 'inherit' });
}
